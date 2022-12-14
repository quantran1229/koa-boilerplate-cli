# ${projectName}

A brief description of what this project does and who it's for.

## Version

0.1.0

## Requirement

Install [nodejs](https://nodejs.org/en/) version 12.0 or up.  
Install package manager [npm](https://nodejs.org/en/)

## Installation

```bash
npm install
```
Or
```bash
yarn
```

## Run locally
Create a .env file using env_example file as example.

```bash
cp env_example .env
```

Run local
```bash
npm start
```
Or
```bash
yarn start
```

Build with babel
```bash
npm run build
```
Or
```bash
yarn build
```

Start db test
```
npm run db:start
```
Or
```
yarn db:start
```
## API Reference

#### Get all users

```http
  GET /users
```

#### Create new user

```http
  POST /users
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Username |
| `password`      | `string` | **Required**. Password |

#### Create new user

```http
  POST /login
```
Login with username and password. Return user's info(username) and **JWT** for delete route to use.
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Username |
| `password`      | `string` | **Required**. Password |

#### Delete user

```http
  POST /users/:id
```
| Parameters | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. user'id to delete |

Must add **JWT** from login to header to delete user.
```
Authorization: Bearer ${token}
```

## Getting started

Get start by create new route file and start from it!
```javascript
import Router from 'koa-router';
const router = new Router();

router.get('/check', (ctx,next)=>{});

export default router;
```