import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapperService } from './scrapper/scrapper.service';
import { ScrapperController } from './scrapper/scrapper.controller';

@Module({
  imports: [],
  controllers: [AppController, ScrapperController],
  providers: [AppService, ScrapperService],
})
export class AppModule {}
