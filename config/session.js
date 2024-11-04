const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql2/promise');
const process = require('process');
const flash=require('connect-flash');
const { generateCsrfToken, validateCsrfToken } = require('../middlewares/csrfToken');

module.exports = (app) => {
    const env = process.env.NODE_ENV || 'development';
    const config = require('./config.json')[env];
    const port = process.env.MySQL_PORT || 3306;

    const options = {
        host: config.host,
        port: port,
        user: config.username,
        password: config.password,
        database: config.database,
        clearExpired: true,
        checkExpirationInterval: (5*60*1000), // 5 minutes
        expiration: (45*60*1000), // 45 minutes
        createDatabaseTable: true,
        endConnectionOnClose: true,
        disableTouch: false,
        charset: 'utf8mb4_bin',
        schema: {
            tableName: 'sessions',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        }
    };

    // Create a pool for MySQL connection
    const connection = mysql.createPool({
        host: config.host,
        port: port,
        user: config.username,
        password: config.password,
        database: config.database
    });

    // Initialize session store
    const sessionStore = new MySQLStore(options, connection);

    // Middleware for sessions
    app.use(session({
        key: process.env.SESSION_COOKIE_NAME || 'app_session_id',
        secret: process.env.SESSION_COOKIE_SECRET || 'a_secure_and_random_secret_key',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'strict'
        }
    }));
    app.use(flash());
    app.use(generateCsrfToken);
    app.use(validateCsrfToken);

    app.use((err, req, res, next) => {
        if (err.code === 'EBADCSRFTOKEN') {
          return res.status(403).send('Invalid CSRF token');
        }
        console.error(err.stack);
        res.status(500).send('Something went wrong');
      });
};
