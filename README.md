# CatByte

## Description

CatByte is a website that allows you to learn programming languages by solving challenges. 🐈🐈‍⬛

## Deployment

The frontend and the API are deployed on GitHub Pages and Azure respectively. They are built automatically on every push to the `main` branch, using GitHub Actions.

**Frontend: [https://e-vinci.github.io/web2-2022-project-group-02/](https://e-vinci.github.io/web2-2022-project-group-02/)**  
API: [https://catbyte.azurewebsites.net/](https://catbyte.azurewebsites.net/)

## Configuration

No configuration is necessary. **Optional** environment variables:

```bash
# Database FOLDER path. Defaults to api/data
DB_PATH=/home
# Default admin password. Defaults to admin
DEFAULT_ADMIN_PASSWORD=catbyte
# JWT secret. Defaults to iloveCats!
JWT_SECRET=iloveCats!
```

## Usage

The API and the frontend are seperate under `api` and `frontend` respectively. In development, the
API is served on port `8080` (proxied on the frontend under `/api`) and the frontend on port `3000`.

To install dependencies, run `npm install` inside the `api` and `frontend` folders.

Run `npm start` inside the `api` and `frontend` folders to start the API and frontend respectively.

To build the frontend, run `npm run build` inside the `frontend` folder. The build will be in the
`dist` folder.

## API

The API is a REST API. The endpoints with 🔒 require authentication.

| Method | Path                |     | Description                                              | Request                             | Response  |
| ------ | ------------------- | --- | -------------------------------------------------------- | ----------------------------------- | --------- |
|        |                     |     | 🔑 **Authentication**                                    |                                     |           |
| POST   | /auths/register     |     | Register with an email address, username and a password. | { email, username, password }       | { token } |
| POST   | /auths/login        |     | Authenticate with a username and a password.             | { username, password }              | { token } |
|        |                     |     | 👤 **Users**                                             |                                     |           |
| GET    | /users/:id?         | 🔒  | Get user info                                            | -                                   | user      |
| DELETE | /users/:id?         | 🔒  | Delete a user                                            | -                                   | -         |
| GET    | /users/progress     | 🔒  | Get the progress of user                                 | { title }                           | course    |
| POST   | /users/progress     | 🔒  | Set the progress of user                                 | { course, chapter, progress, page } | { }       |
| GET    | /users/:id/avatar   |     | Get the profile picture of a user                        | -                                   | -         |
|        |                     |     | 💬 **Forum**                                             |                                     |           |
| GET    | /forum              |     | Get all threads                                          | -                                   | post[]    |
| GET    | /forum/:id          |     | Get a thread                                             | -                                   | post      |
| POST   | /forum              | 🔒  | Create a thread                                          | { title, content }                  | { id }    |
| POST   | /forum/:id          | 🔒  | Reply to a thread                                        | { content }                         | post      |
| DELETE | /forum/:id          | 🔒  | Delete a thread                                          | -                                   | -         |
| DELETE | /forum/:id/:replyId | 🔒  | Delete a reply                                           | -                                   | -         |

The endpoints are testable with the
[VSCode REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client),
in the `api/REST Client` folder.

## Frontend

The frontend is a vanilla JavaScript SPA (Single Page Application) using a custom router. The
application is built with Webpack.
