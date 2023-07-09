import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from './../src/app.module';
import {CreateReviewDto} from "../src/review/dto/create-review.dto";
import {disconnect, Types} from "mongoose";
import {REVIEW_NOT_FOUND} from "../src/review/review.constans";
import {AuthDto} from "../src/auth/dto/auth.dto";

const loginDto: AuthDto = {
    login: 'a@a.ru',
    password: 'test'
};

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/login (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto)
            .expect(200)
            .then(({body}: request.Response) => {
                expect(body.access_token).toBeDefined();
            });
    });

    it('/auth/login (POST) - fail password', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({...loginDto, password: '2' })
            .expect(401, {
                message: "Пользователь с таким password не найден",
                error: "Unauthorized",
                statusCode: 401
            })
    });

    it('/auth/login (POST) - fail login', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({...loginDto, login: 'aa.@a.ru' })
            .expect(401, {
                message: "Пользователь с таким email не найден",
                error: "Unauthorized",
                statusCode: 401
            })
    });



    afterAll(() => {
        disconnect();
    })
});
