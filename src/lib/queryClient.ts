import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Bancario: No almacenar en caché, siempre solicitar datos frescos
      staleTime: 0,
      gcTime: 0, // Antes cacheTime
      refetchOnWindowFocus: false, // Opcional: no hacer refetch automático al volver a la ventana
      retry: 0, // Opcional: no reintentar por defecto peticiones fallidas (ideal para no saturar apis o repetir transacciones)
    },
    // Mutaciones: también si es necesario, sin reintentos por defecto.
    mutations: {
        retry: 0,
    }
  },
});
