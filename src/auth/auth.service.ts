import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}
  
  async authenticate(dto: AuthDTO) {
    const payload = {
      sub: dto.userId,
      email: dto.email
    }
    
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET')
    })
    console.log('🔥 ~ AuthService ~ authenticate ~ accessToken:', accessToken);
    
    return accessToken
  }
}
