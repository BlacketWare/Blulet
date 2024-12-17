import { Game, Scale, WEBGL } from "phaser";
import { useAuth } from "@contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState, useRef, RefObject } from "react";
import { Textfit } from "react-textfit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import { useBlues } from "@contexts/BlueContext";
import { useRarities } from "@contexts/RarityContext";
import { usePacks } from "@contexts/PackContext";
import Particles from "./Particles.js";
import styles from "@styles/market.module.scss";
import dStyles from "@styles/dashboard.module.scss";
import global from "@styles/dashboard.module.scss";
import Background from "@components/Background";
import Sidebar from "@components/Sidebar";
import ApiController from "../../utils/ApiController";

type Pack = {
    id: string;
    name: string;
    price: number;
    colors: string[];
    blues: string[];
    image: string;
};

type ParticlesScene = Phaser.Scene & {
    initParticles: () => void;
    game: Game;
};

type Config = {
    type: number;
    parent: string | HTMLDivElement | null;
    width: string;
    height: string;
    transparent: boolean;
    scale: { mode: number; autoCenter: number };
    physics: { default: string };
    scene: ParticlesScene;
};

type GameState = {
    type: number;
    parent: string;
    width: string;
    height: string;
    transparent: boolean;
    scale: { mode: number; autoCenter: number; };
    physics: { default: string; };
    scene: ParticlesScene;
};

const useGame = (config: Config, containerRef: RefObject<HTMLDivElement>) => {
    const [game, setGame] = useState<Game | null>(null);
    const oldConfig = useRef<Config | null>(null);

    useEffect(() => {
        if ((!game && containerRef.current) || config !== oldConfig.current) {
            if (!containerRef.current) return;
            oldConfig.current = config;
            const newGame = new Game({ ...config, parent: containerRef.current });
            config.scene.game = newGame;
            config.scene.initParticles();
            setGame(newGame);
        }
        return () => {
            game?.destroy(true);
        };
    }, [config, containerRef, game]);

    return game;
};

export default function Market() {
    const { user, setUser } = useAuth();

    if (!user) return <Navigate to="/login" />;

    const { allBlues } = useBlues();
    const { rarities } = useRarities();
    const { packs: marketPacks }: { packs: Record<string, Pack> } = usePacks();

    const [tokens, setTokens] = useState<number>(0);
    const [instantOpen, setInstantOpen] = useState<boolean>(localStorage.getItem("instantOpen") === "true" ? true : false);
    const [currentPack, setCurrentPack] = useState<string>("Debug");
    const [currentBlues, setCurrentBlues] = useState<string[]>([]);
    const [openPack, setOpenPack] = useState<boolean>(false);
    const [canOpen, setCanOpen] = useState<boolean>(false);
    const [doneOpening, setDoneOpening] = useState<boolean>(false);
    const [opening, setOpening] = useState<boolean>(false);
    const [unlockedBlue, setUnlockedBlue] = useState<string>("");
    const [isNew, setIsNew] = useState<boolean>(false);
    const [waiting, setWaiting] = useState<boolean>(false);
    const [showingModal, setShowingModal] = useState<boolean>(false);
    const [game, setGame] = useState<GameState>({
        type: WEBGL,
        parent: "phaser-market",
        width: "100%",
        height: "100%",
        transparent: true,
        scale: { mode: Scale.NONE, autoCenter: Scale.CENTER_BOTH },
        physics: { default: "arcade" },
        scene: {
            game: {} as Game,
            initParticles: () => { },
        } as ParticlesScene,
    });
    const gameRef = useRef<HTMLDivElement | null>(null);
    useGame(game, gameRef);
    useEffect(() => setTokens(user.tokens), []);

    const setInstantOpenLocal = (instantOpen: boolean) => {
        localStorage.setItem("instantOpen", instantOpen.toString());
        setInstantOpen(instantOpen);
    };

    const purchasePack = async (pack: string) => {
        setCurrentPack(pack);
        setCurrentBlues(marketPacks[pack].blues)

        if (instantOpen) {
            await ApiController.market.purchasePack(pack).then((res) => {
                setUnlockedBlue(res.blue);
                setIsNew(res.isNew);
                setTokens(res.tokens);
                setUser({
                    ...user, tokens: res.tokens,
                    blues: { ...user.blues, [res.blue]: user.blues[res.blue] ? user.blues[res.blue] + 1 : 1 },
                    stats: { ...user.stats, packs: user.stats.packs += 1 }
                });
            });


            setGame({
                type: WEBGL, parent: "phaser-market", width: "100%", height: "100%", transparent: true,
                scale: { mode: Scale.NONE, autoCenter: Scale.CENTER_BOTH },
                physics: { default: "arcade" },
                scene: new Particles("Uncommon")
            });
            setOpenPack(true);
            setCanOpen(true);
            setDoneOpening(false);
            setOpening(false);
        } else setShowingModal(true);
    };

    const purchaseManually = async (pack: string) => {
        await ApiController.market.purchasePack(pack).then((res) => {
            setUnlockedBlue(res.blue); setIsNew(res.isNew); setTokens(res.tokens); setUser({ ...user, tokens: res.tokens, blues: { ...user.blues, [res.blue]: user.blues[res.blue] ? user.blues[res.blue] + 1 : 1 }, stats: { ...user.stats, packs: user.packs += 1 } });
        });

        setGame({
            type: WEBGL, parent: "phaser-market", width: "100%", height: "100%", transparent: true,
            scale: { mode: Scale.NONE, autoCenter: Scale.CENTER_BOTH },
            physics: { default: "arcade" },
            scene: new Particles("Uncommon")
        });
        setOpenPack(true);
        setCanOpen(true);
        setDoneOpening(false);
        setOpening(false);
    };

    const handleBigClick = async () => {
        if (!opening && canOpen && !waiting) {
            startOpening();
            setWaiting(true);
            setTimeout(() => {
                setWaiting(false);
            }, rarities[allBlues[unlockedBlue].rarity].waitTime);
            await new Promise(r => setTimeout(r, 500));
            game?.scene.game.events.emit("start-particles", rarities[allBlues[unlockedBlue].rarity].name);
        } else if (doneOpening) {
            setDoneOpening(false);
            setOpenPack(false);
            setCanOpen(false);
            setOpening(false);
            setUnlockedBlue("");
            setIsNew(false);
        } else if (opening && !waiting) {
            setDoneOpening(true);
        };
    };

    const startOpening = () => setOpening(true);


    return (
        <div className={global.body}>
            <Background />
            <Sidebar aditionalRow={<div className={dStyles.tokenBalance}>
                <img src="https://media.blulet.org/dashboard/tokenIcon.svg" className={dStyles.tokenBalanceIcon} alt="Token" draggable="false" />
                {tokens.toLocaleString()}</div>}
            />

            <div className={global.profileBody}>
                <div className={global.header}>Market</div>
                <div className={global.mTokenBalance}>
                    <img src="https://media.blulet.org/dashboard/tokenIcon.svg" className={global.tokenBalanceIcon} alt="Token" draggable="false" />
                    {tokens.toLocaleString()}
                </div>
                <div className={styles.flex}>
                    <div className={styles.mInstantButton} onClick={() => setInstantOpenLocal(!instantOpen)}>
                        Instant Open: {instantOpen ? "On" : "Off"}
                    </div>
                </div>
                <div className={styles.storeContainer}>
                    <img src="https://media.blulet.org/dashboard/mark.svg" className={styles.cashierBlue} alt="Mark the Cashier" draggable="false" />
                    <img src="https://media.blulet.org/dashboard/store.svg" className={styles.storeImg} alt="Store" draggable="false" />
                    <div className={styles.instantOpen} onClick={() => setInstantOpenLocal(!instantOpen)}>Instant Open: {instantOpen ? "On" : "Off"}</div>
                </div>
                <div className={styles.leftColumn}>
                    <div className={styles.packsWrapper}>
                        {Object.values(marketPacks).sort((a, b) => a.price - b.price || a.name.localeCompare(b.name)).reverse().map((pack: Pack, i) => (
                            <div className={styles.packContainer} key={i} style={{ background: `radial-gradient(circle, ${pack.colors[0]} 0%, ${pack.colors[1]} 100%)` }} onClick={() => purchasePack(pack.id)}>
                                <div className={styles.packImgContainer}>
                                    <img src={`https://media.blulet.org/packs/${pack.name}.png`} className={styles.packShadow} alt={pack.name} draggable="false" />
                                    <img src={`https://media.blulet.org/packs/${pack.name}.png`} className={styles.packImg} alt={pack.name} draggable="false" />
                                </div>
                                <div className={styles.packBottom}>
                                    <img src="https://media.blulet.org/dashboard/tokenIcon.svg" className={styles.packPriceImg} alt="Token" draggable="false" />
                                    {pack.price.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showingModal && (
                <div className={styles.modal}>
                    <form className={styles.container}>
                        <div className={styles.text}>
                            <div>
                                Purchase the {marketPacks[currentPack].name} Pack
                                <FontAwesomeIcon icon={faQuestionCircle} className={styles.rateIcon} data-tooltip-id="packRates" />
                                <Tooltip className={styles.blooketTooltip} id="packRates" place="left">
                                    <div>Pack Rates:</div>
                                    {currentBlues.map((b: string, i: number) => <div key={i}>{b}: {allBlues[b].chance}%</div>)}
                                </Tooltip> for {marketPacks[currentPack].price.toLocaleString()} tokens?
                            </div>
                        </div>
                        <div className={styles.holder}>
                            <div className={styles.buttonContainer}>
                                <div className={styles.button} onClick={() => {
                                    setShowingModal(false);
                                    purchaseManually(currentPack);
                                }}>
                                    <div className={styles.shadow} />
                                    <div className={styles.edge} />
                                    <div className={`${styles.front} ${styles.buttonInside}`}>
                                        Yes
                                    </div>
                                </div>
                                <div className={styles.button} onClick={() => setShowingModal(false)}>
                                    <div className={styles.shadow} />
                                    <div className={styles.edge} />
                                    <div className={`${styles.front} ${styles.buttonInside}`}>
                                        No
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input className={styles.hiddenSubmit} type="submit" />
                    </form>
                </div>
            )}

            {openPack && (
                <>
                    <div className={styles.openBackground} style={{ background: `radial-gradient(circle, ${marketPacks[currentPack].colors[0]} 0%, ${marketPacks[currentPack].colors[1]} 100%)` }}>
                        <div ref={gameRef} className={styles.phaserContainer} />

                        <div className={`${styles.openContainer} ${opening ? styles[`openingContainer${rarities[allBlues[unlockedBlue].rarity].name}`] : ""}`}>
                            <img src={allBlues[unlockedBlue].background}
                                className={styles.blueBackground} draggable="false" />
                            <div className={`${styles.blueContainer} ${styles.unlockedBlueImage}`}>
                                <img src={allBlues[unlockedBlue].image} className={styles.blue} draggable="false" alt="Blue" />
                            </div>
                            <div className={styles.unlockedText}>
                                <Textfit mode="single" min={1} max={40} throttle={50} className={styles.unlockedBlue}>{allBlues[unlockedBlue].name}</Textfit>
                                <div className={styles.rarityText} style={{ color: rarities[allBlues[unlockedBlue].rarity].color }}>{allBlues[unlockedBlue].rarity}</div>
                            </div>
                            <div className={styles.bottomText}>{allBlues[unlockedBlue].chance}% {isNew ? "- NEW!" : ""}</div>
                            <div className={styles.bottomShadow} />
                        </div>
                        <div className={`${styles.openPackContainer} ${opening ? styles.openingPackContainer : ""}`} role="button" tabIndex={0}>
                            <div className={`${styles.openPackTop} ${opening ? styles.isOpeningPackTop : ""}`} style={{ backgroundImage: `url("https://media.blulet.org/dashboard/packSeal.svg")` }} />
                            <img src={marketPacks[currentPack].image} className={`${styles.openPack} ${opening ? styles.isOpeningPack : ""}`} alt={currentPack} draggable="false" />
                        </div>
                        <div className={`${styles.openBigButton} ${canOpen ? styles.canOpen : ""}`} role="button" tabIndex={0} onClick={() => handleBigClick()} />
                    </div>
                </>
            )}
        </div>
    );
};