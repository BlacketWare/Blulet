import { DataTypes } from "sequelize";

export default {
    name: "Room",
    attributes: {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => `${Date.now() - 1704088800000}${Math.floor(Math.random() * 1000)}`
        },
        access: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: ["public"]
        }
    },
    options: {
        tableName: "rooms"
    },
    relations: [
        {
            type: "hasMany",
            model: "Message",
            options: {
                foreignKey: "room",
                as: "messages"
            }
        }
    ]
}