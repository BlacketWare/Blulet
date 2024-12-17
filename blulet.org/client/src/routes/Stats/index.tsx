import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { faStore, faUser, faStar } from "@fortawesome/free-solid-svg-icons";
import { Textfit } from "react-textfit";
import { useBlues } from "@contexts/BlueContext";
import DailyWheel from "./DailyWheel.tsx";
import Stat from "./Stat";
import Button from "./Button";
import Background from "@components/Background";
import Sidebar from "@components/Sidebar";
import FriendsModal from "./FriendsModal";
import styles from "@styles/dashboard.module.scss";
import ApiController from "../../utils/ApiController";

type Friend = {
    id: string;
    username: string;
    avatar: string;
    banner: string;
    role: string;
    color: string;
};

export default function Stats() {
    let { user } = useAuth();
    const navigate = useNavigate();

    if (!user) return <Navigate to="/login" />;
    document.title = `${user.username} | Blulet`

    const [friendsData, setFriendsData] = useState<Friend[]>([]);
    const [showFriendsModal, setShowFriendsModal] = useState<boolean>(false);
    const { allBlues } = useBlues();
    const [level, setLevel] = useState<number>(0);
    const [expNeeded, setExpNeeded] = useState<number>(0);
    const [dailyWheel, setDailyWheel] = useState<boolean>(false);

    useEffect(() => {
        if (!user) return;
        user.level = 0;
        for (let i = 0; i <= 27915; i++) {
            user.needed = 5 * Math.pow(user.level, 0.7) * user.level;
            if (user.exp >= user.needed) {
                user.exp -= user.needed;
                user.level++;
            };
        };
        setLevel(user.level);
        setExpNeeded(user.needed);
    }, [user]);

    useEffect(() => {
        ApiController.user.getFriends().then(friends => setFriendsData(friends));
    }, []);

    return (
        <div className={styles.body}>
            <Background />
            <Sidebar />

            {dailyWheel && <DailyWheel />}
            <div className={styles.profileBodyMax}>
                <div className={styles.fullContainer}>
                    <div className={styles.headerRow}>
                        <div className={styles.headerLeft}>
                            <div className={styles.headerLeftRow}>
                                <div className={styles.headerBlueContainer} role="button" tabIndex={0}>
                                    <div className={`${styles.blueContainer} ${styles.headerBlue}`}>
                                        <img src={user.avatar} alt={user.avatar} draggable="false" className={styles.blue} />
                                    </div>
                                </div>
                                <div className={styles.headerInfo}>
                                    <div className={styles.headerBanner} role="button" tabIndex={0}>
                                        <img src={user.banner} alt={user.banner} className={styles.headerBg} draggable="false" />
                                        <div className={`${styles.headerName} ${user.color === "rainbow" ? styles.rainbow : ""}`} style={{ color: user.color }}>{user.username}</div>
                                        <div className={styles.headerTitle}>{user.role}</div>
                                    </div>

                                    {user.badges.length > 0 && <div className={styles.headerBadges}>
                                        <div className={styles.headerBadgesBg} />
                                        {user.badges.map((badge, i) => (
                                            <div className={styles.badgeHolder} key={i}>
                                                <img src={`https://media.blulet.org/badges/${badge}.svg`} alt={badge} draggable="false" className={styles.badgeHolder} />
                                            </div>
                                        ))}
                                    </div>}

                                    <div className={styles.levelBarContainer}>
                                        <div className={styles.levelBar}>
                                            <div className={styles.levelBarInside} style={{ transform: `scaleX(${user.exp / expNeeded})` }}></div>
                                        </div>
                                        <div className={styles.levelStarContainer}>
                                            <img alt="Star" className={styles.levelStar} draggable="false" src="https://media.blulet.org/dashboard/levelStar.svg" />
                                            <div className={styles.levelStarText}>{level}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.headerLeftButtons}>
                                <Button text="View User" icon={faUser} color="#2b57ff" onClick={() => console.log("")} />
                                <Button text="Unlock Blues" icon={faStore} color="#ffa31a" link={"/market"} />
                                {/* @ts-ignore */ }
                                {user.claimedAt <= (new Date).setUTCHours(0, 0, 0, 0) && <Button text="Claim Daily" icon={faStar} color="#00c20c" onClick={() => setDailyWheel(true)} />}
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottomContainer}>
                        <div className={styles.right}>
                            <div className={styles.statsContainer}>
                                <div className={styles.containerHeader}>
                                    <div className={styles.containerHeaderInside}>Stats</div>
                                </div>
                                <div className={styles.topStats}>
                                    <Stat title="Tokens" text={user.tokens.toLocaleString()} img={`https://media.blulet.org/dashboard/tokenIcon.svg`} tooltipId="tokens" tooltipContent="Total Tokens Currently in your Inventory" imgClass={styles.tokenImg} />
                                    <Stat title="Blues Unlocked" text={`${Object.keys(user.blues).length} / ${Object.values(allBlues).length}`} img={`https://media.blulet.org/dashboard/bluesUnlocked.svg`} tooltipId="totalBlues" tooltipContent="Total Unique Blues Unlocked in the Market" />
                                    <Stat title="Packs Opened" text={user.stats.packs.toLocaleString()} img={`https://media.blulet.org/dashboard/openedIcon.svg`} tooltipId="packsOpened" tooltipContent="Total Packs Opened in the Market" />
                                    <Stat title="Messages Sent" text={user.stats.messages.toLocaleString()} img={`https://media.blulet.org/dashboard/messagesIcon.svg`} tooltipId="messagesSent" tooltipContent="Total Messages Sent in Chat" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.statsContainer}>
                            <div className={styles.containerHeader}>
                                <div className={styles.containerHeaderInside}>Friends</div>
                            </div>
                            <div className={styles.containerHeaderRight} style={{ cursor: "pointer" }} onClick={() => setShowFriendsModal(true)}>
                                <div className={styles.containerHeaderInside}>Requests</div>
                            </div>
                            <div className={styles.topStats}>
                                <div className={styles.friendsContainer}>
                                    {friendsData.length === 0 ? (<div className={styles.noFriends}>You currently do not have any friends.</div>) : (friendsData.map((friend, i) => (
                                        <div className={styles.friend} key={i} onClick={() => navigate(`/stats?name=${friend.id}`)}>
                                            <img src={friend.banner} alt={friend.banner} draggable="false" className={styles.friendBanner} />
                                            <div className={`${styles.blueContainer} ${styles.blueBox}`}>
                                                <img src={friend.avatar} alt={friend.avatar} draggable="false" className={styles.blue} />
                                            </div>
                                            <Textfit className={`${styles.friendNameText} ${friend.color === "rainbow" ? styles.rainbow : ""}`} max={54} mode="single" style={{ color: friend.color }}>
                                                {friend.username}
                                            </Textfit>
                                            <Textfit className={styles.friendRoleText} max={54} mode="single">
                                                {friend.role}
                                            </Textfit>
                                        </div>
                                    )))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showFriendsModal && <FriendsModal />}
        </div>
    );
};