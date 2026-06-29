import { createContext, useState } from "react";

// Exportamos el contexto para poder usarlo en Navbar
export const AuthContext = createContext();

// Provider que entrega el estado global a toda la app
function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState({
    nombre: "Ignacio",
    email: "ignacio@adimarket.cl",
    logueado: true
  });

  const logout = () => {
    setUsuario({
      nombre: "",
      email: "",
      logueado: false
    });
  };

  return (
    <AuthContext.Provider value={{ usuario, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;