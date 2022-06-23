import { Test, TestingModule } from '@nestjs/testing';

import { Owner } from './entities/owner.entity';
import { OwnersResolver } from './owners.resolver';
import { OwnersService } from './owners.service';

describe('OwnersResolver', () => {
  let resolver: OwnersResolver;

  const owners: Owner[] = [
    {
      id: 1,
      firstName: 'peter',
      lastName: 'sdfs',
    },
  ];
  const mockOwnerService = {
    createOwner: jest.fn((dto) => {
      const newOwner = {
        id: Date.now(),
        ...dto,
      };
      owners.push(newOwner);
      return newOwner;
    }),
    // update: jest.fn((id, dto) => ({
    //   id,
    //   ...dto,
    // })),
    // se puede hacer de las 2 maneras
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
    })),
    // findAll: jest.fn().mockImplementation(() => owners),
    findAll: jest.fn(() => owners),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnersResolver, OwnersService],
    })
      .overrideProvider(OwnersService)
      .useValue(mockOwnerService)
      .compile();

    resolver = module.get<OwnersResolver>(OwnersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a owner', () => {
    expect(
      resolver.createOwner({ firstName: 'gula', lastName: 'val' }),
    ).toEqual({
      id: expect.any(Number),
      firstName: 'gula',
      lastName: 'val',
    });

    expect(mockOwnerService.createOwner).toHaveBeenCalled();
  });

  it('should update a owner', () => {
    expect(resolver.updateOwner({ id: 3, firstName: 'paul' })).toEqual({
      id: 3,
      firstName: 'paul',
    });
    expect(mockOwnerService.update).toHaveBeenCalledWith(3, {
      id: 3,
      firstName: 'paul',
    });
  });

  it('should return all owners', async () => {
    const allOwners = await resolver.owners();
    expect(allOwners.length).toBe(2);
  });
});
