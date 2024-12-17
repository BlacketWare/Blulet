import styles from "@styles/loader.module.scss";

export default function Loader() {
    return (
        <div className={styles.modal}>
            <div className={styles.blLoader}>
                <div className={styles.blLoaderShadow}></div>
                <img src="https://media.blulet.org/default/loaderBlue.png" alt="Blue" draggable="false" className={styles.blLoaderBlue} />
            </div>
        </div>
    );
};