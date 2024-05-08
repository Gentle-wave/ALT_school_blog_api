```markdown
# Blogging API

This is a RESTful API for a blogging application built using Express.js and MongoDB. It allows users to sign up, sign in, create, update, delete, and retrieve blogs. The API also supports authentication using JWT tokens and implements pagination for retrieving lists of blogs.

## Features

- User sign up and sign in
- JWT token-based authentication with token expiry
- Create, read, update, and delete blogs
- Retrieve list of blogs with pagination
- Filtering, searching, and ordering blogs
- Supports draft and published states for blogs
- Calculate reading time for blogs

## Installation

1. Clone the repository:

```
git clone <repository-url>
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

```
PORT=3000
MONGODB_URI=<your_mongodb_connection_uri>
JWT_SECRET=<your_jwt_secret_key>
```

4. Start the server:

```
npm start
```

## Endpoints

### Authentication

- `POST /auth/signup`: Sign up a new user
- `POST /auth/signin`: Sign in an existing user

### Blogs

- `POST /blogs`: Create a new blog
- `GET /blogs`: Get a list of blogs (supports pagination, filtering, searching, and ordering)
- `GET /blogs/:id`: Get a blog by ID
- `PUT /blogs/:id`: Update a blog by ID
- `DELETE /blogs/:id`: Delete a blog by ID
- `GET /blogs/user`: Get blogs created by the logged-in user

## Testing

Run tests using Jest:

```
npm test
```

## Contributors

- [Your Name](https://github.com/Gentle-wave)

```
