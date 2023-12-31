import axios from "axios";
import { log } from "console";
import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

interface ContextI {
  loading: boolean;
  error: any;
  currentUser: any;
  handleSignIn: any;
  handleSignUp: any;
  handleSignOut: any;
}

const initVal = {
  loading: false,
  error: "",
  currentUser: "",
  handleSignIn: () => {},
  handleSignUp: () => {},
  handleSignOut: () => {},
};

interface UserI {
  email: string;
  password: string;
  password_confirm: string;
}

const API = "http://34.159.136.83/api/v1";

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
      const { data } = await axios.post(`${API}/account/login/`, user);
      localStorage.setItem("tokens", JSON.stringify(data));
      localStorage.setItem("email", user.email);

      navigate("/");
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const handleSignUp = async (
    user: UserI,
    navigate: (value: string) => void
  ) => {
    setLoading(true);
    try {
      console.log(`${API}/account/register/`);
      await axios.post(`${API}/account/register/`, user);
      navigate("/sign-in");
    } catch (error) {
      console.log(error, "error");
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSignOut = (navigate: (value: string) => void) => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("email");
    setCurrentUser("");
    navigate("/sign-in");
  };

  return (
    <authContext.Provider
      value={{
        loading,
        error,
        currentUser,
        handleSignIn,
        handleSignUp,
        handleSignOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
