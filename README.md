# Fablife Cooking API

This is an API to manage simple cooking recipes, built with NestJS and PostgreSQL.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/votre-utilisateur/fablife-cooking-api.git

cd fablife-cooking-api
```

2. Install the dependencies:

```bash
npm install
```

3. In app.module.ts, replace the `TypeOrmModule.forRoot` object with your own database configuration.
Example:
```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your-username',
  password: 'your-password',
  database: 'your-database',
  entities: [Recipe, Ingredient, RecipeIngredient],
  synchronize: true,
})
```
4. Run the application:

```bash
npm run start
```
or
```bash
nest start
```

## Test the API with Postman

1. Open Postman
2. copy the following link : 
```bash
https://api.postman.com/collections/19751006-f8a79476-d8a8-48de-aec3-4d5213eaba1c?access_key=PMAT-01HP32B4AMARB2V9W6NTE1GMRP
```
3. Click on "Import" in the top left corner
4. Click on "Link" and paste the link
5. You can now test the API with the imported collection