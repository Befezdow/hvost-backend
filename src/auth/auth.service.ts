import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SheltersService } from 'src/shelters/shelters.service';
import { shelterDetailsDboToDto } from 'src/shelters/shelters.mapper';

@Injectable()
export class AuthService {
  constructor(
    private sheltersService: SheltersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    login: string,
    pass: string,
  ): Promise<{ token: string; expiresAt: Date }> {
    const shelter = await this.sheltersService.findByLogin(login);
    // TODO: use bcrypt
    if (shelter?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { user: shelterDetailsDboToDto(shelter) };
    const token = await this.jwtService.signAsync(payload);
    const { exp: rawExpirationTime } = this.jwtService.decode(token);
    return { token, expiresAt: new Date(rawExpirationTime * 1000) };
  }
}
