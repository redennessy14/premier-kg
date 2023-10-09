import React, { createContext, useState, useContext } from "react";

interface ContextI {
  loading: boolean;
  error: any;
  currentUser: any;
}

const initVal = {
  loading: false,
  error: "",
  currentUser: "",
};

export const authContext = createContext<ContextI>(initVal);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  return (
    <authContext.Provider value={{ loading, error, currentUser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
