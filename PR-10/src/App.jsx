import "./App.css";

import HeaderAfterLogin from "./components/header/jsx/HeaderAfterLogin";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <div className="App">
      <HeaderAfterLogin />
      <AppRoutes />
    </div>
  );
}

export default App;