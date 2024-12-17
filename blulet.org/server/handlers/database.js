import { Sequelize } from "sequelize";
import walk from "#functions/walk";
import console from "#functions/console";

export default async () => {
    global.database = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: "localhost",
            dialect: "postgres",
            logging: false
        }
    );

    await global.database.authenticate().then(() => console.success("Database connected")).catch(console.error);

    console.info("Loading database models...");

    let total = 0;

    const models = [];

    for (const file of walk("./models")) {
        if (!file.endsWith(".js")) continue;

        const model = (await import(`../${file}`)).default;

        global.database.define(model.name, model.attributes, {
            ...model.options,
            modelName: model.name,
            timestamps: false
        });

        models.push(model);

        total++;
    }

    for (const model of models) if (model.relations) for (const relation of model.relations) global.database.models[model.name][relation.type](global.database.models[relation.model], relation.options);

    await global.database.sync({ alter: true });

    console.success(`Loaded ${total} database model(s).`);
}