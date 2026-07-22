import { Sequelize } from "sequelize";

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
          dialect: "postgres",
          logging: process.env.NODE_ENV === "development" ? console.log : false,
          dialectOptions: {
              ssl: {
                  require: true,
                  rejectUnauthorized: false,
              },
          },
      })
    : new Sequelize({
          dialect: "sqlite",
          storage: "./database.sqlite",
          logging: process.env.NODE_ENV === "development" ? console.log : false,
      });

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        const dialect = sequelize.getDialect();
        console.log(`✅ ${dialect.toUpperCase()} Database Connected`);

        await sequelize.sync({ alter: process.env.NODE_ENV === "development" });
        console.log("✅ Database Synced");
    } catch (error) {
        console.error("❌ Database Connection Failed:", error.message);
        console.log("⚠️  Server will continue running without database");
    }
};

export { sequelize, connectDatabase as default };
