import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: process.env.NODE_ENV === 'development' ? console.log : false
});

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ SQLite Database Connected");
        
        // Sync all models (create tables if they don't exist)
        await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
        console.log("✅ Database Synced");
    } catch (error) {
        console.error(error)
        console.error("❌ Database Connection Failed");
        console.error(error.message);
        console.log("⚠️  Server will continue running without database");
    }
};

export { sequelize, connectDatabase as default };
