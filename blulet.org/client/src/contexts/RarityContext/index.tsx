import { createContext, useContext, useEffect, useState } from "react";
import ApiController from "../../utils/ApiController";

interface RarityContextProps {
    rarities: Record<string, Rarity>;
}

interface RarityProviderProps {
    children: JSX.Element;
}

type Rarity = {
    id: string;
    name: string;
    color: string;
    animation: string;
    exp: number;
    waitTime: number;
};

const RarityContext = createContext<RarityContextProps | undefined>(undefined);

export function useRarities(): RarityContextProps {
    const context = useContext(RarityContext);
    if (!context) throw new Error("useRarities must be used within RarityProvider component");
    return context;
}

export function RarityProvider({ children }: RarityProviderProps) {
    const [loading, setLoading] = useState(true);
    const [rarities, setRarities] = useState<Record<string, Rarity>>({});

    useEffect(() => {
        ApiController.rarities.getRarities().then((rarities) => setRarities(rarities.reduce((acc: Record<string, Rarity>, rarity) => {
            acc[rarity.name] = rarity;
            return acc;
        }, {})));
        setLoading(false);
    }, []);

    const contextValue: RarityContextProps = {
        rarities
    };

    return (
        <RarityContext.Provider value={contextValue}>
            {!loading && children}
        </RarityContext.Provider>
    );
}