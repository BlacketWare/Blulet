import { Tooltip } from "react-tooltip";
import styles from "@styles/dashboard.module.scss";

export default function Stat({
    title,
    text,
    img,
    tooltipId,
    tooltipContent,
    imgClass,
}: {
    title: string,
    text: string,
    img: string,
    tooltipId: string,
    tooltipContent: string,
    imgClass?: string
}) {
    return (
        <div className={styles.statContainer} data-tooltip-content={tooltipContent} data-tooltip-id={tooltipId}>
            <Tooltip id={tooltipId} place="bottom" />
            <div className={styles.statTitle}>{title}</div>
            <div className={styles.statNum}>{text}</div>
            <img className={imgClass ? imgClass : styles.statImg} draggable="false" src={img} />
        </div>
    );
};