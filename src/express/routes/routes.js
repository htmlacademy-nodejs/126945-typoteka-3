'use strict';

const express = require(`express`);
const router = express.Router();

const printString = (string) => (req, res) => res.send(`route: ${string}`);
const routes = [`/`, `/register`, `/login`, `/my`, `/my/comments`, `/articles/category/:id`, `/articles/add`, `/search`, `/articles/edit/:id`, `/articles/:id`, `/categories`];

routes.forEach((route) => router.get(route, printString(route)));

module.exports = router;
