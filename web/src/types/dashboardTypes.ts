import type { Invoice } from './invoiceType.ts';

interface DashboardTotals {
  paid: number;
  pending: number;
  invoiceCount: number;
  customerCount: number;
}

export interface Dashboard {
  totals: DashboardTotals;
  recentInvoices: Invoice[];
  overdueInvoices: Invoice[];
}
