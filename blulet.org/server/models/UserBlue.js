import { DataTypes } from "sequelize";

export default {
    name: "UserBlue",
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
        blue: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "blues",
                key: "id"
            }
        },
        sold: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        originalOwner: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        }
    },
    options: {
        tableName: "user_blues"
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
            model: "Blue",
            options: {
                foreignKey: "blue",
                as: "blue_data"
            }
        },
        {
            type: "belongsTo",
            model: "User",
            options: {
                foreignKey: "originalOwner",
                as: "originalOwner_data"
            }
        }
    ]
}