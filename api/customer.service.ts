import pool from "./database.ts";

interface CustomerOption{
    id:number;
    email: string;
    name:string
}

export async function findCustomersOptions():Promise<CustomerOption[]>{
    const connect = await pool.query<CustomerOption> ('SELECT id, name, email FROM customers ORDER BY name;');
    
    return connect.rows;
}