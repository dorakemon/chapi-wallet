import "./App.css";
import { AppProvider } from "./providers";
import { AppRoutes } from "./router";

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
