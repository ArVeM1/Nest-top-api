import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import {TopPageModule} from "../top-page/top-page.module";
import {ConfigService} from "@nestjs/config";

@Module({
  controllers: [SitemapController],
  imports: [TopPageModule, ConfigService]
})
export class SitemapModule {}
