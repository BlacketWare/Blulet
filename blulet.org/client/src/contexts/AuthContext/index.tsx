import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import ApiController from "../../utils/ApiController";
import User from "../../declarations/user";
import axios from "axios";

interface AuthContextProps {
    user: User | null | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
    getLoggedIn: () => Promise<void>;
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth(): AuthContextProps {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider component");
    return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ApiController.user.getUser().then((response: any) => {
            if (response.status === 200) {
                setUser(response.data.user);
                setLoading(false);
            }
        }).catch(() => {
            setUser(null);
            setLoading(false);
        });
    }, []);

    const getLoggedIn = useCallback(async () => {
        setLoading(true);
        await axios.get("/api/v2/user", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then((response: any) => {
            if (response.status === 200) {
                setUser(response.data.user);
                setLoading(false);
            }
        }).catch(() => {
            setUser(null);
            setLoading(false);
        });
    }, []);

    const logout = useCallback(async () => {
        ApiController.authentication.logout().then(() => {
            setUser(null);
            navigate("/login");
        });
    }, [navigate]);

    const contextValue: AuthContextProps = {
        user,
        setUser,
        getLoggedIn,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};