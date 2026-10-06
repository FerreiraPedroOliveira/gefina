import { useState, useEffect } from 'react'
import type { Invoice } from './invoiceType.ts';

import InvoiceTable from './invoiceTable.tsx';
import type React from 'react';



export default function App() {

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [error, setError]= useState<string | null>(null);

  useEffect(() => {
    async function getInvoices() {
      try{
        const response = await fetch('/api/invoices');

        if (!response.ok)
          setError('Não foi possivel carregar faturas')

        const datas = await response.json();
        setInvoices(datas);
      }catch{
        setError('Não foi possivel carregar faturas.');
      }

      

    }

    getInvoices();
  }, []);

  if(error) return <p>{error}</p>;
  
  return<InvoiceTable invoices={invoices}/>
}
