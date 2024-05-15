import { Module } from '@nestjs/common';
import { AnimalsModule } from './animals/animals.module';
import { SheltersModule } from './shelters/shelters.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, AnimalsModule, SheltersModule],
})
export class AppModule {}
