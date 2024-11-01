import type { User } from "../../interfaces/User";

export interface AuthContextType {
    token: string | null;
    authenticated: string | null;
    setToken: (newToken: string | null) => void;
    user: User | null;
    setUser: (newUser: User | null) => void;
    setAuthenticated: (newAuthenticated: string | null) => void;
    logout: () => void; 
  }