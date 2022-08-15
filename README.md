# COMP-4800 Project

This project is a surveying system for the BSN program at BCIT to help them make decisions based on data gathered from external partner and student responses.

# Running and Developing

## Frontend Steps

1. Install dependencies: `npm i`
2. Run `npm start`

## Backend Steps

1. Install mysql.
2. Install dependencies: `npm i`
3. Login to root mysql user: `mysql -u root;`

   Note: You may need to add a password flag, -p, by itself at the end

4. Create the database: `CREATE DATABASE comp4800;`, then quit mysql with `quit`.
5. Adjust /backend/config/config.json to reflect your local database details.
6. Install the mysql driver globally: `npm i -g mysql2`
7. Install nodemon globally: `npm i -g nodemon`. nodemon provides hot-reload.
8. Run `npm run dev`
9. In another terminal, seed the database with demo data: `npx sequelize db:seed:all`

# Making Database Changes (Development)

In development, we use the sequelize.sync({alter: true}) function which will look for changes in models and adjust the database automatically. This command will wipe data that doesn't fit the new models and therefore we can only use it in development.

## Adding a New Model
1. Run `npx sequelize model:create --name MyModel --attributes firstName:string,lastName:string` A new migration and model should be generated. Delete the migration.
2. Adjust the model.
3. Save while running nodemon. The table should be created in the DB.
4. Run `npx sequelize seed:generate --name demo-surveys` to generate seed file, change the seed data manually.
5. Run `npx sequelize-cli db:seed:undo:all` to clear seed data
6. Rerun `npx sequelize-cli db:seed:all` to re-seed database

## Editing an Existing Model
1. Adjust the model.
2. Save while running nodemon. The table should be adjusted in the DB.
3. Adjusts the seeders for the model.
4. Run `npx sequelize-cli db:seed:undo:all` to clear seed data
5. Rerun `npx sequelize-cli db:seed:all` to re-seed database

# Making Database Changes (Production)

When wanting to make changes to the database, it's suggested that a migration file be created that alters the DB, and the model must be manually edited to match the change. The model, however, can include any additional validations that are included in sequelize.

List of built-in validators that can be used on model attributes:
https://sequelize.org/master/manual/validations-and-constraints.html#per-attribute-validations

## Adding a New Model

1. Run `npx sequelize model:create --name MyModel --attributes firstName:string,lastName:string` A new migration and model should be generated.
2. Make changes to the migration file. According to your changes, change your model manually.
3. Run `npx sequelize db:migrate`
4. Run `npx sequelize seed:generate --name demo-mymodel` to generate seed file, change the seed data manually.
5. Run `npx sequelize-cli db:seed:undo:all` to clear seed data
6. Rerun `npx sequelize-cli db:seed:all` to re-seed database

## Editing an Existing Model

1. Create a migration: `npx sequelize migration:create --name name-of-migration`
2. Make changes to the migration file. According to your changes, change your model manually.
3. Run `npx sequelize db:migrate`
4. Adjusts the seeders for the model.
4. Run `npx sequelize-cli db:seed:undo:all` to clear seed data
5. Rerun `npx sequelize-cli db:seed:all` to re-seed database

## Undoing a Migration

1. Run `npx sequelize db:migrate:undo`
