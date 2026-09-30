
import express from 'express';
import { error } from 'node:console';
import invoices from './invoice.route.ts';

const app = express();

app.use(function(request,reponse, next){
    console.log (request.method + ' ' + request.url)
    next();
})

app.get('/api/health', function(request,response){

    response.status(200).json({status:'ok'});
})

app.use('/api/invoices',invoices);

app.use(function(request,response){

    response.status(404).json({message:'Recurso não encontrado'})
});

app.listen(3000)

