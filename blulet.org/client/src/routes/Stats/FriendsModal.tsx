import { useRef, useState, useEffect } from "react";
import { Textfit } from "react-textfit";
import { useNavigate } from "react-router-dom";
import styles from "@styles/dashboard.module.scss";
import ApiController from "../../utils/ApiController";

type User = {
    id: string;
    username: string;
    avatar: string;
    banner: string;
    role: string;
    color: string;
};

export default function FriendsModal() {
    const navigate = useNavigate();
    const [showing, _] = useState<boolean>(true);
    const [type, setType] = useState<"outgoing" | "incoming">("outgoing");
    const [outgoing, setOutgoing] = useState<User[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ApiController.friends.requests.getSending().then(res => setOutgoing(res));
    }, []);

    return (
        <>
            {showing && (
                <div className={styles.modal} ref={modalRef}>
                    <div className={styles.modal} ref={modalRef}>
                        <div className={styles.modalButton} role="button" tabIndex={0} />
                        <div className={styles.friendsHeaderContainer}>
                            <div className={styles.friendsHeaderRow}>
                                <div className={styles.button} role="button" tabIndex={0} onClick={() => setType("outgoing")}>
                                    <div className={styles.shadow} />
                                    <div className={styles.edge} style={{ backgroundColor: "#000070" }} />
                                    <div className={`${styles.front} ${styles.friendsHeaderButtonInside}`} style={{ backgroundColor: "#000070" }}>
                                        Outgoing
                                    </div>
                                </div>

                                <div className={styles.button} role="button" tabIndex={0} onClick={() => setType("incoming")}>
                                    <div className={styles.shadow} />
                                    <div className={styles.edge} style={{ backgroundColor: "#000070" }} />
                                    <div className={`${styles.front} ${styles.friendsHeaderButtonInside}`} style={{ backgroundColor: "#000070" }}>
                                        Incoming
                                    </div>
                                </div>
                            </div>
                            <div className={styles.friendsHeaderColumn}>
                                {type === "outgoing" && outgoing.map((friend, i) => (
                                    <div className={styles.friend} key={i} onClick={() => navigate(`/stats?name=${friend.id}`)}>
                                        <img src={`https://media.blulet.org/banners/${friend.banner}.svg`} alt={friend.banner} draggable="false" className={styles.friendBanner} />
                                        <div className={`${styles.blueContainer} ${styles.blueBox}`} style={{ left: "45px" }}>
                                            <img src={`https://media.blulet.org/blues/${friend.avatar}.svg`} alt={friend.avatar} draggable="false" className={styles.blue} />
                                        </div>
                                        <Textfit className={`${styles.friendNameText} ${friend.color === "rainbow" ? styles.rainbow : ""}`} max={54} mode="single" style={{ color: friend.color }}>
                                            {friend.username}
                                        </Textfit>
                                        <Textfit className={styles.friendRoleText} max={54} mode="single">
                                            {friend.role}
                                        </Textfit>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};