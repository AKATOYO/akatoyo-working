import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

interface ProductoCotizacion {
  id: string | number;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface ClienteData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  acepta_ofertas: boolean;
}

interface CotizacionState {
  items: ProductoCotizacion[];
  numeroCotizacion: number;
  incluirIva: boolean;
  cliente: ClienteData;
  isSaving: boolean;
  isSaved: boolean;
  
  agregarProducto: (producto: Omit<ProductoCotizacion, 'cantidad'>) => void;
  eliminarProducto: (id: string | number) => void;
  actualizarCantidad: (id: string | number, cantidad: number) => void;
  toggleIva: () => void;
  limpiarCotizacion: () => void;
  actualizarCliente: (data: Partial<ClienteData>) => void;
  guardarCotizacion: () => Promise<boolean>;
  
  subtotal: () => number;
  montoIva: () => number;
  total: () => number;
}

const generarNumCotizacion = () => Math.floor(100000 + Math.random() * 900000);

export const useCotizacionStore = create<CotizacionState>((set, get) => ({
  items: [],
  numeroCotizacion: generarNumCotizacion(),
  incluirIva: true,
  isSaving: false,
  isSaved: false,
  cliente: { nombre: '', email: '', telefono: '', empresa: '', acepta_ofertas: false },

  agregarProducto: (producto) => set((state) => {
    const existente = state.items.find(item => item.id === producto.id);
    if (existente) {
      return { items: state.items.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item) };
    }
    return { items: [...state.items, { ...producto, cantidad: 1 }], isSaved: false };
  }),

  eliminarProducto: (id) => set((state) => ({ items: state.items.filter(item => item.id !== id), isSaved: false })),
  actualizarCantidad: (id, cantidad) => set((state) => ({ items: state.items.map(item => item.id === id ? { ...item, cantidad: Math.max(1, cantidad) } : item), isSaved: false })),
  toggleIva: () => set((state) => ({ incluirIva: !state.incluirIva, isSaved: false })),
  
  actualizarCliente: (data) => set((state) => ({ 
    cliente: { ...state.cliente, ...data },
    isSaved: false
  })),

  limpiarCotizacion: () => set({ 
    items: [], 
    numeroCotizacion: generarNumCotizacion(),
    cliente: { nombre: '', email: '', telefono: '', empresa: '', acepta_ofertas: false },
    isSaved: false 
  }),

  guardarCotizacion: async () => {
    const state = get();
    if (state.isSaving || state.isSaved) return true;

    set({ isSaving: true });

    try {
      // 1. BUSCAR O CREAR CLIENTE (Versión final limpia)
      const { data: existingClient, error: searchError } = await supabase
        .from('clientes')
        .select('id')
        .eq('email', state.cliente.email)
        .maybeSingle();

      if (searchError) throw searchError;

      let clienteId = existingClient?.id;

      if (!clienteId) {
        // Si NO existe, lo creamos
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
          .single();

        if (insertClientError) throw insertClientError;
        clienteId = newClient.id;
      } else {
        // Si YA existe, actualizamos sus datos por si cambiaron
        await supabase
          .from('clientes')
          .update({
            nombre: state.cliente.nombre,
            telefono: state.cliente.telefono,
            empresa: state.cliente.empresa,
            acepta_ofertas: state.cliente.acepta_ofertas,
          })
          .eq('id', clienteId);
      }

      // 2. CREAR LA COTIZACIÓN VINCULADA AL CLIENTE
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
        .single();

      if (errorCabecera) throw errorCabecera;

      // 3. INSERTAR LOS DETALLES DE LA COTIZACIÓN
      const detalles = state.items.map(item => ({
        cotizacion_id: cabecera.id,
        producto_id: String(item.id),
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
      }));

      const { error: errorDetalles } = await supabase.from('cotizaciones_detalle').insert(detalles);
      if (errorDetalles) throw errorDetalles;

      set({ isSaving: false, isSaved: true });
      return true;
    } catch (error) {
      console.error('Error al guardar en Supabase:', error);
      set({ isSaving: false });
      return false;
    }
  },

  subtotal: () => get().items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0),
  montoIva: () => get().incluirIva ? get().subtotal() * 0.19 : 0,
  total: () => get().subtotal() + get().montoIva(),
}));