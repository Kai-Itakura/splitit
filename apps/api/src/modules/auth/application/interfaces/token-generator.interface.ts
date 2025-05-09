import { CurrentUserType } from '../../../../decorators/types/current-user.type';
import { TokenPair } from '../../presentation/dto/token-pair.dto';

export interface ITokenGenerator {
  generateTokenPair(payload: CurrentUserType): Promise<TokenPair>;
}

export const TokenGeneratorToken = Symbol('ITokenGenerator');
