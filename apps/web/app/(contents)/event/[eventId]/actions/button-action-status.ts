export const BUTTON_ACTION_STATUS = {
  ERROR: 'error',
  SUCCESS: 'success',
};

export type ButtonActionStatus =
  | {
      status: typeof BUTTON_ACTION_STATUS;
      message: string;
    }
  | {
      status: typeof BUTTON_ACTION_STATUS.SUCCESS;
      message: string;
    };
