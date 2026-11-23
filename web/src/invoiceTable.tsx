import InvoiceRow from './InvoiceRow.tsx';
import type { Invoice } from './invoiceType.ts';

interface invoiceTableprops {
  invoices: Invoice[];
  edit: (invoice: Invoice) => void;
}

export default function InvoiceTable(props: invoiceTableprops) {
  const base =
    'text-sm font-medium text-text-muted p-3 border-b border-border ';

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className={`${base}`}>Cliente</th>
          <th className={`${base}`}>Valor</th>
          <th className={base}>Data de emissão</th>
          <th className={base}>Data de vencimento</th>
          <th className={base}>Situação</th>
          <th className={base}></th>
        </tr>
      </thead>
      <tbody>
        {props.invoices.map((invoice) => (
          <InvoiceRow
            key={invoice.id}
            invoice={invoice}
            edit={props.edit}
          />
        ))}
      </tbody>
    </table>
  );
}
