import { Link, Navigate } from "react-router-dom";
import { useState, MouseEvent, useRef, MutableRefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@contexts/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";
import ApiController from "../../../utils/ApiController";
import styles from "@styles/auth.module.scss";
import Background from "@components/Background";

type Error = {
    error: boolean;
    message: string;
    username: boolean;
    password: boolean;
};

export default function Login() {
    const { user, getLoggedIn } = useAuth();
    const reCaptchaRef = useRef<ReCAPTCHA>() as MutableRefObject<ReCAPTCHA>;
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error>({ error: false, message: "", username: false, password: false });

    if (user) return <Navigate to="/stats" />;

    const handleLogin = async (username: string, password: string) => {
        setError({ error: false, message: "", username: false, password: false });
        if (!username && !password) return setError({ error: true, message: "You must provide a username and password.", username: true, password: true });
        if (!username) return setError({ error: true, message: "You must provide a username.", username: true, password: false });
        if (!password) return setError({ error: true, message: "You must provide a password.", username: false, password: true });
        setLoading(true);
        const token = await reCaptchaRef.current.executeAsync();

        ApiController.authentication.login(username, password, token as string).then((res: any) => {
            reCaptchaRef.current.reset();
            setLoading(false);
            localStorage.setItem("token", res.token);
            getLoggedIn();
        }).catch((error: any) => {
            reCaptchaRef.current.reset();
            setLoading(false);
            if (error.response.status === 404) return setError({ error: true, message: error.response.data.error, username: true, password: true });
            else if (error.response.status === 400) return setError({ error: true, message: error.response.data.error, username: false, password: true });
            else if (error.response.status === 403) return setError({ error: true, message: error.response.data.error, username: true, password: true });
            else return setError({ error: true, message: "An unknown error occurred.", username: false, password: false });
        });
    };

    return (
        <div className={styles.outerContainer}>
            <Background />
            <ReCAPTCHA
                sitekey="6Lf4nz8pAAAAAC0lN6twiexpvJF20oauVX1Cd7LD"
                theme="dark"
                size="invisible"
                ref={reCaptchaRef}
            />
            <div className={styles.header}><Link className={styles.bluletText} to="/">Blulet</Link><Link className={styles.headerRight} to="/register">Register</Link></div>
            <div className={styles.regularBody}>
                <div className={styles.floatingBox}>
                    <div className={styles.floatingBoxHeader}>Login</div>
                    <form>
                        <div className={`${styles.inputContainer} ${error.username ? `${styles.inputError}` : ""}`}>
                            <FontAwesomeIcon icon={faUser} className={`${styles.icon} ${error.username ? `${styles.iconError}` : ""}`} />
                            <input className={styles.input} placeholder="Username" type="text" autoComplete="username" maxLength={16} onChange={(e) => { setUsername(e.target.value); setError({ error: false, message: "", username: false, password: false }); }} />
                        </div>
                        <div className={`${styles.inputContainer} ${error.password ? `${styles.inputError}` : ""}`}>
                            <FontAwesomeIcon icon={faLock} className={`${styles.icon} ${styles.smallerIcon} ${error.password ? `${styles.iconError}` : ""}`} />
                            <input className={styles.input} placeholder="Password" type="password" autoComplete="password" onChange={(e) => { setPassword(e.target.value); setError({ error: false, message: "", username: false, password: false }); }} />
                        </div>
                        {!loading && <button className={`${styles.button} ${error.error ? `${styles.buttonError}` : ""}`} tabIndex={0} onClick={(e: MouseEvent) => { e.preventDefault(); handleLogin(username, password); }}>Login</button>}
                    </form>
                    {error.error && <div className={styles.blErrorContainer}>
                        <FontAwesomeIcon icon={faTimesCircle} className={styles.blErrorIcon} />
                        <div className={styles.blErrorText}>{error.message}</div>
                    </div>}
                    {loading && <div className={styles.blLoaderContainer}>
                        <div className={styles.blLoader}>
                            <div className={styles.blLoaderShadow}></div>
                            <img src="https://media.blulet.org/default/loaderBlue.png" alt="Blue" draggable="false" className={styles.blLoaderBlue} />
                        </div>
                    </div>}

                    <div className={styles.switchAuthTypeLink}>Don&apos;t have an account?&nbsp;<Link to="/register">Register</Link>&nbsp;instead.</div>
                </div>
            </div>
        </div>
    );
};