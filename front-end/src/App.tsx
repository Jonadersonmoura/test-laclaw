import { PrimeReactProvider } from "primereact/api";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <PrimeReactProvider>
      <Navbar />
      <Home />
    </PrimeReactProvider>
  );
}

export default App;
