import { components } from '@/openapi/schema';

export type Expense =
  components['schemas']['EventGroupDetailDto']['expenses'][number];
