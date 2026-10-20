import { useState, useEffect } from 'react'
import type { Dashboard } from './dashboardTypes.ts';
import InvoiceSummaryTable from './invoiceSummaryTable.tsx';
import SummaryCard from './summaryCard.tsx';
import { formatCurrency } from './utils.ts';


export default function DashBoardPage() {

  const [dashboard, setDashboard] = useState<null | Dashboard>(null);
  const [error, setError]= useState<string | null>(null);
  const [loading, setLoading]= useState(true);
  useEffect(() => {
    async function getDashboard() {
      try{
        const response = await fetch('/api/dashboard');

        if (!response.ok){
            setError('Não foi possivel carregar faturas')
            setLoading 
            return
        }

        const datas = await response.json();
        setDashboard(datas);
        }catch(error){ 
        setError('Não foi possivel carregar faturas.');
        }

      setLoading(false)

    }

    getDashboard();
    }, []);

    if(loading) return <p>{'Carregando painel incial'}</p>;
    if(error !== null || dashboard === null) return <p>{error}</p>
    
   return <div>
        <h1>Painel Inicial</h1>
        <div>   
        <SummaryCard label ='Total recebido:' value={formatCurrency(dashboard.totals.paid)}/>
        <SummaryCard label ='Total pendente:' value={formatCurrency(dashboard.totals.pending)}/>
        <SummaryCard label ='Faturas:' value={String(dashboard.totals.invoiceCount)}/>
        <SummaryCard label ='Clientes:' value={String(dashboard.totals.customersCount)}/>
       </div>  
    
        <InvoiceSummaryTable
        title='Faturas Recentes'
        dateLabel="Emissão"
        invoices={dashboard.recentInvoices}
        date={(invoice) => invoice.issueDate}
        />

        <InvoiceSummaryTable
        title="Faturas Atrasadas"
        dateLabel="Vencimento"
        invoices={dashboard.overdueInvoices}
        date={(invoice) => invoice.dueDate}
        />
    
    </div>

}
