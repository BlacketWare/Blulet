import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import Background from "@components/Background";
import styles from "@styles/errors.module.scss";

interface RouterError {
    statusText?: string;
    message?: string;
}

export default function ErrorPage() {
    const error = useRouteError() as RouterError;
    document.title = "Error | Blulet";

    return (
        <div className={styles.body}>
            <Background />
            <div className={styles.header}><Link className={styles.bluletText} to="/">Blulet</Link></div>
            <div className={styles.regularBody}>
                <div className={styles.container}>
                    {error.statusText || error.message === "Not Found" ? <>
                        <div className={styles.containerHeader}>
                            4
                            <div className={`${styles.blueContainer} ${styles.errorBlue}`}>
                                <img className={styles.errorBlue} src={Math.random() > 0.5 ? "https://media.blulet.org/blues/monkxy.svg" : "https://media.blulet.org/blues/zastix.svg"} alt="blue" />
                            </div>
                            4
                        </div>
                        <div className={styles.containerText}>Not Found</div>
                    </> : <>
                        <div className={styles.containerHeader}>
                            5
                            <div className={`${styles.blueContainer} ${styles.errorBlue}`}>
                                <img className={styles.errorBlue} src="https://media.blulet.org/blues/monkxy.svg" alt="blue" />
                            </div>
                            <div className={`${styles.blueContainer} ${styles.errorBlue}`}>
                                <img className={styles.errorBlue} src="https://media.blulet.org/blues/zastix.svg" alt="blue" />
                            </div>
                        </div>
                        <div className={styles.containerText}>{error.statusText || error.message || "Sorry, an unexpected error has occurred."}</div>
                    </>}
                </div>
            </div>
        </div>
    );
};
