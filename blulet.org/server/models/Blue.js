import { DataTypes } from "sequelize";

export default {
    name: "Blue",
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
        rarity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        chance: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        background: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    options: {
        tableName: "blues"
    }
}