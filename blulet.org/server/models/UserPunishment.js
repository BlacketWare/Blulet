import { DataTypes } from "sequelize";

export default {
    name: "UserPunishment",
    attributes: {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        ban: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "user_bans",
                key: "id"
            }
        },
        mute: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "user_mutes",
                key: "id"
            }
        }
    },
    options: {
        tableName: "user_punishments",
        indexes: [{ fields: ["user"], unique: true }]
    }
}