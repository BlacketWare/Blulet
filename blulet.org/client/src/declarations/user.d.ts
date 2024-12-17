type Permission = "*" | "ban_users" | "mute_users";
enum SettingEnum {
    ON = 1,
    MUTUALS = 2,
    OFF = 0,
};

export default interface User {
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
    /* level and needed are not stored, only calculated on user */ 
    level: number;
    needed: number;
    inventory: string[];
    stats: {
        [name: string]: number
    };
    friends: string[];
    blocks: string[];
    claimedAt: string;
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
};