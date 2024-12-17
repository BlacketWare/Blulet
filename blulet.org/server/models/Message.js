import { DataTypes } from "sequelize";

export default {
    name: "Message",
    attributes: {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => `${Date.now() - 1704088800000}${Math.floor(Math.random() * 1000)}`
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        room: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "rooms",
                key: "id"
            }
        },
        mentions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: []
        },
        edits: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: []
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: Date.now()
        }
    },
    options: {
        tableName: "messages"
    },
    relations: [
        {
            type: "belongsTo",
            model: "User",
            options: {
                foreignKey: "author",
                as: "author_data"
            }
        },
        {
            type: "belongsTo",
            model: "Room",
            options: {
                foreignKey: "room",
                as: "room_data"
            }
        }
    ]
}