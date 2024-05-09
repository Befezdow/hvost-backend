import { Module } from '@nestjs/common';
import { AnimalsModule } from './animals/animals.module';
import { SheltersModule } from './shelters/shelters.module';

@Module({
  imports: [AnimalsModule, SheltersModule],
})
export class AppModule {}
