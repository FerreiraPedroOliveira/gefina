import { useEffect, useState } from 'react';
import type { Dashboard } from './dashboardTypes.ts';
import InvoiceSummaryTable from './invoiceSummaryTable.tsx';
import SummaryCard from './SummaryCard.tsx';
import { formatCurrency } from './utils.ts';

export default function DashBoardPage() {
  const [dashboard, setDashboard] = useState<null | Dashboard>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getDashboard() {
      try {
        const response = await fetch('/api/dashboard');

        if (!response.ok) {
          setError('Não foi possivel carregar faturas');
          setLoading;
          return;
        }

        const datas = await response.json();
        setDashboard(datas);
      } catch (_error) {
        setError('Não foi possivel carregar faturas.');
      }

      setLoading(false);
    }

    getDashboard();
  }, []);

  if (loading) return <p className='text-sm text-text-muted'>Carregando...</p>;
  if (error !== null || dashboard === null) return <p className='text-overdue'>{error}</p>;

  console.log(dashboard.totals.invoiceCount)

  return (
    <div>
      <h1 className='text-xl font-semibold mb-7'>Painel Inicial</h1>
      <div className="flex gap-4">
        <SummaryCard
          label="Total recebido:"
          value={formatCurrency(dashboard.totals.paid)}
        />
        <SummaryCard
          label="Total pendente:"
          value={formatCurrency(dashboard.totals.pending)}
        />
        <SummaryCard
          label="Faturas:"
          value={String(dashboard.totals.invoiceCount)}
        />
        <SummaryCard
          label="Clientes:"
          value={String(dashboard.totals.customersCount)}
        />
      </div>
      <div className="flex gap-6 mt-8">
        <InvoiceSummaryTable
          title="Faturas recentes"
          dateLabel="Emissão"
          invoices={dashboard.recentInvoices}
          date={(invoice) => invoice.issueDate}
        />

        <InvoiceSummaryTable
          title="Faturas atrasadas"
          dateLabel="Vencimento"
          invoices={dashboard.overdueInvoices}
          date={(invoice) => invoice.dueDate}
        />
      </div>
      <small className='fixed bottom-0 left-[calc(50%+120px)] -translate-x-1/2'>&copy; 2026. Gefina - Gestor financeiro simples e eficiente.</small>
    </div>
  );
}
