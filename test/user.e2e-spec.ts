import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersModule } from '../src/users/users.module';
import { User } from '../src/users/entities/user.entity';
import { AppModule } from '../src/app.module';

describe('UserResolver (e2e)', () => {
  let app: INestApplication;

  const mockUser = { id: 3, username: 'peter' };
  const mockUserRepository = {
    // save: jest.fn().mockResolvedValue(mockUser),
    // find: jest.fn().mockResolvedValue(mockUser),
    // findOne: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // .overrideProvider(getRepositoryToken(User))
      // .useValue(mockUserRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get a single user by username', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{user(username: "admin1") {id username firstName}}',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.user).toEqual({
          id: 2,
          username: 'admin1',
          firstName: null,
        });
      });
  });

  it('should create user and return that', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query:
          'mutation {createUser(createUserInput: {username: "admin3345229" password: "admin3345229"}) {id username}}',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createUser).toEqual({
          id: 29,
          username: 'admin3345229',
        });
      });
  });
});
