const config = require("../env").config;

const ormConfig = {
    host: config.db.host,
    type: config.db.dialect,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    schema: config.db.schema,
    synchronize: config.db.synchorize,
    entities: [
        "src/domain/entity/**.js",
    ],
    migrations: [
        "src/data/migrations/**.ts"
    ],
    cli: {
        migrationsDir: "src/data/migrations"
    },
    logging: config.db.logging
}

module.exports = { ormConfig };