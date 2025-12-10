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
  '/auth/{userId}/password': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch: operations['updatePassword'];
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
    delete: operations['deleteImage'];
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
    RefreshTokenDto: {
      refreshToken: string;
    };
    UpdatePasswordDto: {
      newPassword: string;
      confirmPassword: string;
      oldPassword: string;
    };
    ReturnUserDTO: {
      id: string;
      email: string;
      name: string;
      imageUrl?: string;
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
    ProfileImageDto: {
      /** @description プロフィール画像のURL */
      url: string;
    };
    EventMemberDto: {
      /** @description メンバーID */
      id: string;
      /** @description メンバー名 */
      name: string;
      /** @description プロフィール画像 */
      profileImage: components['schemas']['ProfileImageDto'] | null;
    };
    PayerDto: {
      /** @description 支払者ID */
      id: string;
      /** @description 支払者名 */
      name: string;
    };
    PayeeDto: {
      /** @description 支払先ID */
      id: string;
    };
    EventExpenseDto: {
      /** @description 支出ID */
      id: string;
      /** @description 支出タイトル */
      title: string;
      /** @description 支出金額 */
      amount: number;
      /**
       * Format: date-time
       * @description 作成日時
       */
      createdAt: string;
      /** @description 支払者情報 */
      payer: components['schemas']['PayerDto'];
      /** @description 支払先情報 */
      payees: components['schemas']['PayeeDto'][];
    };
    EventSettlementDto: {
      /** @description 精算ID */
      id: string;
      /** @description 支払先ID */
      payeeId: string;
      /** @description 支払者ID */
      payerId: string;
      /** @description 精算金額 */
      amount: number;
    };
    EventGroupDetailDto: {
      /** @description イベントグループID */
      id: string;
      /** @description イベントグループタイトル */
      title: string;
      /** @description 通貨 */
      currency: string;
      /**
       * Format: date-time
       * @description 作成日時
       */
      createdAt: string;
      /** @description メンバー一覧 */
      member: components['schemas']['EventMemberDto'][];
      /** @description 支出一覧 */
      expenses: components['schemas']['EventExpenseDto'][];
      /** @description 精算一覧 */
      settlements: components['schemas']['EventSettlementDto'][];
      /** @description 総支出額 */
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
    requestBody: {
      content: {
        'application/json': components['schemas']['RefreshTokenDto'];
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
    requestBody: {
      content: {
        'application/json': components['schemas']['RefreshTokenDto'];
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
  updatePassword: {
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
        'application/json': components['schemas']['UpdatePasswordDto'];
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
  deleteImage: {
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
