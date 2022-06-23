import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const users: User[] = [
    {
      id: 2,
      username: 'peter',
      password: 'sdfs',
      createdDate: new Date(),
      updatedDate: new Date(),
    },
  ];
  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((user) => {
      const newUser = {
        id: 3,
        ...user,
      } as User;
      users.push(newUser);
      return Promise.resolve(newUser);
    }),
    find: jest.fn().mockImplementation(() => Promise.resolve(users)),
    findOneOrFail: jest.fn().mockImplementation((query) => {
      const {
        where: { username },
      } = query;
      const resultUser = users.find((user) => user.username === username);
      return Promise.resolve(resultUser);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return that', async () => {
    const newUser = await service.create({
      username: 'pepe',
      password: 'lasdfsa',
    });
    expect(newUser).toEqual({
      id: 3,
      username: 'pepe',
      password: 'lasdfsa',
    });
  });

  it('should findAll users and return that', async () => {
    const allUsers = await service.findAll();
    expect(allUsers.length).toEqual(2);
  });

  it('should findOne user and return that', async () => {
    const resultUser = await service.findOne('peter');
    expect(resultUser.id).toEqual(2);
  });
});
