import { useEffect, useState, useRef } from "react";
import { useAuth } from "@contexts/AuthContext";
import styles from "@styles/dashboard.module.scss";
import ApiController from "../../utils/ApiController";

const rewards = [
    500,
    550,
    600,
    650,
    700,
    800,
    900,
    1000,
];

let degrees = [
    -247.5,
    -292.5,
    -337.5,
    -382.5,
    -427.5,
    -472.5,
    -517.5,
    -562.5,
];

const prizeDeg = [
    22.5,
    67.5,
    112.5,
    157.5,
    202.5,
    247.5,
    292.5,
    337.5
];

export default function DailyWheel() {
    const { user, setUser } = useAuth();

    const wheelRef = useRef<HTMLDivElement>(null);
    const [modalShowing, setModalShowing] = useState<boolean>(true);
    const [spinning, setSpinning] = useState<boolean>(false);
    const [buttons, setShowing] = useState<boolean>(false);
    const [reward, setReward] = useState<number>(0);

    const formatNumber = (num: number) => {
        if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
        return num;
    };

    useEffect(() => {
        ApiController.market.claimDaily().then(res => {
            setReward(res.reward);
            wheelRef.current!.style.transform = `rotate(${degrees[res.reward - 1]}deg)`;
        });
    }, [])

    return (
        <>
            {modalShowing && <div className={styles.modal}>
                <div className={styles.tokenContainer}>
                    <div className={styles.modalHeader}>Spin the Daily Wheel!</div>
                    <div className={styles.wheelWrapper} role="button" tabIndex={0} onClick={() => {
                        setSpinning(true);
                        setTimeout(() => {
                            setShowing(true);
                            setUser({ ...user, tokens: user.tokens + rewards[reward - 1], claimedAt: Date.now() });
                        }, 4000);
                    }}>
                        <img className={styles.wheelStand} src="https://media.blulet.org/dashboard/wheelStand.svg" alt="Wheel Stand" draggable="false" />
                        <div className={styles.wheelContainer} ref={wheelRef} style={{ transform: "rotate(-337.5deg)" }}>
                            <div className={`${styles.wheelContainerInside} ${spinning ? styles.spinning : ""}`}>
                                <img className={styles.wheelImg} src="https://media.blulet.org/dashboard/wheel.svg" alt="Wheel" draggable="false" />
                                {rewards.map((reward, index) => (
                                    <div className={styles.prizeContainer} style={{ transform: `rotate(${prizeDeg[index]}deg)` }} key={index}>
                                        <img src="https://media.blulet.org/dashboard/tokenIcon.svg" className={styles.wheelToken} alt="Token" draggable="false" />
                                        <div className={styles.prizeText}>+ {formatNumber(reward)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <img className={styles.wheelArrow} src="https://media.blulet.org/dashboard/wheelArrow.svg" alt="Wheel Arrow" draggable="false" />
                    </div>
                    {buttons && <div className={styles.buttonRow}>
                        <div className={`${styles.button} ${styles.nextButton}`} role="button" tabIndex={0} onClick={() => setModalShowing(false)}>
                            <div className={styles.shadow}></div>
                            <div className={styles.edge} style={{ backgroundColor: "#7289da" }}></div>
                            <div className={`${styles.front} ${styles.nextButtonInside}`} style={{ backgroundColor: "#7289da" }}>
                                Close
                            </div>
                        </div>
                    </div>}
                </div>
            </div>}
        </>
    )
}