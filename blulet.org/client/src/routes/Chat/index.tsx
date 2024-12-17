import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useChat } from "@contexts/ChatContext";
import dashboard from "@styles/dashboard.module.scss";
import styles from "@styles/chat.module.scss";
import Sidebar from "@components/Sidebar";
import Background from "@components/Background";
import socket from "@utils/socket";

interface Author {
    id: string;
    username: string;
    avatar: string;
    banner: string;
    role: string;
    color: string;
    badges: string[];
};

interface Message {
    id: string;
    author: Author;
    content: string | JSX.Element[];
    room: string;
    mentions: Author[];
}

export default function Chat() {
    const { user } = useAuth();
    const { messages } = useChat();
    const navigate = useNavigate();

    if (!user) return <Navigate to="/login" />;

    const formRef = useRef<HTMLInputElement>(null);
    const [lastSentTime, setLastSentTime] = useState<number>(0);

    const sendMessage = (message: string) => {
        if (!message) return;
        if (Date.now() - lastSentTime < 1000) return;
        setLastSentTime(Date.now());
        if (formRef.current) {
            socket.send(JSON.stringify({ event: "send-message", content: message, room: "503493408443" }));
            formRef.current.value = "";
        };
    };

    const handleUsernameClick = (id: string, event: React.MouseEvent) => {
        if (!event.shiftKey) navigate(`/stats?user=${id}`);
        if (event.shiftKey && formRef.current) {
            formRef.current.value = `<@${id}> `;
            formRef.current.focus();
        };
    };

    return (
        <div className={dashboard.body}>
            <Background />
            <Sidebar />
            <div className={styles.profileBody}>
                <div className={styles.chatContainer}>
                    <ul className={styles.chatMessages}>
                        {messages.reduce((messageGroups: Message[][], message: Message, i: number) => {
                            const previousMessage = messages[i - 1];
                            i === 0 || previousMessage.author.id !== message.author.id ? messageGroups.push([message]) : messageGroups[messageGroups.length - 1].push(message);
                            return messageGroups;
                        }, []).map((messageGroup: Message[], i: number) => (
                            messageGroup.map((message: Message, j: number) => (
                                <li className={styles.chatMessage} key={`${i}-${j}`}>
                                    {(j === messageGroup.length - 1) && (
                                        <div>
                                            <div className={`${styles.chatMessageBlueContainer} ${styles.chatMessageBlue}`}>
                                                <img src={message.author.avatar} className={styles.blue} alt={message.author.avatar} draggable="false" />
                                            </div>
                                            <div className={`${message.author.color === "rainbow" ? styles.rainbow : ""}`} style={{ color: message.author.color, fontWeight: "bold", cursor: "pointer", display: "inline-flex" }} onClick={(e) => handleUsernameClick(message.author.id, e)}>{message.author.username}</div>
                                            {message.author.badges && <div className={styles.badgeContainer}>
                                                {message.author.badges.map((badge: string, k: number) => (
                                                    <img src={`https://media.blulet.org/badges/${badge}.svg`} className={styles.badge} alt={badge} draggable="false" key={k} />
                                                ))}
                                            </div>}
                                        </div>
                                    )}
                                    <div className={styles.chatMessageContent} style={{ display: "inline-flex", flexWrap: "wrap" }}>
                                        {message.content}
                                    </div>
                                </li>
                            ))
                        ))}
                    </ul>
                    <form className={styles.chatMessageForm} onSubmit={(e) => { e.preventDefault(); (formRef.current && sendMessage(formRef.current.value)) }} autoComplete="off" tabIndex={0}>
                        <div className={styles.chatMessageInputContainer}>
                            <input className={styles.chatMessageInput} type="text" placeholder="Message..." ref={formRef} maxLength={2000} tabIndex={0} />
                            <button className={styles.chatMessageSend} type="submit" tabIndex={0}>
                                <FontAwesomeIcon icon={faPaperPlane} onClick={() => (formRef.current && sendMessage(formRef.current.value))} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};