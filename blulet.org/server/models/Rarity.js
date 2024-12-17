import { DataTypes } from "sequelize";

export default {
    name: "Rarity",
    attributes: {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => `${Date.now() - 1704088800000}${Math.floor(Math.random() * 1000)}`
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        animation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        exp: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        waitTime: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    },
    options: {
        tableName: "rarities"
    }
}