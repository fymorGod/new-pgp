import React, { useEffect } from "react";
import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType } from "./interface/ContextType";
import { initialUser } from "./models/InitialUser";
import { AuthProviderProps } from "./interface/ContextProps";
import { User } from "../interfaces/User";

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: initialUser,
  authenticated: null,
  setUser: () => {},
  setToken: () => {},
  setAuthenticated: ()=> {},
  logout: () => {}
});


export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [ token, setToken ] = useState<string | null>(null);
  const [ authenticated, setAuthenticated ] = useState<string | null>(null);
  const [ user, setUser ] = useState<User | null>(null)

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);

        const storedAuthenticated = await AsyncStorage.getItem('authenticated');
        setAuthenticated(storedAuthenticated);

        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

      } catch (error) {
        console.error('Erro ao carregar dados do AsyncStorage:', error);
      }
    };

    fetchStoredData();
  }, []);

  const updateToken = async (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      try {
        await AsyncStorage.setItem('token', newToken);
      } catch (error) {
        console.error('Erro ao salvar token no AsyncStorage:', error);
      }
    } else {
      try {
        await AsyncStorage.removeItem('token');
      } catch (error) {
        console.error('Erro ao remover token do AsyncStorage:', error);
      }
    }
  };

  const updateAuthenticated = async (newAuthenticated: string | null) => {
    setAuthenticated(newAuthenticated);
    if (newAuthenticated) {
      try {
        await AsyncStorage.setItem('authenticated', newAuthenticated);
      } catch (error) {
        console.error('Erro ao salvar authenticated no AsyncStorage:', error);
      }
    } else {
      try {
        await AsyncStorage.removeItem('authenticated');
      } catch (error) {
        console.error('Erro ao remover authenticated do AsyncStorage:', error);
      }
    }
  };

  const updateUser = async (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
      } catch (error) {
        console.error('Erro ao salvar usuário no AsyncStorage:', error);
      }
    } else {
      try {
        await AsyncStorage.removeItem('user');
      } catch (error) {
        console.error('Erro ao remover usuário do AsyncStorage:', error);
      }
    }
  };

  const logout = () => {
    updateToken(null)
    updateUser(null)
    updateAuthenticated(null)
    console.log(token)
  }

  return(
    <AuthContext.Provider value={{
      logout,
      token,
      setToken: updateToken,
      user,
      setUser: updateUser,
      setAuthenticated: updateAuthenticated,
      authenticated,
    }}>
      {children}
    </AuthContext.Provider>
  );
};