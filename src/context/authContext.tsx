import axios from "axios";
import React, { createContext, useState, useContext } from "react";

interface ContextI {
  loading: boolean;
  error: any;
  currentUser: any;
  handleSignIn: any;
  handleSignUp: any;
}

const initVal = {
  loading: false,
  error: "",
  currentUser: "",
  handleSignIn: () => {},
  handleSignUp: () => {},
};

interface UserI {
  email: string;
  password: string;
}

const API = "http://localhost:8000";

export const authContext = createContext<ContextI>(initVal);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleSignIn = async (
    user: UserI,
    navigate: (value: string) => void
  ) => {
    setLoading(true);
    try {
      const { data } = await axios(`${API}/users`);
      localStorage.setItem("tokens", JSON.stringify(data));
      localStorage.setItem("email", user.email);
      navigate("/");
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (
    user: UserI,
    navigate: (value: string) => void
  ) => {
    setLoading(true);
    try {
      await axios.post(`${API}/user`, user);
      navigate("/sign-in");
    } catch (error) {
      console.log(error, "error");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <authContext.Provider
      value={{ loading, error, currentUser, handleSignIn, handleSignUp }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
