import { AuthProvider } from "./AuthContext";
import { LeaderboardProvider } from "./LeaderboardContext";
import { ChatProvider } from "./ChatContext";
import { BlueProvider } from "./BlueContext";
import { RarityProvider } from "./RarityContext";
import { PackProvider } from "./PackContext";

interface ContextWrapperProps {
    children: JSX.Element;
};

export default function ContextWrapper({ children }: ContextWrapperProps) {
    return (
        <AuthProvider>
            <LeaderboardProvider>
                <ChatProvider>
                    <BlueProvider>
                        <RarityProvider>
                            <PackProvider>
                                {children}
                            </PackProvider>
                        </RarityProvider>
                    </BlueProvider>
                </ChatProvider>
            </LeaderboardProvider>
        </AuthProvider>
    );
}