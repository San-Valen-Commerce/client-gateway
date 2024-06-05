## Description

Client Gateway responsible of interacting with the microservices.

## Installation

```bash
$ pnpm install
```

```bash
nats-server
docker run -d --name nats-main -p 4222:4222 -p 8222:8222 nats
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
