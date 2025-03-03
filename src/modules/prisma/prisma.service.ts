import { Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient<
  Prisma.PrismaClientOptions,
  Prisma.LogLevel
> {
  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    super({ log: ['query'] });
  }

  async onModuleInit() {
    this.$on('query', (e) => this.logger.log('⚡ Query: ', e.query));
    await this.$connect();
  }
}
