import express from 'express';

import fs from 'node:fs';


import path from 'node:path';

import pool from './database.ts';

import dashboard from './dashboard.route.ts';

import customers from './customer.route.ts';

import invoices from './invoice.route.ts';

import handleError from './error.middleware.ts';


import app from './app.ts'

app.listen(Number (process.env.PORT) || 3000);
