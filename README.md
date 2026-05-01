# Blog Platform API

GraphQL API for a blog platform built with NestJS, Apollo, and MongoDB.

## What It Does

This API powers the backend for a blog platform. It lets clients list posts, fetch a single post by slug, create new posts for authenticated users, and resolve author details for each post.

## Main Features

- GraphQL API with Apollo Server
- MongoDB integration through Mongoose
- Post queries with filter support
- Authenticated post creation
- User lookup and author resolution
- Environment-based configuration
- Containerized the backend application using Docker for consistent development and deployment environments

## Project Structure

- `src/post` - post resolver, service, schema, and GraphQL types
- `src/user` - user resolver, service, schema, and GraphQL types
- `src/common` - shared decorators, guards, and types
- `src/main.ts` - application bootstrap and CORS setup

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file with values similar to these:

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/blog-platform
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

## Run The App

```bash
npm run start
```

Development mode:

```bash
npm run start:dev
```

Production mode:

```bash
npm run start:prod
```

## Available Commands

- `npm run build` - compile the TypeScript project
- `npm run format` - format source and test files with Prettier
- `npm run format:check` - check formatting without changing files
- `npm run lint` - run ESLint with auto-fix
- `npm run lint:check` - run ESLint without auto-fix
- `npm run check:both` - run lint check and format check
- `npm run fix:both` - run lint and format fixes
- `npm run test` - run unit tests
- `npm run test:watch` - run tests in watch mode
- `npm run test:cov` - run tests with coverage
- `npm run test:debug` - run Jest in debug mode
- `npm run test:e2e` - run end-to-end tests

## GraphQL Notes

The app generates its schema from the code and writes it to `src/schema.gql`.

Key operations include:

- `getPosts` - list posts with optional filters
- `getPostBySlug` - fetch a single post by slug
- `createPost` - create a post for the authenticated user
- `getUser` - list users

