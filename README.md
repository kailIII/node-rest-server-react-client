# Example of node REST server and React app client

## TODOS example

### Server

Simple REST server using node-restify.  
Using on PostgreSQL. To change to other DBMS just edit models in server/models.

### Client

Simple client based on create-react-app.  
Using axios as HTTP client.

### Install

Create the database schema with script: server/database.sql

```
    $ cd server
    $ npm install
    $ cd ../client
    $ npm install
```

### Run

```
    $ cd server
    $ node src/index.js
    $ cd ../client
    $ npm run start
```
