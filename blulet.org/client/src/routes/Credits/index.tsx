import { useAuth } from "@contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import Background from "@components/Background";
import Sidebar from "@components/Sidebar";
import styles from "@styles/credits.module.scss";
import dashbord from "@styles/dashboard.module.scss";

export default function Credits() {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    const credits = [{
        id: "657a317d70cbdef4c051e910",
        name: "monkxy",
        role: "Owner",
        avatar: "monkxy",
        color: "rainbow",
        description: "The original creator, owner, and developer of Blulet."
    }, {
        id: "657a5467be1b993f928f4166",
        name: "zastix",
        role: "Owner",
        avatar: "zastix",
        color: "#a623ff",
        description: "A developer and owner of Blulet."
    }];

    return (
        <>
            <Background />
            <Sidebar />

            <div className={dashbord.profileBody}>
                <div className={dashbord.header}>Credits</div>
                <div className={styles.creditsBody}>
                    {credits.map((credit, i) => (
                        <div className={styles.creditContainer} key={i}>
                            <div className={dashbord.blueContainer}>
                                <img src={`https://media.blulet.org/blues/${credit.avatar}.svg`} alt={credit.name} className={styles.creditAvatar} draggable="false" />
                            </div>
                            <Link className={credit.color === "rainbow" ? `${styles.creditName} ${dashbord.rainbow}` : styles.creditName} to={`/stats?name=${credit.id}`} style={{ color: credit.color }}>{credit.name}</Link>
                            <div className={styles.creditRole}>{credit.role}</div>
                            <div className={styles.creditDescription}>{credit.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};