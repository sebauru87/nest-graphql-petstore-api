import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  let fakeUsersService: Partial<UsersService>;
  // let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (username: string) => {
        return Promise.resolve({
          id: 2,
          username,
          password: 'asdf',
        } as User);
      },
      // find: (email: string) => {
      //   return Promise.resolve([{ id: 1, email, password: 'asdf' } as User]);
      // },
      // remove: () => {},
      // update: () => {},
      findAll: () => {
        return Promise.resolve([
          { id: 1, username: 'ad@ad.com', password: 'asdf' } as User,
        ]);
      },
      create: (createUserInput) => {
        return Promise.resolve({
          id: 3,
          username: createUserInput.username,
          password: createUserInput.password,
        } as User);
      },
    };
    // fakeAuthService = {
    //   // signup: () => {},
    //   signin: (email: string, password: string) => {
    //     return Promise.resolve({ id: 1, email, password } as User);
    //   },
    // };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersResolver],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        // {
        //   provide: AuthService,
        //   useValue: fakeAuthService,
        // },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  // it('findAllUsers returns a list of users with the given email', async () => {
  //   const users = await resolver.findAllUsers('asdf@asdf.com');
  //   expect(users.length).toEqual(1);
  //   expect(users[0].email).toEqual('asdf@asdf.com');
  // });

  it('findUser returns a single user with the given username', async () => {
    const user = await resolver.findOne('ad@ad.com');
    expect(user).toBeDefined();
  });

  it('findUser return null if user with given username is not found', async () => {
    fakeUsersService.findOne = () => null;
    const user = await resolver.findOne('asda');
    expect(user).toBe(null);
  });

  it('create user returns user', async () => {
    const user = await resolver.createUser({
      username: 'asdf@asdf.com',
      password: 'asdf',
    });

    expect(user.id).toEqual(3);
  });

  it('findAll returns a list of all users ', async () => {
    const context = { req: { user: {} } };
    const users = await resolver.users(context);
    expect(users.length).toEqual(1);
    expect(users[0].username).toEqual('ad@ad.com');
  });
});
