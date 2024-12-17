import { useAuth } from "@contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import Background from "@components/Background";
import global from "@styles/dashboard.module.scss";
import styles from "@styles/store.module.scss";

export default function Store() {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    return (
        <div className={global.body}>
            <div className={styles.header}><Link className={styles.bluletText} to="/">Blulet</Link><Link className={styles.headerRight} to="/settings">Settings</Link></div>
            <Background />
            <div className={styles.regularBody}>
                <div className={styles.planContainer}>
                    <div className={styles.plan}>
                        <div className={styles.planBackgroundContainer}>
                            <div className={`${styles.planBackground} ${styles.plan2}`} />
                        </div>
                        <div className={styles.planTop}>Pro</div>
                        <div className={styles.planPrice}>$9.99</div>
                        <div className={styles.planSubText}>one time purchase</div>
                        <div className={styles.planDetail}>You get rights (no longer poor)</div>
                        <div className={styles.planSpacer} />
                        <div className={styles.planDetail}>You make monkxy not poor (rich)</div>
                        <Link to="/store/checkout/pro" className={`${styles.button} ${styles.planButton}`}>
                            <div className={styles.shadow} />
                            <div className={styles.edge} style={{ backgroundColor: "#009bff" }} />
                            <div className={`${styles.front} ${styles.planButtonInside}`} style={{ backgroundColor: "#009bff" }}>
                                Buy Now (or else)
                            </div>
                        </Link>
                        <div className={styles.planShimmer} />
                    </div>
                </div>
            </div>
        </div>
    );
};