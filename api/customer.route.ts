import { Router } from "express";

import { findCustomersOptions } from "./customer.service.ts";

const router = Router();

router. get('/opitions', async(request, response)=>{
    const customersOptions = await findCustomersOptions();

    response.status(200).json(customersOptions)
});


export default router;