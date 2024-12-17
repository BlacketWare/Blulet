import { DataTypes } from "sequelize";

export default {
    name: "UserMute",
    attributes: {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => `${Date.now() - 1704088800000}${Math.floor(Math.random() * 1000)}`
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        muted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        until: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        staff: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    },
    options: {
        tableName: "user_mutes",
        indexes: [{ fields: ["user"], unique: true }]
    }
}