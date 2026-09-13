import { RouterProvider } from 'react-router';
import { router } from './routes';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from './providers/AuthProvider';
import { setupApiInterceptors } from './config/setupApiInterceptors';

const queryClient = new QueryClient();
setupApiInterceptors();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
