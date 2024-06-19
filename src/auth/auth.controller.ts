import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  async registerUser() {
    try {
      const result = await firstValueFrom(
        this.client.send('auth.register.user', {}),
      );

      return result;
    } catch (error: any) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  async loginUser() {
    try {
      const result = await firstValueFrom(
        this.client.send('auth.login.user', {}),
      );

      return result;
    } catch (error: any) {
      throw new RpcException(error);
    }
  }

  @Get('verify')
  async verifyToken() {
    try {
      const result = await firstValueFrom(
        this.client.send('auth.verify.token', {}),
      );

      return result;
    } catch (error: any) {
      throw new RpcException(error);
    }
  }
}
