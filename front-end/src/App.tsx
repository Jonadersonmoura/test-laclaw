import { QueryClient, QueryClientProvider } from "react-query";
import { PrimeReactProvider } from "primereact/api";

import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function App() {
  return (
    <PrimeReactProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Home />
      </QueryClientProvider>
    </PrimeReactProvider>
  );
}

export default App;
