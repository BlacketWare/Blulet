import { DataTypes } from "sequelize";

export default {
    name: "UserStat",
    attributes: {
        user: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        messages: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        packs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    options: {
        tableName: "user_stats",
        indexes: [{ fields: ["user"], unique: true }]
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