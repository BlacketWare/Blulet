import { useAuth } from "@contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Textfit } from "react-textfit";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useBlues } from "@contexts/BlueContext";
import { useRarities } from "@contexts/RarityContext";
import { usePacks } from "@contexts/PackContext";
import global from "@styles/dashboard.module.scss";
import Loader from "@components/Loader";
import styles from "@styles/blues.module.scss";
import Background from "@components/Background";
import Sidebar from "@components/Sidebar";

type Blue = {
    id: string;
    name: string;
    rarity: string;
    price: number;
    chance: number;
    image: string;
    background: string;
};

type Pack = {
    id: string;
    name: string;
    price: number;
    colors: string[];
    blues: string[];
    image: string;
};

export default function Blues() {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    const { allBlues } = useBlues();
    const { rarities } = useRarities();
    const { packs }: { packs: Record<string, Pack> } = usePacks();
    const [mLeftShowing, setMLeftShowing] = useState<boolean>(false);
    const [packsShowing, setPacksShowing] = useState<boolean>(true);
    const [rightBlue, setRightBlue] = useState<Blue>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let randomBlue = null;
        if (Object.keys(user.blues).length === 0) randomBlue = { name: "None", image: "https://media.blulet.org/blues/Default.svg", background: "https://media.blulet.org/blues/background/Default.svg", rarity: "Common" }
        else randomBlue = allBlues[Object.keys(user.blues)[Math.floor(Math.random() * Object.keys(user.blues).length)]];
        if (randomBlue) {
            setRightBlue(randomBlue);
            setLoading(false);
        }
    }, [allBlues]);

    return (
        <div className={global.body}>
            <Background />
            <Sidebar />
            {loading ? <Loader /> :
                <div className={global.profileBody}>
                    <div className={styles.topButtonRow}>
                        <div className={styles.settingButton} role="button" tabIndex={0} onClick={() => setPacksShowing(!packsShowing)}>{packsShowing ? "Hide" : "Show"} Packs</div>
                    </div>
                    <div className={`${styles.left} ${mLeftShowing ? styles.mShowLeft : ""}`}>
                        {packsShowing ? (
                            <div className={styles.bluesHolder}>
                                {Object.values(packs).sort((a: Pack, b: Pack) => a.name.localeCompare(b.name)).map((pack, i) => (
                                    <div className={styles.setHolder} key={i}>
                                        <div className={styles.setTop}>
                                            <div className={styles.setText}>{pack.name} Pack</div>
                                            <div className={styles.setDivider} />
                                        </div>
                                        <div className={styles.setBlues}>
                                            {pack.blues.map((blue, i) => <div className={styles.blueContainerHolder} key={i} role="button" tabIndex={0}>
                                                {user.blues[allBlues[blue].name] >= 1 && user.blues[allBlues[blue].name] !== undefined ? <>
                                                    <div className={`${styles.blueContainerInside} ${styles.blueInside}`} onClick={() => { setRightBlue(allBlues[blue]); setMLeftShowing(false); }}>
                                                        <img className={styles.blue} src={allBlues[blue].image} />
                                                    </div>
                                                    <div className={styles.blueText} style={{ backgroundColor: rarities[allBlues[blue].rarity].color }}>
                                                        {user.blues[allBlues[blue].name] && user.blues[allBlues[blue].name].toLocaleString()}
                                                    </div>
                                                </> : <>
                                                    <div className={`${styles.blueContainerInside} ${styles.blueInside} ${styles.lockedBlue}`}>
                                                        <img className={styles.blue} src={allBlues[blue].image} />
                                                    </div>
                                                    <FontAwesomeIcon className={styles.blueLock} icon={faLock} style={{ cursor: "default" }} />
                                                </>}
                                            </div>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.soloBluesHolder}>
                                {Object.values(packs).sort((a: Pack, b: Pack) => a.name.localeCompare(b.name)).map((pack: Pack) => {
                                    return pack.blues.map((blue, j) => <div className={styles.blueContainerHolder} key={j} role="button" tabIndex={0}>
                                        {user.blues[allBlues[blue].name] >= 1 && user.blues[allBlues[blue].name] !== undefined ? <>
                                            <div className={`${styles.blueContainerInside} ${styles.blueInside}`} onClick={() => { setRightBlue(allBlues[blue]); setMLeftShowing(false); }}>
                                                <img className={styles.blue} src={allBlues[blue].image} />
                                            </div>
                                            <div className={styles.blueText} style={{ backgroundColor: rarities[allBlues[blue].rarity].color }}>{user.blues[allBlues[blue].name].toLocaleString()}</div>
                                        </> : <>
                                            <div className={`${styles.blueContainerInside} ${styles.blueInside} ${styles.lockedBlue}`}>
                                                <img className={styles.blue} src={allBlues[blue].image} />
                                            </div>
                                            <FontAwesomeIcon className={styles.blueLock} icon={faLock} style={{ cursor: "default" }} />
                                        </>}
                                    </div>
                                    )
                                })};
                            </div>
                        )}
                    </div>
                    <div className={`${styles.button} ${styles.mBluesButton}`} role="button" tabIndex={0} onClick={() => { setMLeftShowing(!mLeftShowing); setPacksShowing(false); }}>
                        <div className={styles.shadow} />
                        <div className={styles.edge} />
                        <div className={styles.front}>
                            <div className={styles.mBluesButtonInside}>
                                Change Blue
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <img className={styles.rightBackground} src={rightBlue ? rightBlue.background : ""} />
                        <div className={styles.rightTopText}>
                            <Textfit className={styles.highlightedName} min={1} max={40} mode="single">
                                {rightBlue ? rightBlue.name : ""}
                            </Textfit>
                            <div className={styles.highlightedRarity} style={{ color: rightBlue ? rarities && rarities[rightBlue.rarity] ? rarities[rightBlue.rarity].color : "#000000" : "" }}>
                                {rightBlue && rarities && rarities[rightBlue.rarity] ? rarities[rightBlue.rarity].name : ""}
                            </div>
                        </div>
                        <div className={`${styles.blueContainer} ${styles.rightBlue}`}>
                            <img className={styles.blue} src={rightBlue ? rightBlue.image : ""} />
                        </div>
                        <div className={styles.highlightedBottom}>{Object.keys(user.blues).length > 0 ? user.blues[rightBlue ? rightBlue.name : ""].toLocaleString() : 0} Owned</div>
                        <div className={styles.rightBottom} />
                    </div>
                    <div className={styles.rightButtonRow}>
                        <div className={`${styles.button} ${styles.rightButton}`} role="button" tabIndex={0}>
                            <div className={styles.shadow} />
                            <div className={styles.edge} />
                            <div className={styles.front}>
                                <div className={styles.rightButtonInside}>
                                    <img className={styles.rightButtonImg} src="https://media.blulet.org/dashboard/tokenIcon.svg" draggable="false" />
                                    Sell
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};