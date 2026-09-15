import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PropertiesModule } from './modules/properties/properties.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PropertiesModule,
  ],
})
export class AppModule {}
