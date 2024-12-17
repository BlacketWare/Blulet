import { useAuth } from "@contexts/AuthContext";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ApiController from "../../utils/ApiController";
import Background from "@components/Background";
import Sidebar from "@components/Sidebar";
import styles from "@styles/dashboard.module.scss";

export default function Settings() {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    const [isLinked, setLinked] = useState<boolean>(false);

    useEffect(() => {
        if (user.discord) setLinked(true);
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const linkedParam = urlParams.get("linked");
        if (linkedParam === "true" && window.opener) window.opener.postMessage({ type: "setIsLinked", value: true }, "*");
        return window.close();
    }, []);

    useEffect(() => {
        window.addEventListener("message", (event) => {
            if (event.data.type === "setIsLinked") {
                setLinked(event.data.value);
            }
        });

        return () => {
            window.removeEventListener("message", () => { });
        };
    }, []);

    return (
        <div className={styles.body}>
            <Background />
            <Sidebar />
            <div className={styles.profileBody}>
                <div className={styles.header}>Settings</div>
                <div className={styles.mainContainer}>

                    <div className={styles.infoContainer}>
                        <div className={styles.settingsHeaderRow}>
                            <FontAwesomeIcon icon={faUser} className={styles.headerIcon} />
                            <div className={styles.infoHeader}>Profile</div>
                        </div>
                        <div className={styles.text}><b>Username:</b> <span className={user.color === "rainbow" ? styles.rainbow : ""} style={{ color: user.color }}>{user.username}</span></div>
                        <div className={styles.text}><b>Role:</b> {user.role}</div>
                        <div className={styles.text}><b>Discord:</b> {isLinked ? "Linked" : "Unlinked"}</div>
                        <div className={styles.text}><b>Joined:</b> {new Date(user.createdAt).toLocaleString()}</div>

                        {isLinked ? (
                            <div className={`${styles.button} ${styles.upgradeButton}`} role="button" tabIndex={0} onClick={() => ApiController.user.unlinkDiscord().then(() => setLinked(false))}>
                                <div className={styles.shadow}></div>
                                <div className={styles.edge} style={{ backgroundColor: "#000070" }}></div>
                                <div className={`${styles.front} ${styles.upgradeButtonInside}`} style={{ backgroundColor: "#000070" }}>Unlink Discord</div>
                            </div>
                        ) : (
                            <div className={`${styles.button} ${styles.upgradeButton}`} role="button" tabIndex={0} onClick={() => window.open("/api/v1/link/discord", "_blank", "width=550,height=870")}>
                                <div className={styles.shadow}></div>
                                <div className={styles.edge} style={{ backgroundColor: "#000070" }}></div>
                                <div className={`${styles.front} ${styles.upgradeButtonInside}`} style={{ backgroundColor: "#000070" }}>Link Discord</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};