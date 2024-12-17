import { DataTypes } from "sequelize";

export default {
    name: "UserSetting",
    attributes: {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "users",
                key: "id"
            }
        },
        notifications: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        friends: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        trades: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    },
    options: {
        tableName: "user_settings"
    },
    relations: [
        {
            type: "belongsTo",
            model: "User",
            options: {
                foreignKey: "user",
                as: "user_data"
            }
        }
    ]
}