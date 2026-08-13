import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VerificationCleanupService {
  private readonly logger = new Logger(VerificationCleanupService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async removeExpiredVerifications() {
    const { count } = await this.prisma.verification.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
    if (count > 0) {
      this.logger.log(`Removed ${count} expired verification record(s)`);
    }
  }
}
