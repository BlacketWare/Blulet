import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@styles/dashboard.module.scss";


export default function Button({
    text,
    icon,
    color,
    link,
    onClick
}: {
    text: string,
    icon: any,
    color: string,
    link?: string
    onClick?: () => void
}) {
    // return (
    // <Link className={styles.button} role="button" tabIndex={0} to={link}>
    //     <div className={styles.shadow}></div>
    //     <div className={styles.edge} style={{ backgroundColor: color }}></div>
    //     <div className={styles.front} style={{ backgroundColor: color }}>
    //         <div className={styles.headerButtonInside}>
    //             <FontAwesomeIcon icon={icon} className={styles.headerButtonIcon} aria-hidden="true" />
    //             {text}
    //         </div>
    //     </div>
    // </Link>
    // );
    return (
        <>
            {onClick ? (
                <div className={styles.button} role="button" tabIndex={0} onClick={onClick}>
                    <div className={styles.shadow}></div>
                    <div className={styles.edge} style={{ backgroundColor: color }}></div>
                    <div className={styles.front} style={{ backgroundColor: color }}>
                        <div className={styles.headerButtonInside}>
                            <FontAwesomeIcon icon={icon} className={styles.headerButtonIcon} aria-hidden="true" />
                            {text}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* @ts-ignore */}
                    < Link className={styles.button} role="button" tabIndex={0} to={link}>
                        <div className={styles.shadow}></div>
                        <div className={styles.edge} style={{ backgroundColor: color }}></div>
                        <div className={styles.front} style={{ backgroundColor: color }}>
                            <div className={styles.headerButtonInside}>
                                <FontAwesomeIcon icon={icon} className={styles.headerButtonIcon} aria-hidden="true" />
                                {text}
                            </div>
                        </div>
                    </Link >
                </>
            )
            }
        </>
    )
};