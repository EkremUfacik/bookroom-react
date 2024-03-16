import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllRoutes from "./router/Router";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AllRoutes />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
