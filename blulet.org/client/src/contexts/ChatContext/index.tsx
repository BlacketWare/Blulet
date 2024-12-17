// ChatContext, also needs ability to set the messages

import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from "react";
import { useAuth } from "../AuthContext";
import styles from "@styles/chat.module.scss";
import ApiController from "../../utils/ApiController";
import socket from "../../utils/socket";

interface ChatContextProps {
    messages: any[];
    setMessages: Dispatch<SetStateAction<any[]>>;
}

interface ChatProviderProps {
    children: JSX.Element;
}

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

const handleMentions = (message: Message, user: any, playSound: boolean) => {
    let mentions: string[] = [];
    let nonMentionParts: string[] = [];
    let mentionSoundPlayed: boolean = false;

    if (typeof message.content === "string") message.content.split(/(@[0-9a-fA-F]+|@\w+)/).forEach((part, _) => {
        if (/@[0-9a-fA-F]+/.test(part)) {
            const mentionedUser = message.mentions.find(mention => mention.id === part.slice(1));
            if (mentionedUser) {
                if (mentionedUser.id === user.id && !mentionSoundPlayed && playSound) {
                    mentionSoundPlayed = true;
                    new Audio("https://media.blulet.org/audio/mention.mp3").play();
                }
                mentions.push(`@${mentionedUser.username}`);
            } else nonMentionParts.push(part);
        } else if (/@\w+/.test(part)) {
            if (part.slice(1) === user.username && !mentionSoundPlayed && playSound) {
                mentionSoundPlayed = true;
                new Audio("https://media.blulet.org/audio/mention.mp3").play();
            }
            mentions.push(`@${part.slice(1)}`);
        } else nonMentionParts.push(part);
    });

    if (mentions.length > 0) message.content = [<div className={styles.mention} key={mentions.join("")}>{mentions.join(" ")} {nonMentionParts.join(" ")}</div>];
    else message.content = nonMentionParts.join(" ");

    return message;
};

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export function useChat(): ChatContextProps {
    const context = useContext(ChatContext);
    if (!context) throw new Error("useChat must be used within ChatProvider component");
    return context;
}

export function ChatProvider({ children }: ChatProviderProps) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        ApiController.messages.getMessages().then(messages => setMessages(messages.map((message: Message) => handleMentions(message, user, false))));
        setLoading(false);
    }, []);

    socket.onopen = () => console.log("[Blulet] A connection to the WebSocket has been established.");
    socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        if (data.event === "message-received") {
            const message: Message = data.message;
            setMessages(prev => [handleMentions(message, user, true), ...prev]);
        }
    };

    const contextValue: ChatContextProps = {
        messages,
        setMessages
    };

    return (
        <ChatContext.Provider value={contextValue}>
            {!loading && children}
        </ChatContext.Provider>
    );
}
