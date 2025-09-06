export interface paths {
  '/auth/signup': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['signup'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/login': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['login'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/logout': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['logout'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/auth/refresh': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['refresh'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/me': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['getMe'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/{userId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['findById'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['findByEmail'];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/user/{userId}/image': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['uploadImage'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/event-group': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['getAllGroups'];
    put?: never;
    post: operations['create'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/event-group/{groupId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations['getGroup'];
    put: operations['updateEvent'];
    post?: never;
    delete: operations['deleteGroup'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/event-group/{groupId}/member': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put: operations['addMember'];
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/event-group/{groupId}/member/{memberId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete: operations['deleteMember'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/event-group/{groupId}/expense-record': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post: operations['addExpense'];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/event-group/{groupId}/expense-record/{expenseId}': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put: operations['updateExpense'];
    post?: never;
    delete: operations['deleteExpense'];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    SignupAuthDto: {
      /** Format: email */
      email: string;
      password: string;
      name: string;
    };
    Message: {
      message: string;
    };
    LoginAuthDto: {
      /** Format: email */
      email: string;
      password: string;
    };
    TokenPair: {
      accessToken: {
        value: string;
        /** Format: date-time */
        expiresAt: string;
      };
      refreshToken: {
        value: string;
        /** Format: date-time */
        expiresAt: string;
      };
    };
    ReturnUserDTO: {
      id: string;
      email: string;
      name: string;
    };
    UploadImageDto: {
      /**
       * Format: binary
       * @description アップロードする画像ファイル
       */
      image: FormData;
    };
    EventGroupDto: {
      title: string;
      currency: string;
    };
    EventGroupDetailDto: {
      id: string;
      title: string;
      currency: string;
      /** Format: date-time */
      createdAt: string;
      member: {
        id: string;
        name: string;
      }[];
      expenses: {
        id: string;
        title: string;
        amount: number;
        /** Format: date-time */
        createdAt: string;
        payer: {
          id?: string;
          name?: string;
        };
        payees?: {
          id: string;
        }[];
      }[];
      settlements: {
        id: string;
        payeeId: string;
        payerId: string;
        amount: number;
      }[];
      totalExpense: number;
    };
    ReturnGroupDto: {
      id: string;
      title: string;
      memberCount: number;
      /** Format: date-time */
      createdAt: string;
    };
    MemberDto: {
      memberId: string;
    };
    ExpenseDto: {
      title: string;
      amount: number;
      payerId: string;
      payeeIds: string[];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  signup: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['SignupAuthDto'];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Message'];
        };
      };
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 409 */
            statusCode: number;
            /** @example Conflict */
            message: string;
            /** @example Conflict */
            error?: string;
          };
        };
      };
    };
  };
  login: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['LoginAuthDto'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['TokenPair'];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 404 */
            statusCode: number;
            /** @example Not Found */
            message: string;
            /** @example Not Found */
            error?: string;
          };
        };
      };
    };
  };
  logout: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['TokenPair'];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 401 */
            statusCode: number;
            /** @example Unauthorized */
            message: string;
            /** @example Unauthorized */
            error?: string;
          };
        };
      };
    };
  };
  refresh: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['TokenPair'];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 401 */
            statusCode: number;
            /** @example Unauthorized */
            message: string;
            /** @example Unauthorized */
            error?: string;
          };
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 404 */
            statusCode: number;
            /** @example Not Found */
            message: string;
            /** @example Not Found */
            error?: string;
          };
        };
      };
    };
  };
  getMe: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ReturnUserDTO'];
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 404 */
            statusCode: number;
            /** @example Not Found */
            message: string;
            /** @example Not Found */
            error?: string;
          };
        };
      };
    };
  };
  findById: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        userId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ReturnUserDTO'];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 401 */
            statusCode: number;
            /** @example Unauthorized */
            message: string;
            /** @example Unauthorized */
            error?: string;
          };
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 404 */
            statusCode: number;
            /** @example Not Found */
            message: string;
            /** @example Not Found */
            error?: string;
          };
        };
      };
    };
  };
  findByEmail: {
    parameters: {
      query: {
        email: string;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ReturnUserDTO'];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 401 */
            statusCode: number;
            /** @example Unauthorized */
            message: string;
            /** @example Unauthorized */
            error?: string;
          };
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 404 */
            statusCode: number;
            /** @example Not Found */
            message: string;
            /** @example Not Found */
            error?: string;
          };
        };
      };
    };
  };
  uploadImage: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        userId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'multipart/form-data': components['schemas']['UploadImageDto'];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Message'];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 400 */
            statusCode: number;
            /** @example Bad Request */
            message: string;
            /** @example Bad Request */
            error?: string;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 401 */
            statusCode: number;
            /** @example Unauthorized */
            message: string;
            /** @example Unauthorized */
            error?: string;
          };
        };
      };
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 422 */
            statusCode: number;
            /** @example Unprocessable Entity */
            message: string;
            /** @example Unprocessable Entity */
            error?: string;
          };
        };
      };
    };
  };
  getAllGroups: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['ReturnGroupDto'][];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 401 */
            statusCode: number;
            /** @example Unauthorized */
            message: string;
            /** @example Unauthorized */
            error?: string;
          };
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 404 */
            statusCode: number;
            /** @example Not Found */
            message: string;
            /** @example Not Found */
            error?: string;
          };
        };
      };
    };
  };
  create: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['EventGroupDto'];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Message'];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 400 */
            statusCode: number;
            /** @example Bad Request */
            message: string;
            /** @example Bad Request */
            error?: string;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 401 */
            statusCode: number;
            /** @example Unauthorized */
            message: string;
            /** @example Unauthorized */
            error?: string;
          };
        };
      };
    };
  };
  getGroup: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        groupId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['EventGroupDetailDto'];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 401 */
            statusCode: number;
            /** @example Unauthorized */
            message: string;
            /** @example Unauthorized */
            error?: string;
          };
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 404 */
            statusCode: number;
            /** @example Not Found */
            message: string;
            /** @example Not Found */
            error?: string;
          };
        };
      };
    };
  };
  updateEvent: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        groupId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['EventGroupDto'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Message'];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 400 */
            statusCode: number;
            /** @example Bad Request */
            message: string;
            /** @example Bad Request */
            error?: string;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 401 */
            statusCode: number;
            /** @example Unauthorized */
            message: string;
            /** @example Unauthorized */
            error?: string;
          };
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 404 */
            statusCode: number;
            /** @example Not Found */
            message: string;
            /** @example Not Found */
            error?: string;
          };
        };
      };
    };
  };
  deleteGroup: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        groupId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Message'];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 401 */
            statusCode: number;
            /** @example Unauthorized */
            message: string;
            /** @example Unauthorized */
            error?: string;
          };
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 404 */
            statusCode: number;
            /** @example Not Found */
            message: string;
            /** @example Not Found */
            error?: string;
          };
        };
      };
    };
  };
  addMember: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        groupId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['MemberDto'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Message'];
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 401 */
            statusCode: number;
            /** @example Unauthorized */
            message: string;
            /** @example Unauthorized */
            error?: string;
          };
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 404 */
            statusCode: number;
            /** @example Not Found */
            message: string;
            /** @example Not Found */
            error?: string;
          };
        };
      };
    };
  };
  deleteMember: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        groupId: string;
        memberId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Message'];
        };
      };
    };
  };
  addExpense: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        groupId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['ExpenseDto'];
      };
    };
    responses: {
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Message'];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 400 */
            statusCode: number;
            /** @example Bad Request */
            message: string;
            /** @example Bad Request */
            error?: string;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 401 */
            statusCode: number;
            /** @example Unauthorized */
            message: string;
            /** @example Unauthorized */
            error?: string;
          };
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 404 */
            statusCode: number;
            /** @example Not Found */
            message: string;
            /** @example Not Found */
            error?: string;
          };
        };
      };
    };
  };
  updateExpense: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        groupId: string;
        expenseId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['ExpenseDto'];
      };
    };
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Message'];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 400 */
            statusCode: number;
            /** @example Bad Request */
            message: string;
            /** @example Bad Request */
            error?: string;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 401 */
            statusCode: number;
            /** @example Unauthorized */
            message: string;
            /** @example Unauthorized */
            error?: string;
          };
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 404 */
            statusCode: number;
            /** @example Not Found */
            message: string;
            /** @example Not Found */
            error?: string;
          };
        };
      };
    };
  };
  deleteExpense: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        groupId: string;
        expenseId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': components['schemas']['Message'];
        };
      };
      400: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 400 */
            statusCode: number;
            /** @example Bad Request */
            message: string;
            /** @example Bad Request */
            error?: string;
          };
        };
      };
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 401 */
            statusCode: number;
            /** @example Unauthorized */
            message: string;
            /** @example Unauthorized */
            error?: string;
          };
        };
      };
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          'application/json': {
            /** @example 404 */
            statusCode: number;
            /** @example Not Found */
            message: string;
            /** @example Not Found */
            error?: string;
          };
        };
      };
    };
  };
}
