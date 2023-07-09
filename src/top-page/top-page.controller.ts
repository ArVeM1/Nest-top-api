import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Injectable,
    NotFoundException,
    Param,
    Patch,
    Post,
    UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import {TopPageModel} from "./top-page.model";
import {FindTopPageDto} from "./dto/find-top-page.dto";
import {TopPageService} from "./top-page.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {CreateTopPageDto} from "./dto/create-top-page.dto";
import {NOT_FOUND_TOP_PAGE_ERROR} from "./top-page.constants";

@Controller('top-page')
export class TopPageController {
    constructor(private readonly topPageService: TopPageService) {
    }
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() dto: CreateTopPageDto) {
        return this.topPageService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id') id: string) {
        const page = await this.topPageService.findById(id);
        if (!page) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
        }
        return page;
    }

    @Get('byAlias/:alias')
    async getByAlias(@Param('alias') alias: string) {
        const page = await this.topPageService.findByAlias(alias);
        if (!page) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
        }
        return page;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        const deletePage = await this.topPageService.deleteById(id);
        if (!deletePage) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patch(@Param('id') id: string, @Body() dto: TopPageModel) {
        const updatedPage = await this.topPageService.updateById(id, dto);
        if (!updatedPage) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
        }
        return updatedPage;
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindTopPageDto) {
        return this.topPageService.findByCategory(dto.firstCategory);
    }

    @Get('textSearch/:text')
    async textSearch(@Param('text') text: string) {
        return this.topPageService.findByText(text);
    }
}