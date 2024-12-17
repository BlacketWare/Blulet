import { createContext, useContext, useEffect, useState } from "react";
import ApiController from "../../utils/ApiController";

interface LeaderboardContextProps {
    leaderboard: any[];
    meLocation: any[];
    leaderboardRef?: any;
    meLocationRef?: any;
}

interface LeaderboardProviderProps {
    children: JSX.Element;
}

type LeaderboardUser = {
    username: string;
    avatar: string;
    tokens: number;
    color: string;
}

type MeLocation = {
    id: string;
    username: string;
    tokens: number;
    avatar: string;
    color: string;
    location: number;
}

const LeaderboardContext = createContext<LeaderboardContextProps | undefined>(undefined);

export function useLeaderboard(): LeaderboardContextProps {
    const context = useContext(LeaderboardContext);
    if (!context) throw new Error("useLeaderboard must be used within LeaderboardProvider component");
    return context;
}

export function LeaderboardProvider({ children }: LeaderboardProviderProps) {
    const [loading, setLoading] = useState(true);
    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
    const [meLocation, setMeLocation] = useState<MeLocation[]>([]);

    useEffect(() => {
        ApiController.getLeaderboard().then((response: any) => {
            setLeaderboard(response.leaderboard);
            setMeLocation(response.me);
            setLoading(false);
        }).catch(() => {
            setLeaderboard([]);
            setMeLocation([]);
            setLoading(false);
        });
    }, []);

    const contextValue: LeaderboardContextProps = {
        leaderboard,
        meLocation
    };

    return (
        <LeaderboardContext.Provider value={contextValue}>
            {!loading && children}
        </LeaderboardContext.Provider>
    );
}