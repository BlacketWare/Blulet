import { useAuth } from "@contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import Background from "@components/Background";
import global from "@styles/dashboard.module.scss";
import styles from "@styles/store.module.scss";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "stripe-buy-button": any;
        }
    }
}

export default function Pro() {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    return (
        <div className={global.body}>
            <div className={styles.header}><Link className={styles.bluletText} to="/">Blulet</Link><Link className={styles.headerRight} to="/settings">Settings</Link></div>
            <Background />
            <div className={styles.regularBody}>
                <div className={styles.centerWrapper}>
                    <div className={styles.spacer} />
                    <div className={styles.payContainer}>
                        <div className={styles.payHeader}>Checkout</div>
                        <div className={styles.paySpacer} />
                        <div className={styles.payRow}>
                            <div className={styles.payColumn}>
                                <div className={styles.payItem}>Blulet Pro</div>
                                <div className={styles.payDesc}>one time purchase</div>
                            </div>
                            <div className={styles.payPrice}>$9.99</div>
                        </div>
                        <div className={styles.paySpacer} />
                        {/* {<div className={`${styles.button} ${styles.payButton}`} onClick={() => {
                            window.open("https://buy.stripe.com/test_8wM3ex2PK0C09JSeUW?locale=en&__embed_source=buy_btn_1OSFYXEAVuYq2doW0gbFxbWT")
                        }}>
                            <div className={styles.shadow} />
                            <div className={styles.edge} style={{ backgroundColor: "#009bff" }} />
                            <div className={`${styles.front} ${styles.planButtonInside}`} style={{ backgroundColor: "#009bff" }}>
                                Checkout Now
                            </div>
                        </div>} */}
                        <stripe-buy-button
                            buy-button-id="buy_btn_1OSFYXEAVuYq2doW0gbFxbWT"
                            publishable-key="pk_test_51OMjv4EAVuYq2doWJHmRs78DXFuQYqVxAM2OFdHFc1rWVg8f2WhH7JjUM40bbavaHdac3p8JHgRVttRW3FrP5C6Q00aru9li6S"
                        >
                        </stripe-buy-button>
                    </div>
                    <div className={styles.spacer} />
                </div>
            </div>
        </div>
    )
};