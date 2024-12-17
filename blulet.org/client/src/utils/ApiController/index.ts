import axios from "axios";

type Window = typeof window & {
    ac: typeof ApiController;
};

interface Author {
    id: string;
    username: string;
    avatar: string;
    banner: string;
    role: string;
    color: string;
    badges: string[];
};

type Permission = "*" | "ban_users" | "mute_users";
enum SettingEnum {
    ON = 1,
    MUTUALS = 2,
    OFF = 0,
};

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

const ApiController = {
    authentication: {
        login: async (username: string, password: string, token: string): Promise<{ token: string; }> => {
            const { data } = await axios.post("/api/v2/auth/login", {
                username,
                password,
                token
            });

            return data;
        },
        register: async (username: string, password: string, token: string, checked: boolean): Promise<{ error: string | null; }> => {
            const { data } = await axios.post("/api/v2/auth/register", {
                username,
                password,
                token,
                checked
            });

            localStorage.setItem("token", data.token);

            return data;
        },
        logout: async (): Promise<{
            data: {}
        }> => {
            delete localStorage.token;
            return localStorage.token;
        },
        status: async (): Promise<{
            data: {
                status: number;
                error: string;
            }
        }> => {
            const { data } = await axios.get("/api/v2/server/status");

            return data;
        }
    },
    getLeaderboard: async (): Promise<{
        leaderboard: {
            id: string;
            username: string;
            tokens: number;
            avatar: string;
            color: string;
        }[];
        me: {
            id: string;
            username: string;
            tokens: number;
            avatar: string;
            color: string;
            location: number;
        }
    }> => {
        const { data } = await axios.get("/api/v2/leaderboard");

        return data;
    },
    user: {
        getBlues: async (): Promise<{ [name: string]: number }> => {
            const { data } = await axios.get("/api/v2/user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            return data.user.blues;
        },
        sellBlue: async (blue: string, amount: number): Promise<{}> => {
            const { data } = await axios.post("/api/v2/blues/sell", {
                blue,
                amount
            });

            return data;
        },
        getFriends: async (): Promise<{
            id: string;
            username: string;
            avatar: string;
            banner: string;
            color: string;
            role: string;
        }[]> => {
            const { data } = await axios.get("/api/v2/friends");

            return data.friends;
        },
        getUser: async (): Promise<{
            data: {


                id: string;
                username: string;
                avatar: string;
                banner: string;
                discord: string;
                badges: string[];
                blues: {
                    [name: string]: number
                };
                tokens: number;
                perms: Permission[];
                role: string;
                color: string;
                exp: number;
                inventory: string[];
                stats: {
                    [name: string]: number
                };
                friends: string[];
                blocks: string[];
                claimed: number;
                settings: {
                    notifications: boolean;
                    friends: SettingEnum;
                    trades: SettingEnum;
                };
                ban: {
                    banned: boolean;
                    reason: string;
                    until: Date;
                    staff: string;
                };
                mute: {
                    muted: boolean;
                    reason: string;
                    until: Date;
                    staff: string;
                };
                createdAt: Date;
                updatedAt: Date;
            }
        }> => {
            const data = await axios.get("/api/v2/user");

            return data;
        },
        unlinkDiscord: async (): Promise<{
            data: {}
        }> => {
            const data = await axios.delete("/api/v2/link/discord");

            return data;
        }
    },
    market: {
        claimDaily: async (): Promise<{
            reward: number;
        }> => {
            const { data } = await axios.get("/api/v2/claim");

            return data;
        },
        getPacks: async (): Promise<{
            id: string;
            name: string;
            price: number;
            colors: string[];
            blues: string[];
            image: string;
        }[]> => {
            const { data } = await axios.get("/api/v2/market/info");

            return data.packs;
        },
        purchasePack: async (pack: string): Promise<{
            blue: string;
            tokens: number;
            exp: number;
            isNew: boolean;
        }> => {
            const { data } = await axios.post("/api/v2/market/purchase", {
                pack
            });

            return data;
        },
        getBlues: async (): Promise<{
            id: string;
            name: string;
            rarity: string;
            price: number;
            chance: number;
            image: string;
            background: string;
        }[]> => {
            const { data } = await axios.get("/api/v2/blues");

            return data.blues;
        }
    },
    friends: {
        requests: {
            getSending: async (): Promise<{
                id: string;
                username: string;
                avatar: string;
                banner: string;
                color: string;
                role: string;
            }[]> => {
                const { data } = await axios.get("/api/v2/friends/requests/sending");

                return data.users;
            }
        }
    },
    messages: {
        getMessages: async (): Promise<{
            id: string;
            content: string;
            author: {
                id: string;
                username: string;
                avatar: string;
                banner: string;
                color: string;
                role: string;
                badges: string[];
            };
            room: string;
            mentions: Author[];
        }[]> => {
            const { data } = await axios.get("/api/v2/messages/503493408443");

            return data.messages;
        }
    },
    rarities: {
        getRarities: async (): Promise<{
            id: string;
            name: string;
            color: string;
            animation: string;
            exp: number;
            waitTime: number;
        }[]> => {
            const { data } = await axios.get("/api/v2/rarities");

            return data.rarities;
        }
    }
};

(window as Window).ac = ApiController;
export default ApiController;