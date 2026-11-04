import { z, type ZodError } from 'zod';

export type InvoiceStatus = z.infer<typeof invoiceStatusSchema>;


const invoiceStatusSchema = z.enum(
    [
        'paid',
        'pending'
    ],
    'A situação informada é inválida. Os valores permitidos são "Paga" e "Pendente".'
);

export type InvoiceInput = z.infer<typeof invoiceSchema>;

export const invoiceSchema = z
    .object(
        {
            customerId: z
                .number('O cliente é obrigatório.')
                .int('O identificador do cliente deve ser um número inteiro.')
                .positive('O identificador do cliente deve ser maior que zero.'),
            amount: z
                .number('O valor é obrigatório.')
                .int('O valor da fatura deve ser um número inteiro.')
                .positive('O valor da fatura deve ser maior que zero.'),
            status: invoiceStatusSchema,
            issueDate: z.iso.date('A data de emissão deve ser uma data válida.'),
            dueDate: z.iso.date('A data de vencimento deve ser uma data válida.')
        }
    )
    .refine(
        (datas)=>datas.dueDate >= datas.issueDate,
        {
            error: 'A data de vencimento não pode ser anterior a data de emissão',
            path: ['dueDate']
        }
    );

type invoiceInput = z.infer<typeof invoiceSchema>;

interface InvoiceFieldErros{
    customerId?: string,
    amount?: string,
    status?:string,
    issuDate?: string,
    dueDate?:string
}

export function toFieldErros (error:ZodError<invoiceInput>):InvoiceFieldErros{
    const {
        customerId,
        amount,
        status,
        issueDate,
        dueDate


    } = z.flattenError(error).fieldErrors;

    return{
        customerId:customerId ?.[0],
        amount:amount?.[0],
        status:status ?.[0],
        issuDate:issueDate ?.[0],
        dueDate:dueDate ?.[0]

    }
}