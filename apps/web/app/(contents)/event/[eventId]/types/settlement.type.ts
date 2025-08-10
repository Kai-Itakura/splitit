import { components } from '@/openapi/schema';

export type Settlement =
  components['schemas']['EventGroupDetailDto']['settlements'][number];
