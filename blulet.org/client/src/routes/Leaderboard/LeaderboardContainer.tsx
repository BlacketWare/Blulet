import { Textfit } from "react-textfit";
import { isMobile } from "react-device-detect";
import { useLeaderboard } from "@contexts/LeaderboardContext";
import styles from "@styles/leaderboard.module.scss";
import global from "@styles/dashboard.module.scss";

type LeaderboardUser = {
    username: string;
    avatar: string;
    tokens: number;
    color: string;
}

export default function LeaderboardComponent() {
    const { leaderboard, meLocation } = useLeaderboard();

    return (
        <div className={styles.hostBody} style={{ overflowY: "auto" }}>
            <div className={styles.hostRegularBody}>
                {!isMobile && <>
                    <div className={styles.containerOne}>
                        <div className={styles.containerInside}>
                            {isMobile && <Textfit mode="single" max={30} className={styles.nameTextOne}>
                                <div className={leaderboard[0]?.color === "rainbow" ? global.rainbow : ""} style={{ display: "block", fontFamily: "Titan One", color: leaderboard[0]?.color }}>{leaderboard[0]?.username}</div>
                            </Textfit>}
                            {!isMobile && <Textfit mode="single" max={88} className={styles.nameTextOne}>
                                <div className={leaderboard[0]?.color === "rainbow" ? global.rainbow : ""} style={{ display: "block", fontFamily: "Titan One", color: leaderboard[0]?.color }}>{leaderboard[0]?.username}</div>
                            </Textfit>}
                            <div className={styles.scoreTextOne} style={{ fontSize: "50px", whiteSpace: "nowrap" }}>
                                <div style={{ display: "block", whiteSpace: "nowrap" }}>{leaderboard[0]?.tokens.toLocaleString()} <img src="https://media.blulet.org/dashboard/tokenIcon.svg" className={styles.tokenIcon} draggable="false" /></div>
                            </div>
                            <div className={styles.placeOne}>
                                <div className={styles.placeText} style={{ fontSize: "84px", whiteSpace: "nowrap" }}>
                                    <div style={{ display: "block", whiteSpace: "nowrap", fontFamily: "Titan One" }}>1</div>
                                </div>
                                <div className={styles.superPlaceText} style={{ fontSize: "28px", whiteSpace: "nowrap" }}>
                                    <div style={{ display: "block", whiteSpace: "nowrap", fontFamily: "Titan One" }}>st</div>
                                </div>
                            </div>
                            <div className={`${styles.blueContainer} ${styles.firstBlue}`}>
                                <img
                                    src={leaderboard[0]?.avatar}
                                    alt={leaderboard[0]?.avatar}
                                    draggable="false"
                                    className={styles.blue}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.containerTwo}>
                        <div className={styles.containerInside}>
                            <Textfit mode="single" max={78} className={styles.nameTextTwo}>
                                <div className={leaderboard[1]?.color === "rainbow" ? global.rainbow : ""} style={{ display: "block", fontFamily: "Titan One", color: leaderboard[1]?.color }}>{leaderboard[1]?.username}</div>
                            </Textfit>
                            <div className={styles.scoreTextTwo} style={{ fontSize: "41px", whiteSpace: "nowrap" }}>
                                <div style={{ display: "block", whiteSpace: "nowrap" }}>{leaderboard[1]?.tokens.toLocaleString()} <img src="https://media.blulet.org/dashboard/tokenIcon.svg" className={styles.tokenIcon} draggable="false" /></div>
                            </div>
                            <div className={styles.placeTwo}>
                                <div className={styles.placeText} style={{ fontSize: "84px", whiteSpace: "nowrap" }}>
                                    <div style={{ display: "block", whiteSpace: "nowrap", fontFamily: "Titan One" }}>2</div>
                                </div>
                                <div className={styles.superPlaceText} style={{ fontSize: "28px", whiteSpace: "nowrap" }}>
                                    <div style={{ display: "block", whiteSpace: "nowrap", fontFamily: "Titan One" }}>nd</div>
                                </div>
                            </div>
                            <div className={`${styles.blueContainer} ${styles.secondBlue}`}>
                                <img
                                    src={leaderboard[1]?.avatar}
                                    alt={leaderboard[1]?.avatar}
                                    draggable="false"
                                    className={styles.blue}
                                />
                            </div>
                        </div>
                    </div>


                    <div className={styles.containerThree}>
                        <div className={styles.containerInside}>
                            <Textfit mode="single" max={68} className={styles.nameTextThree}>
                                <div className={leaderboard[2]?.color === "rainbow" ? global.rainbow : ""} style={{ display: "block", fontFamily: "Titan One", color: leaderboard[2]?.color }}>{leaderboard[2]?.username}</div>
                            </Textfit>
                            <div className={styles.scoreTextThree} style={{ fontSize: "35px", whiteSpace: "nowrap" }}>
                                <div style={{ display: "block", whiteSpace: "nowrap" }}>{leaderboard[2]?.tokens.toLocaleString()} <img src="https://media.blulet.org/dashboard/tokenIcon.svg" className={styles.tokenIcon} draggable="false" /></div>
                            </div>
                            <div className={styles.placeThree}>
                                <div className={styles.placeText} style={{ fontSize: "84px", whiteSpace: "nowrap" }}>
                                    <div style={{ display: "block", whiteSpace: "nowrap", fontFamily: "Titan One" }}>3</div>
                                </div>
                                <div className={styles.superPlaceText} style={{ fontSize: "28px", whiteSpace: "nowrap" }}>
                                    <div style={{ display: "block", whiteSpace: "nowrap", fontFamily: "Titan One" }}>rd</div>
                                </div>
                            </div>
                            <div className={`${styles.blueContainer} ${styles.thirdBlue}`}>
                                <img
                                    src={leaderboard[2]?.avatar}
                                    alt={leaderboard[2]?.avatar}
                                    draggable="false"
                                    className={styles.blue}
                                />
                            </div>
                        </div>
                    </div>
                </>}

                <div className={styles.standingsArray}>
                    {!isMobile && leaderboard.slice(3).map((user: LeaderboardUser, i: number) => (
                        <div className={styles.standingHolder} key={user.username}>
                            <div className={styles.standingContainer}>
                                <div className={styles.standingPlaceText}>{i + 4}</div>
                                <div className={styles.standingSuperPlaceText}>{i + 4 === 11 ? "th" : i + 4 === 12 ? "th" : i + 4 === 13 ? "th" : (i + 4) % 10 === 1 ? "st" : (i + 4) % 10 === 2 ? "nd" : (i + 4) % 10 === 3 ? "rd" : "th"}</div>
                                <div className={`${styles.blueContainer} ${styles.standingBlook}`}>
                                    <img
                                        src={user.avatar}
                                        alt={user.avatar}
                                        draggable="false"
                                        className={styles.blue}
                                    />
                                </div>
                                <div className={styles.standingNameText}>{user.username}</div>
                                <div className={styles.standingStatText}>{user.tokens.toLocaleString()} <img src="https://media.blulet.org/dashboard/tokenIcon.svg" className={styles.tokenIcon} draggable="false" /></div>
                            </div>
                        </div>
                    ))}
                    {isMobile && leaderboard.map((user: LeaderboardUser, i: number) => (
                        <div className={styles.standingHolder} key={user.username}>
                            <div className={styles.standingContainer}>
                                <div className={styles.standingPlaceText}>{i + 1}</div>
                                <div className={styles.standingSuperPlaceText}>{i + 1 === 11 ? "th" : i + 1 === 12 ? "th" : i + 1 === 13 ? "th" : (i + 1) % 10 === 1 ? "st" : (i + 1) % 10 === 2 ? "nd" : (i + 1) % 10 === 3 ? "rd" : "th"}</div>
                                <div className={`${styles.blueContainer} ${styles.standingBlook}`}>
                                    <img
                                        src={user.avatar}
                                        alt={user.avatar}
                                        draggable="false"
                                        className={styles.blue}
                                    />
                                </div>
                                <div className={styles.standingNameText}>{user.username}</div>
                                <div className={styles.standingStatText}>{user.tokens.toLocaleString()} <img src="https://media.blulet.org/dashboard/tokenIcon.svg" className={styles.tokenIcon} draggable="false" /></div>
                            </div>
                        </div>
                    ))}
                    {meLocation.position && (
                        <div className={styles.standingHolder}>
                            <div className={styles.standingContainer}>
                                <div className={styles.standingPlaceText}>{meLocation.position}</div>
                                <div className={styles.standingSuperPlaceText}>{meLocation.position === 11 ? "th" : meLocation.position === 12 ? "th" : meLocation.position === 13 ? "th" : (meLocation.position) % 10 === 1 ? "st" : (meLocation.position) % 10 === 2 ? "nd" : (meLocation.position) % 10 === 3 ? "rd" : "th"}</div>
                                <div className={`${styles.blueContainer} ${styles.standingBlook}`}>
                                    <img
                                        src={meLocation.avatar}
                                        alt={meLocation.avatar}
                                        draggable="false"
                                        className={styles.blue}
                                    />
                                </div>
                                <div className={styles.standingNameText}>{meLocation.username}</div>
                                <div className={styles.standingStatText}>{meLocation.tokens.toLocaleString()} <img src="https://media.blulet.org/dashboard/tokenIcon.svg" className={styles.tokenIcon} draggable="false" /></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};