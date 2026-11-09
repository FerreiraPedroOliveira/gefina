
import { Router } from 'express';

import {
  findAllInvoices,
  findInvoiceById,
  insertInvoice,
  modifyInvoice,
  removeInvoice
} from './invoice.service.ts';

import { invoiceSchema, toFieldErrors } from './invoice.Schema.ts';

const router = Router();

function parseId(value: string): number | undefined {
  const id = Number(value);

  if (!Number.isInteger(id) || id < 1) return undefined;

  return id;
}

router.get('/', async (_request, response) => {
  const invoices = await findAllInvoices();

  return response.status(200).json(invoices);
});

router.get('/:id', async (request, response) => {
  const id = parseId(request.params.id);

  if (!id) {
    return response.status(400).json({
      error: {
        status: 400,
        message: 'Identificador inválido.'
      }
    });
  }

  const invoice = await findInvoiceById(id);

  if (!invoice) {
    return response.status(404).json({
      error: {
        status: 404,
        message: 'Fatura não encontrada.'
      }
    });
  }

  return response.status(200).json(invoice);
});

router.post('/', async (request, response) => {
  const result = invoiceSchema.safeParse(request.body);

  if (!result.success) {
    return response.status(400).json({
      error: {
        status: 400,
        message: 'Dados inválidos',
        fields: toFieldErrors(result.error)
      }
    });
  }

  const invoice = await insertInvoice(result.data);

  return response.status(201).json(invoice);
});

router.put('/:id', async (request, response) => {
  const id = parseId(request.params.id);

  if (!id) {
    return response.status(400).json({
      error: {
        status: 400,
        message: 'Identificador inválido.'
      }
    });
  }

  const invoice = await modifyInvoice(id, request.body);

  if (!invoice) {
    return response.status(404).json({
      error: {
        status: 404,
        message: 'Fatura não encontrada.'
      }
    });
  }

  return response.status(200).json(invoice);
});

router.delete('/:id', async (request, response) => {
  const id = parseId(request.params.id);

  if (!id) {
    return response.status(400).json({
      error: {
        status: 400,
        message: 'Identificador inválido.'
      }
    });
  }

  const deleted = await removeInvoice(id);

  if (!deleted) {
    return response.status(404).json({
      error: {
        status: 404,
        message: 'Fatura não encontrada.'
      }
    });
  }

  return response.status(204).end();
});

export default router;