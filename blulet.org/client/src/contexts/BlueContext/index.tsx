import { createContext, useContext, useEffect, useState } from "react";
import ApiController from "../../utils/ApiController";

interface BlueContextProps {
    allBlues: Record<string, Blue>;
}

interface BlueProviderProps {
    children: JSX.Element;
}

type Blue = {
    id: string;
    name: string;
    rarity: string;
    price: number;
    chance: number;
    image: string;
    background: string;
}

const BlueContext = createContext<BlueContextProps | undefined>(undefined);

export function useBlues(): BlueContextProps {
    const context = useContext(BlueContext);
    if (!context) throw new Error("useBlues must be used within BluesProvider component");
    return context;
}

export function BlueProvider({ children }: BlueProviderProps) {
    const [loading, setLoading] = useState(true);
    const [allBlues, setAllBlues] = useState<Record<string, Blue>>({});

    useEffect(() => {
        ApiController.market.getBlues().then((blues) => setAllBlues(blues.reduce((acc: Record<string, Blue>, blue) => {
            acc[blue.name] = blue;
            return acc;
        }, {})));

        setLoading(false);
    }, []);

    const contextValue: BlueContextProps = {
        allBlues
    };

    return (
        <BlueContext.Provider value={contextValue}>
            {!loading && children}
        </BlueContext.Provider>
    );
}