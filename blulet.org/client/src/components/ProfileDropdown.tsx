import { useAuth } from "@contexts/AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "@styles/dashboard.module.scss";

export default function ProfileDropdown() {
    const { user, logout } = useAuth();

    return (
        <div className={styles.profileContainer} role="button" tabIndex={0}>
            <div className={styles.profileRow}>
                <div className={`${styles.blueContainer} ${styles.profileBlue}`}>
                    <img src={user.avatar} alt={user.avatar} draggable="false" className={styles.blue} />
                </div>
                <div className={user.color === "rainbow" ? styles.rainbow : ""} style={{ color: user.color }}>{user.username}</div>
            </div>
            <FontAwesomeIcon icon={faAngleDown} className={styles.profileDropdownIcon} />
            <div className={styles.profileDropdownMenu}>
                <Link className={styles.profileDropdownOption} to="/settings">
                    <FontAwesomeIcon icon={faCog} className={styles.profileDropdownOptionIcon} />
                    Settings
                </Link>
                <div className={styles.profileDropdownOption} role="button" tabIndex={0} onClick={() => logout()}>
                    <FontAwesomeIcon icon={faSignOutAlt} className={styles.profileDropdownOptionIcon} />
                    Logout
                </div>
            </div>
        </div>
    )
};