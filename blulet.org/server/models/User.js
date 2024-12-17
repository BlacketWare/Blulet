import { DataTypes } from "sequelize";

export default {
    name: "User",
    attributes: {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => `${Date.now() - 1704088800000}${Math.floor(Math.random() * 1000)}`
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        banner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tokens: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 250
        },
        exp: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "user"
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "#ffffff"
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        claimedAt: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: Date.now()
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: Date.now()
        },
        lastlogin: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "0"
        }
    },
    options: {
        indexes: [{ unique: true, fields: ["username"] }],
        tableName: "users"
    },
    relations: [
        {
            type: "hasMany",
            model: "UserBlue",
            options: {
                foreignKey: "user",
                as: "blues"
            }
        },
        {
            type: "hasMany",
            model: "UserBadge",
            options: {
                foreignKey: "user",
                as: "badges"
            }
        },
        {
            type: "hasMany",
            model: "UserStat",
            options: {
                foreignKey: "user",
                as: "stats"
            }
        },
        {
            type: "hasMany",
            model: "UserSetting",
            options: {
                foreignKey: "user",
                as: "settings"
            }
        }
    ]
}