import { TokenPair } from '@repo/types';
import { CurrentUserType } from '../../decorators/types/current-user.type';

export interface ITokenGenerator {
  generateTokenPair(payload: CurrentUserType): Promise<TokenPair>;
}

export const TokenGeneratorToken = Symbol('ITokenGenerator');
