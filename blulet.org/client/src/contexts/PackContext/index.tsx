import { createContext, useContext, useEffect, useState } from "react";
import ApiController from "../../utils/ApiController";

interface PackContextProps {
    packs: Record<string, Pack>;
}

interface PackProviderProps {
    children: JSX.Element;
}

type Pack = {
    id: string;
    name: string;
    price: number;
    colors: string[];
    blues: string[];
    image: string;
};

const PackContext = createContext<PackContextProps | undefined>(undefined);

export function usePacks(): PackContextProps {
    const context = useContext(PackContext);
    if (!context) throw new Error("usePacks must be used within PackProvider component");
    return context;
}

export function PackProvider({ children }: PackProviderProps) {
    const [loading, setLoading] = useState(true);
    const [packs, setPacks] = useState<Record<string, Pack>>({});

    useEffect(() => {
        ApiController.market.getPacks().then((packs) => setPacks(packs.reduce((acc: Record<string, Pack>, pack) => {
            acc[pack.id] = pack;
            return acc;
        }, {})));
        setLoading(false);
    }, []);

    const contextValue: PackContextProps = {
        packs
    };

    return (
        <PackContext.Provider value={contextValue}>
            {!loading && children}
        </PackContext.Provider>
    );
}