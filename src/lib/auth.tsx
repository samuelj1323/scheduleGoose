import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  // Login function - store token in localStorage
  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Logout function - remove token from localStorage
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  // Check token validity on mount
  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        // If token exists, verify it
        if (token) {
          // Here you could make an API call to verify the token if needed
          // For now we'll just check if it exists
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        logout();
        setLoading(false);
      }
    };

    checkTokenValidity();
  }, [token]);

  const value = {
    isAuthenticated,
    token,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
