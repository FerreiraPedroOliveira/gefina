import { useState, useEffect } from "react";
import InvoiceTable from "./invoiceTable.tsx";
import type { Invoice, InvoiceInput } from "./invoiceType.ts";
import InvoiceForm from "./invoiceForm.tsx";
import {getAllInvoices, createInvoice} from './invoiceApi.ts'
import type { CustomerOption } from "./customerType.ts";

export default function InvoicePage(){
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customersOption, setCustomersOptions]=useState<CustomerOption[]>([])
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy]=useState(false)
  const [formError, setFormError]=useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
useEffect(() =>{
  async function getInvoices() {
    try{
      const datas = await getAllInvoices();
      setInvoices(datas);
    }catch(error){
      if (error instanceof Error)setError(error.message);
      
    }
    setLoading(false)
  }
  getInvoices();
},[]);

 useEffect(()=>{
  async function  getCustomersOption(){
    try{
      const response = await fetch('/api/customers/options')
      if(!response.ok) throw new Error('Falha ao buscar clientes')

      const datas = await response.json();

      setCustomersOptions(datas);
    }catch(error){
      if (error instanceof Error) setError(error.message)
    }
  }

  getCustomersOption();
 },[]);  

 async function refresh() {
   try{
      const datas = await getAllInvoices();
      setInvoices(datas);
    }catch(error){
      if (error instanceof Error) throw error;
      
    }
 }

 async function submit(datas:InvoiceInput){
  setBusy(true);
  setFormError(null);

  try{
      await createInvoice(datas);
      await refresh();
  }catch(error){
    if(error instanceof Error) setFormError(error.message);
  }
setBusy(false)

 }

  if(loading) return <p>Carregando Faturas....</p>
  if(error){
    return <p>{error}</p>
  }
  return <>
    <h1>Faturas</h1>
    <div>
   <InvoiceTable invoices={invoices}/> 

    </div>
   <InvoiceForm
      invoice={null}
      customers={customersOption}
      error={formError}
      onDelete={()=>null}
      onCancel={()=>null}
      onSubmit={submit}
      busy={busy}
   />
  </>
}
