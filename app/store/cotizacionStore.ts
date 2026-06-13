import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

// Constantes globales de configuración de negocio
const IVA_RATE: number = 0.19;
const MIN_QUANTITY: number = 1;

// 1. Interfaces estrictas para el dominio del Estado
export interface ProductoCotizacion {
  id: string | number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export interface ClienteData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  acepta_ofertas: boolean;
}

export interface CotizacionState {
  items: ProductoCotizacion[];
  numeroCotizacion: number;
  incluirIva: boolean;
  isSaving: boolean;
  isSaved: boolean;
  error: string | null;
  cliente: ClienteData;
  
  // Acciones sobre el estado
  agregarProducto: (producto: Omit<ProductoCotizacion, 'cantidad'>) => void;
  eliminarProducto: (id: string | number) => void;
  actualizarCantidad: (id: string | number, cantidad: number) => void;
  toggleIva: () => void;
  limpiarCotizacion: () => void;
  actualizarCliente: (data: Partial<ClienteData>) => void;
  guardarCotizacion: () => Promise<boolean>;
  
  // Selectores internos de cálculos de facturación
  subtotal: () => number;
  montoIva: () => number;
  total: () => number;
}

// Interfaces auxiliares para tipar las tablas relacionales de Supabase
interface ClienteDbRow {
  id: string | number;
}

interface CabeceraDbRow {
  id: string | number;
}

// Función generadora de identificadores de cotizaciones
const generarNumCotizacion = (): number => Math.floor(100000 + Math.random() * 900000);

// 2. Creación del Store Global con middleware de Persistencia
export const useCotizacionStore = create<CotizacionState>()(
  persist(
    (set, get) => ({
      // Estado Inicial
      items: [],
      numeroCotizacion: generarNumCotizacion(),
      incluirIva: true,
      isSaving: false,
      isSaved: false,
      error: null,
      cliente: { 
        nombre: '', 
        email: '', 
        telefono: '', 
        empresa: '', 
        acepta_ofertas: false 
      },

      // Implementación de Acciones
      agregarProducto: (producto) => set((state: CotizacionState) => {
        const existente = state.items.find(item => item.id === producto.id);
        if (existente) {
          return { 
            items: state.items.map(item => 
              item.id === producto.id 
                ? { ...item, cantidad: item.cantidad + 1 } 
                : item
            ),
            isSaved: false
          };
        }
        return { 
          items: [...state.items, { ...producto, cantidad: 1 }], 
          isSaved: false 
        };
      }),

      eliminarProducto: (id) => set((state: CotizacionState) => ({ 
        items: state.items.filter(item => item.id !== id), 
        isSaved: false 
      })),

      actualizarCantidad: (id, cantidad) => set((state: CotizacionState) => ({
        items: state.items.map(item => 
          item.id === id 
            ? { ...item, cantidad: Math.max(MIN_QUANTITY, cantidad) } 
            : item
        ),
        isSaved: false
      })),

      toggleIva: () => set((state: CotizacionState) => ({ 
        incluirIva: !state.incluirIva, 
        isSaved: false 
      })),

      limpiarCotizacion: () => set({
        items: [],
        numeroCotizacion: generarNumCotizacion(),
        incluirIva: true,
        cliente: { 
          nombre: '', 
          email: '', 
          telefono: '', 
          empresa: '', 
          acepta_ofertas: false 
        },
        isSaved: false,
        error: null
      }),

      actualizarCliente: (data) => set((state: CotizacionState) => {
        const validatedData: Partial<ClienteData> = {
          ...data,
          email: data.email ? data.email.toLowerCase() : state.cliente.email
        };
        
        return { 
          cliente: { ...state.cliente, ...validatedData },
          isSaved: false
        };
      }),

      guardarCotizacion: async (): Promise<boolean> => {
        const state = get();
        if (state.isSaving || state.isSaved) return true;

        set({ isSaving: true, error: null });

        try {
          // 1. Buscar o registrar al cliente en la base de datos externa
          const { data: existingClient, error: searchError } = await supabase
            .from('clientes')
            .select('id')
            .eq('email', state.cliente.email)
            .maybeSingle<ClienteDbRow>();

          if (searchError) throw searchError;

          let clienteId: string | number | undefined = existingClient?.id;

          if (!clienteId) {
            // Alta de nuevo prospecto / cliente
            const { data: newClient, error: insertClientError } = await supabase
              .from('clientes')
              .insert({
                nombre: state.cliente.nombre,
                email: state.cliente.email,
                telefono: state.cliente.telefono,
                empresa: state.cliente.empresa,
                acepta_ofertas: state.cliente.acepta_ofertas,
              })
              .select('id')
              .single<ClienteDbRow>();

            if (insertClientError) throw insertClientError;
            clienteId = newClient.id;
          } else {
            // Actualización de datos de contacto preexistentes
            const { error: updateClientError } = await supabase
              .from('clientes')
              .update({
                nombre: state.cliente.nombre,
                telefono: state.cliente.telefono,
                empresa: state.cliente.empresa,
                acepta_ofertas: state.cliente.acepta_ofertas,
              })
              .eq('id', clienteId);

            if (updateClientError) throw updateClientError;
          }

          // 2. Generar el documento de la cabecera de la cotización
          const { data: cabecera, error: errorCabecera } = await supabase
            .from('cotizaciones')
            .insert({
              numero_cotizacion: state.numeroCotizacion,
              cliente_id: clienteId,
              subtotal: state.subtotal(),
              iva: state.montoIva(),
              total: state.total(),
            })
            .select('id')
            .single<CabeceraDbRow>();

          if (errorCabecera) throw errorCabecera;

          // 3. Insertar el desglose de productos asociados (Partidas)
          const detalles = state.items.map(item => ({
            cotizacion_id: cabecera.id,
            producto_id: item.id,
            nombre: item.nombre,
            precio: item.precio,
            cantidad: item.cantidad,
          }));

          const { error: errorDetalles } = await supabase
            .from('cotizaciones_detalle')
            .insert(detalles);
            
          if (errorDetalles) throw errorDetalles;

          set({ isSaving: false, isSaved: true });
          return true;
        } catch (error: unknown) {
          console.error('Error al guardar en Supabase:', error);
          set({ 
            isSaving: false, 
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          return false;
        }
      },

      // Selectores de lógica de cálculos financieros
      subtotal: (): number => {
        const state = get();
        return state.items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
      },

      montoIva: (): number => {
        const state = get();
        return state.incluirIva ? state.subtotal() * IVA_RATE : 0;
      },

      total: (): number => {
        const state = get();
        return state.subtotal() + state.montoIva();
      },
    }),
    {
      name: 'cotizacion-storage',
      // Serializamos y filtramos únicamente las ramas necesarias para LocalStorage
      partialize: (state: CotizacionState) => ({
        items: state.items,
        numeroCotizacion: state.numeroCotizacion,
        incluirIva: state.incluirIva,
        cliente: state.cliente,
      }),
    }
  )
);
