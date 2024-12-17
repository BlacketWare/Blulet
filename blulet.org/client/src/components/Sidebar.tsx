import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@contexts/AuthContext";
import { Tooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faTrophy, faComments, faStore, faSuitcase, faCog, faInfo, faNewspaper, faBars, faTimes, faSignOutAlt, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "@styles/dashboard.module.scss";
import ProfileDropdown from "@components/ProfileDropdown";

export default function Sidebar({ aditionalRow }: { aditionalRow?: JSX.Element }) {
    const { logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [newsOpen, setNewsOpen] = useState<boolean>(false);

    return (
        <>
            <div className={styles.topRightRow}>
                {aditionalRow}
                <ProfileDropdown />
            </div>
            <div className={styles.mNavBar}>
                <div className={styles.mBluletText}>Blulet</div>
                <FontAwesomeIcon className={styles.mHamburgerIcon} icon={faBars} tabIndex={0} onClick={() => setSidebarOpen(!sidebarOpen)} />
            </div>
            <div className={`${styles.modal} ${styles.modalTransition} ${sidebarOpen ? styles.modalOpen : ""}`} />
            <div className={`${styles.mSidebar} ${sidebarOpen ? styles.mSidebarOpen : ""}`}>
                <FontAwesomeIcon className={styles.closeIcon} icon={faTimes} tabIndex={0} onClick={() => setSidebarOpen(!sidebarOpen)} />
                <Link className={`${styles.pageButton} ${window.location.pathname === "/stats" ? styles.pageSelected : ""}`} to="/stats">
                    <FontAwesomeIcon icon={faChartBar} className={styles.pageIcon} />
                    <div className={styles.pageText}>Stats</div>
                </Link>
                <Link className={`${styles.pageButton} ${window.location.pathname === "/leaderboard" ? styles.pageSelected : ""}`} to="/leaderboard">
                    <FontAwesomeIcon icon={faTrophy} className={styles.pageIcon} />
                    <div className={styles.pageText}>Leaderboard</div>
                </Link>
                <Link className={`${styles.pageButton} ${window.location.pathname === "/chat" ? styles.pageSelected : ""}`} to="/chat">
                    <FontAwesomeIcon icon={faComments} className={styles.pageIcon} />
                    <div className={styles.pageText}>Chat</div>
                </Link>
                <Link className={`${styles.pageButton} ${window.location.pathname === "/market" ? styles.pageSelected : ""}`} to="/market">
                    <FontAwesomeIcon icon={faStore} className={styles.pageIcon} />
                    <div className={styles.pageText}>Market</div>
                </Link>
                <Link className={`${styles.pageButton} ${window.location.pathname === "/blues" ? styles.pageSelected : ""}`} to="/blues">
                    <FontAwesomeIcon icon={faSuitcase} className={styles.pageIcon} />
                    <div className={styles.pageText}>Blues</div>
                </Link>
                <div className={`${styles.pageButton}`} role="button" tabIndex={0} onClick={() => logout()}>
                    <FontAwesomeIcon icon={faSignOutAlt} className={styles.pageIcon} />
                    <div className={styles.pageText}>Logout</div>
                </div>

                <div className={`${styles.bottomRow} ${styles.bottomRowMargin}`}>
                    <Link className={styles.smallButton} to="/settings">
                        <FontAwesomeIcon icon={faCog} className={styles.bottomIcon} />
                    </Link>
                    <Link className={styles.smallButton} to="/credits">
                        <FontAwesomeIcon icon={faInfo} className={styles.bottomIcon} />
                    </Link>
                    <div className={styles.smallButton} role="button" tabIndex={0} onClick={() => setNewsOpen(!newsOpen)}>
                        <FontAwesomeIcon icon={faNewspaper} className={styles.bottomIcon} />
                    </div>
                </div>
            </div>

            {newsOpen && <div className={styles.modal} onClick={() => setNewsOpen(!newsOpen)} />}
            <div className={`${styles.container} ${newsOpen ? styles.containerShown : ""}`}>
                <div className={styles.newsHeader}>
                    <FontAwesomeIcon className={styles.newsIcon} icon={faNewspaper} />
                    <div className={styles.headerText}>Blulet</div>
                    <div className={styles.newsText}>News</div>
                    <FontAwesomeIcon className={styles.closeIcon} icon={faTimes} tabIndex={0} onClick={() => setNewsOpen(!newsOpen)} />
                </div>
                <div className={styles.postsContainer}>
                    <div className={styles.cardContainer}>
                        <div className={styles.tagText}>Seasonal Event</div>
                        <div className={styles.newsHeaderText}>Winter Holiday Update!</div>
                        <img className={styles.image} src="https://media.blooket.com/image/upload/v1701746678/Media/holidayPost2023Small.jpg" draggable="false" />
                        <div className={styles.newsBody}>
                            <div>
                                Happy December! We hope your school year is going well! To celebrate the end of 2023 we've added the Blizzard Pack and new seasonal cosmetics in the Market. Plus users can also try out our limited-time game mode Santa's Workshop now! It'll be free for everyone on 12/18.
                                <br />
                            </div>
                        </div>
                        <div className={styles.dateRow}>
                            <FontAwesomeIcon className={styles.dateIcon} icon={faCalendarAlt} />
                            19 days ago
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.sidebar}>
                <Link className={styles.bluletText} to="/">Blulet</Link>
                <Link className={`${styles.pageButton} ${window.location.pathname === "/stats" ? styles.pageSelected : ""}`} to="/stats">
                    <FontAwesomeIcon icon={faChartBar} className={styles.pageIcon} />
                    <div className={styles.pageText}>Stats</div>
                </Link>
                <Link className={`${styles.pageButton} ${window.location.pathname === "/leaderboard" ? styles.pageSelected : ""}`} to="/leaderboard">
                    <FontAwesomeIcon icon={faTrophy} className={styles.pageIcon} />
                    <div className={styles.pageText}>Leaderboard</div>
                </Link>
                <Link className={`${styles.pageButton} ${window.location.pathname === "/chat" ? styles.pageSelected : ""}`} to="/chat">
                    <FontAwesomeIcon icon={faComments} className={styles.pageIcon} />
                    <div className={styles.pageText}>Chat</div>
                </Link>
                <Link className={`${styles.pageButton} ${window.location.pathname === "/market" ? styles.pageSelected : ""}`} to="/market">
                    <FontAwesomeIcon icon={faStore} className={styles.pageIcon} />
                    <div className={styles.pageText}>Market</div>
                </Link>
                <Link className={`${styles.pageButton} ${window.location.pathname === "/blues" ? styles.pageSelected : ""}`} to="/blues">
                    <FontAwesomeIcon icon={faSuitcase} className={styles.pageIcon} />
                    <div className={styles.pageText}>Blues</div>
                </Link>

                <div className={styles.bottomRow}>
                    <Link data-tooltip-content="Settings" data-tooltip-id="settings" className={styles.smallButton} to="/settings">
                        <Tooltip id="settings" place="left" />
                        <FontAwesomeIcon icon={faCog} className={styles.bottomIcon} />
                    </Link>
                    <Link data-tooltip-content="Credits" data-tooltip-id="credits" className={styles.smallButton} to="/credits">
                        <Tooltip id="credits" place="top" />
                        <FontAwesomeIcon icon={faInfo} className={styles.bottomIcon} />
                    </Link>
                    <div data-tooltip-content="News" data-tooltip-id="news" className={styles.smallButton} role="button" tabIndex={0} onClick={() => setNewsOpen(!newsOpen)}>
                        <Tooltip id="news" place="top" />
                        <FontAwesomeIcon icon={faNewspaper} className={styles.bottomIcon} />
                    </div>
                </div>
            </div>
        </>
    );
};