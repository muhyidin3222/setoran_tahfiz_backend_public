<a align="center">
    <h1>Setoran Tahfiz Backend For App And Dashboard Admin</h1>
</a>

## Description
Setoran Tahfidz is a platform for students to submit their memorization and summarize all memorization, the school manages the data and can easily summarize student grades, then parents can find out their child's memorization in real time

## Requirement
Node <= 21
Python >= 3.3
npm >= 10.5.0

## Setup
```bash
# Install
$ npm install

# Running
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# running migration 
$ npx sequelize-cli db:migrate

# create data migration 
$ npx sequelize-cli model:generate --name UpdateTotalView --attributes firstName:string

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

```


## Documentation

```
documenter postman: https://documenter.getpostman.com/view/18733076/UVyoWJNd
```

- [Ahmad Muhyidin](https://github.com/muhyidin3222)
