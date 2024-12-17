import { useAuth } from "@contexts/AuthContext";
import { Navigate } from "react-router-dom";
import styles from "@styles/dashboard.module.scss";
import Background from "@components/Background";
import Sidebar from "@components/Sidebar";
import LeaderboardContainer from "./LeaderboardContainer";

export default function Leaderboard() {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    return (
        <div className={styles.body}>
            <Background />
            <Sidebar />
            <LeaderboardContainer />
        </div>
    );
};