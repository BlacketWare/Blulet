import { DataTypes } from "sequelize";

export default {
    name: "Pack",
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
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        colors: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    options: {
        tableName: "packs"
    },
    relations: [
        {
            type: "hasMany",
            model: "PackBlue",
            options: {
                foreignKey: "pack",
                as: "blues"
            }
        }
    ]
}