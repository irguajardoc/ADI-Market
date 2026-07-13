import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const usuarioGuardado = localStorage.getItem("usuario");
  const tokenGuardado = localStorage.getItem("token");

  const [usuario, setUsuario] = useState(
    usuarioGuardado
      ? JSON.parse(usuarioGuardado)
      : null
  );

  const [token, setToken] = useState(
    tokenGuardado || ""
  );

  const login = (usuarioData, tokenData) => {
    localStorage.setItem(
      "usuario",
      JSON.stringify(usuarioData)
    );

    localStorage.setItem(
      "token",
      tokenData
    );

    setUsuario(usuarioData);
    setToken(tokenData);
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");

    setUsuario(null);
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;