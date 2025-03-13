import { Prisma } from '@prisma/client';

export type EventGroupDetailDto = Prisma.EventGroupGetPayload<{
  select: {
    id: true;
    title: true;
    currency: true;
    createdAt: true;
    member: {
      select: {
        id: true;
        name: true;
      };
    };
    expenses: {
      select: {
        id: true;
        title: true;
        payer: {
          select: {
            name: true;
          };
        };
        payees: {
          select: {
            id: true;
          };
        };
      };
    };
  };
}>;
