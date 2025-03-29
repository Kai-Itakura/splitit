import { AuthUser } from './auth-user.entity';

describe('AuthUser', () => {
  let authUser: AuthUser;

  beforeEach(async () => {
    // arrange
    const email = 'test@email.com';
    const password = 'test1234';
    authUser = await AuthUser.create(email, password);

    // act
    authUser.addRefreshToken('token1', new Date(Date.now() + 10000));
    authUser.addRefreshToken('token2', new Date(Date.now() + 20000));
  });

  it('should add and remove all refresh tokens', () => {
    // act
    authUser.removeAllRefreshTokens();
    // assert
    expect(authUser.refreshTokens).toHaveLength(0);
  });

  it('should add and remove refresh token', () => {
    // act
    authUser.removeRefreshToken('token1');

    //assert
    expect(authUser.refreshTokens).toHaveLength(1);
    expect(
      authUser.refreshTokens.find(
        (refreshToken) => refreshToken.value === 'token1',
      ),
    ).toBeUndefined();
    expect(authUser.removedRefreshTokenId).toBeDefined();
  });
});
