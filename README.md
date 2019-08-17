# NodeJS API Boilerplate

Creating NodeJS API with MongoDB

## Usage
Clone the repo then go inside the folder and
Install all the dependencies

```cli
yarn install
```

OR

```cli
npm install
```

### Setting up the .env file

Following are the environment variables requied for the project to work properly

1. PORT=5001
1. DB_HOST=localhost
1. JWT_PRIVATE_KEY=somescret
1. DB_NAME=your_db_name
1. NODE_ENV=dev

### Serve the project

```cli
yarn start
```

OR

```cli
npm start
```

_serves the project in port 5001_

### For Testing

Jest is being used to test the project

```cli
yarn run test
```

OR

```cli
npm run test
```