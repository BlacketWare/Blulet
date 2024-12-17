import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import styles from "@styles/home.module.scss";
import Background from "@components/Background";

export default function Home() {
    return (
        <>
            <div className={styles.headerContainer}>
                <img src="https://media.blulet.org/default/homeBlues.png" alt="blues" className={styles.headerImage} draggable="false" />
                <Background />

                <div className={styles.headerSide} />
                <div className={styles.topHeaderContainer}>
                    <div className={styles.logoText}>Blulet</div>
                </div>

                <div className={styles.welcomeContainer}>
                    <div className={styles.welcomeText}>Blooket<br />But<br />Blue</div>
                    <div className={styles.welcomeDesc}>The newest and greatest Blooket Private Server<br />written with TypeScript and React.</div>

                    <div className={styles.welcomeButtons}>
                        <Link className={styles.welcomeButton} to="/register">Register</Link>
                        <Link className={styles.welcomeButton} to="/discord">Discord</Link>
                    </div>
                    <div className={styles.pronounceButton} onClick={() => new Audio("https://media.blulet.org/default/blulet.wav").play()}><FontAwesomeIcon icon={faVolumeHigh} />&nbsp;Pronunciation (&quot;Blue-lit&quot;)</div>
                </div>
            </div>

            <div className={styles.topButtonContainer}>
                <Link className={`${styles.topButton} ${styles.loginButton}`} to="/login">Login</Link>
                <Link className={`${styles.topButton} ${styles.registerButton}`} to="/register">Register</Link>
            </div>

            <div className={styles.infoHolder}>
                Created by monkxy and zastix.<br />
            Blulet © {new Date().getFullYear()} All Rights Reserved.
        </div >
        </>
    );
};