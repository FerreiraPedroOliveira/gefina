import express from 'express';


import path from 'node:path';

import dashboard from './dashboard.route.ts'

import pool from './database.ts';

import invoices from './invoice.route.ts';
import { request } from 'node:http';


const app = express();

const dist = path.join(import.meta.dirname, '..','web','dist');


app.use((request, _reponse, next) => {
  console.log(`${request.method} ${request.url}`);
  next();
});

app.get('/api/health', async (_request, response) => {
  try{
    const conect = await pool.query('SELECT datname FROM pg_database WHERE oid = 5;');
    
    response.status(200).json({
      server:'Server is running.',
      database:conect.rows[0].datname
    });
    
  }catch(error){
    console.error(error);
    response.status(500).json({
      status:'Server is runing',
      database:'unvaliable'
    });
  }
});

app.use('/api/dashboard',dashboard)
app.use('/api/invoices', invoices);

app.use(express.static(dist));

app.use((request,response,next)=>{
  if (request.url.startsWith('/api')){
    next();
    return;
  }
  response.sendFile(path.join(dist, 'index.html'));
})

app.use((_request, response) => {
  response.status(404).json({ message: 'Recurso não encontrado' });
});

app.listen(Number (process.env.PORT) || 3000);
