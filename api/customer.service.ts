import prisma from './prisma.ts';

interface CustomerOption {
  id: number;
  email: string;
  name: string;
}

export async function findCustomersOptions(): Promise<
  CustomerOption[]
> {
  return await prisma.customer.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: { name: 'asc' },
  });
}
