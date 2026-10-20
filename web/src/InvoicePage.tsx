import { useState, useEffect } from "react";
import InvoiceTable from "./invoiceTable.tsx";
import type { Invoice } from "./invoiceType.ts";

export default function InvoicePage(){
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true)
useEffect(() =>{
  async function getInvoices() {
    try{
      const response = await fetch('/api/invoices');
      if(!response.ok){
        setError('Não foi possivel carregar faturas.')
        setLoading(false)
        return;
      }
        const data = await response.json();
        setInvoices(data);
    }catch{
      setError('Não foi possivel carregar faturas.')
    }
    setLoading(false)
  }
  getInvoices();
},[]);
  if(loading) return <p>Carregando Faturas....</p>
  if(error){
    return <p>{error}</p>
  }
  return <>
    <h1>Faturas</h1>
   <InvoiceTable invoices={invoices}/> 
  </>
}