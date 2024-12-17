import { DataTypes } from "sequelize";

export default {
    name: "UserBadge",
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
        badge: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "badges",
                key: "id"
            }
        }
    },
    options: {
        tableName: "user_badges"
    },
    relations: [
        {
            type: "belongsTo",
            model: "User",
            options: {
                foreignKey: "user",
                as: "user_data"
            }
        },
        {
            type: "belongsTo",
            model: "Badge",
            options: {
                foreignKey: "badge",
                as: "badge_data"
            }
        }
    ]
}