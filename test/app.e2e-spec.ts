import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    //Validation Pipe 생성 = Middleware, 더 강력한 유효성 검사 체크 : whitelist, forbidNonWhitelisted
    //테스트 용도의 새로운 app이 생성되는 것이기 때문에 진짜와 똑같이하려면  파이프 및 transform을 설정해줘야한다.  
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, 
        forbidNonWhitelisted: true,
        transform: true //자동으로 DTO 타입으로 변환
      })
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    // it('GET', () => {
    //   return request(app.getHttpServer())
    //     .get('/movies')
    //     .expect(200)
    //     .expect([]);
    // });
    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404);
    });

  });

  describe('/movies/:id', () => {
    it("GET 200", () => {
      return request(app.getHttpServer())
        .get("/movies/1")
        .expect(200);
    });
    it.todo("DELETE");
    it.todo("PATCH");
  })

});
