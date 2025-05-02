const FORM_STATUS = {
  IDLE: 'idle',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

type FormStatus = (typeof FORM_STATUS)[keyof typeof FORM_STATUS];

type FormActionState =
  | {
      status: typeof FORM_STATUS.IDLE;
    }
  | {
      status: typeof FORM_STATUS.SUCCESS;
      message: string;
    }
  | {
      status: typeof FORM_STATUS.ERROR;
      message: string;
    };

export { FORM_STATUS };
export type { FormActionState, FormStatus };
