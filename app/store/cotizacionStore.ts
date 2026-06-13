// src/store/cotizacionStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import { ProductoCotizacion, ClienteData } from '@/types';

const IVA_RATE = 0.19;
const MIN_QUANTITY = 1;

interface CotizacionState {
  items: ProductoCotizacion[];
  numeroCotizacion: number;
  incluirIva: boolean;
  isSaving: boolean;
  isSaved: boolean;
  error: string | null;
  cliente: ClienteData;
  
  agregarProducto: (producto: Omit<ProductoCotizacion, 'cantidad'>) => void;
  eliminarProducto: (id: string) => void;
  actualizarCantidad: (id: string, cantidad: number) => void;
  toggleIva: () => void;
  limpiarCotizacion: () => void;
  actualizarCliente: (data: Partial<ClienteData>) => void;
  guardarCotizacion: () => Promise<boolean>;
  
  subtotal: () => number;
  montoIva: () => number;
  total: () => number;
}

const generarNumCotizacion = (): number => Math.floor(100000 + Math.random() * 900000);

export const useCotizacionStore = create<CotizacionState>()(
  persist(
    (set, get) => ({
      items: [],
      numeroCotizacion: generarNumCotizacion(),
      incluirIva: true,
      isSaving: false,
      isSaved: false,
      error: null,
      cliente: { nombre: '', email: '', telefono: '', empresa: '', acepta_ofertas: false },

      agregarProducto: (producto) => set((state) => {
        const existente = state.items.find(item => item.id === producto.id);
        if (existente) {
          return {
            items: state.items.map(item => 
              item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
            ),
            isSaved: false
          };
        }
        return { items: [...state.items, { ...producto, cantidad: 1 }], isSaved: false };
      }),

      eliminarProducto: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id),
        isSaved: false
      })),

      actualizarCantidad: (id, cantidad) => set((state) => ({
        items: state.items.map(item => 
          item.id === id ? { ...item, cantidad: Math.max(MIN_QUANTITY, cantidad) } : item
        ),
        isSaved: false
      })),

      toggleIva: () => set((state) => ({ incluirIva: !state.incluirIva, isSaved: false })),

      limpiarCotizacion: () => set({
        items: [],
        numeroCotizacion: generarNumCotizacion(),
        incluirIva: true,
        cliente: { nombre: '', email: '', telefono: '', empresa: '', acepta_ofertas: false },
        isSaved: false,
        error: null
      }),

      actualizarCliente: (data) => set((state) => {
        const validatedData = {
          ...data,
          email: data.email ? data.email.toLowerCase().trim() : state.cliente.email
        };
        return { cliente: { ...state.cliente, ...validatedData }, isSaved: false };
      }),

      guardarCotizacion: async (): Promise<boolean> => {
        const state = get();
        if (state.isSaving || state.isSaved) return true;

        set({ isSaving: true, error: null });

        try {
          // 1. Buscar o registrar cliente de forma estricta
          const { data: existingClient, error: searchError } = await supabase
            .from('clientes')
            .select('id')
            .eq('email', state.cliente.email)
            .maybeSingle<{ id: string }>();

          if (searchError) throw searchError;
          let clienteId = existingClient?.id;

          if (!clienteId) {
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
              .single<{ id: string }>();

            if (insertClientError) throw insertClientError;
            clienteId = newClient.id;
          } else {
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

          // 2. Insertar cabecera de cotización
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
            .single<{ id: string }>();

          if (errorCabecera) throw errorCabecera;

          // 3. Insertar partidas / detalles
          const detalles = state.items.map(item => ({
            cotizacion_id: cabecera.id,
            producto_id: item.id,
            nombre: item.nombre,
            precio: item.precio,
            cantidad: item.cantidad,
          }));

          const { error: errorDetalles } = await supabase.from('cotizaciones_detalle').insert(detalles);
          if (errorDetalles) throw errorDetalles;

          set({ isSaving: false, isSaved: true });
          return true;
        } catch (error: unknown) {
          console.error('Error en Supabase:', error);
          set({ 
            isSaving: false, 
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          return false;
        }
      },

      subtotal: () => get().items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0),
      montoIva: () => get().incluirIva ? get().subtotal() * IVA_RATE : 0,
      total: () => get().subtotal() + get().montoIva(),
    }),
    {
      name: 'cotizacion-storage',
      partialize: (state) => ({
        items: state.items,
        numeroCotizacion: state.numeroCotizacion,
        incluirIva: state.incluirIva,
        cliente: state.cliente,
      }),
    }
  )
);
