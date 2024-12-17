import { Link } from "react-router-dom";
import Background from "@components/Background";
import styles from "@styles/errors.module.scss";

export default function Blacklisted({ reason }: { reason: string }) {
    document.title = "Blacklisted | Blulet";

    return (
        <div className={styles.body}>
            <Background />
            <div className={styles.header}><Link className={styles.bluletText} to="/">Blulet</Link></div>
            <div className={styles.regularBody}>
                <div className={styles.container}>

                    <div className={styles.containerHeader}>
                        4
                        <div className={`${styles.blueContainer} ${styles.errorBlue}`}>
                            <img className={styles.errorBlue} src={Math.random() > 0.5 ? "https://media.blulet.org/blues/monkxy.svg" : "https://media.blulet.org/blues/zastix.svg"} alt="blue" />
                        </div>
                        3
                    </div>
                    <div className={styles.containerText}>{reason}</div>
                </div>
            </div>
        </div>
    );
};
