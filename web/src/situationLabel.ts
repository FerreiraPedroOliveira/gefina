import type {InvoiceSituation} from './invoiceType.ts';

export default function situationLabel(situation: InvoiceSituation){
    switch(situation){
        case 'paid': return 'paga';
        case 'pending': return 'Pendente';
        case 'overdue': return 'Atrasada';
    }
}