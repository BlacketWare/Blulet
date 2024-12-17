import { DataTypes } from "sequelize";

export default {
    name: "PackBlue",
    attributes: {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => `${Date.now() - 1704088800000}${Math.floor(Math.random() * 1000)}`
        },
        pack: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "packs",
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
        }
    },
    options: {
        tableName: "pack_blues"
    },
    relations: [
        {
            type: "belongsTo",
            model: "Pack",
            options: {
                foreignKey: "pack",
                as: "pack_data"
            }
        },
        {
            type: "belongsTo",
            model: "Blue",
            options: {
                foreignKey: "blue",
                as: "blue_data"
            }
        }
    ]
}