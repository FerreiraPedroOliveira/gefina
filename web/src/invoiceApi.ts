import type { Invoice, InvoiceInput } from "./invoiceType.ts";



export async function getAllInvoices():Promise<Invoice[]> {
    const response = await fetch('/api/invoices')
    if (!response.ok) throw new Error('Falha ao buscar faturas.');

    return response.json();
} 
export async function getInvoicesById(id:number):Promise<Invoice[]> {
    const response = await fetch(`/api/invoices/${id}`)
    if (!response.ok) throw new Error('Falha ao buscar faturas.');

    return response.json();
} 

export async function createInvoice (datas: InvoiceInput): Promise<void>{
    const response = await fetch('/api/invoices',{
        method:'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(datas)
    });

    if (!response.ok)throw new Error ('Falha ao criar fatura.')
}

export async function updateInvoice (id: number, datas: InvoiceInput): Promise<void>{
    const response = await  fetch('api/invoice',{
        method:'PUT',
        headers:{'content-type': 'aplication/type'},
        body:JSON.stringify(datas)
    });
    if (!response.ok)throw new Error ('Falha ao editar fatura.');
}

export async function DeleteInvoice(id:number):Promise<void> {
    const response = await fetch (`/api/invoice/${id}`, {method:'DELETE'})

    if (!response.ok)throw new Error('Falha ao excluir fatura.');
    
}