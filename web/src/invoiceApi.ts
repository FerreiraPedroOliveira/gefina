import type {
  ApiFailure,
  Invoice,
  InvoiceInput,
} from './invoiceType.ts';

export async function getAllInvoices(): Promise<Invoice[]> {
  const response = await fetch('/api/invoices');
  if (!response.ok) throw new Error('Falha ao buscar faturas.');

  return response.json();
}
export async function getInvoicesById(
  id: number,
): Promise<Invoice[]> {
  const response = await fetch(`/api/invoices/${id}`);
  if (!response.ok) throw new Error('Falha ao buscar faturas.');

  return response.json();
}

export async function createInvoice(
  datas: InvoiceInput,
): Promise<ApiFailure | undefined> {
  const response = await fetch('/api/invoices', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(datas),
  });

  if (response.status === 400) {
    const body = await response.json();

    return {
      message: body.error.message,
      fields: body.error.fields,
    };
  }

  if (!response.ok) throw new Error('Falha ao criar fatura.');
}

export async function updateInvoice(
  _id: number,
  datas: InvoiceInput,
): Promise<void> {
  const response = await fetch('api/invoice', {
    method: 'PUT',
    headers: { 'content-type': 'aplication/type' },
    body: JSON.stringify(datas),
  });
  if (!response.ok) throw new Error('Falha ao editar fatura.');
}

export async function deleteInvoice(id: number): Promise<void> {
  const response = await fetch(`/api/invoices/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Falha ao excluir fatura.');
}
