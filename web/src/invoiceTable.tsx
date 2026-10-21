import type { Invoice } from "./invoiceType.ts";
import InvoiceRow from "./InvoiceRow.tsx";

interface invoiceTableprops{
    invoices: Invoice[];
}

export default function InvoiceTable(props: invoiceTableprops){
    return <table>
        <thead>
            <tr>
            <th>Cliente</th>
            <th>Valor</th>
            <th>Data de emissão</th>
            <th>Data de vencimento</th>
            <th>Situação</th>
            </tr>
        </thead>
        <tbody>
            {props.invoices.map(invoice=>(
                <InvoiceRow key={invoice.id} invoice={invoice}/>
            ))}
        </tbody>
    </table>
}