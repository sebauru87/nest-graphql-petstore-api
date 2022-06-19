import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownersRepository: Repository<Owner>,
  ) {}

  createOwner(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownersRepository.create(createOwnerInput);
    return this.ownersRepository.save(newOwner);
  }

  findAll(): Promise<Owner[]> {
    return this.ownersRepository.find({ relations: ['pets'] });
  }

  findOne(id: number): Promise<Owner> {
    return this.ownersRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput) {
    // const owner = await this.findOne(id);  este seria findOneOrFail
    const owner = await this.ownersRepository.findOne({
      where: {
        id,
      },
    });
    if (!owner) {
      throw new NotFoundException('owner not found');
    }
    Object.assign(owner, updateOwnerInput);
    return this.ownersRepository.save(owner);
  }

  async remove(id: number) {
    const owner = await this.ownersRepository.findOne({
      where: {
        id,
      },
    });
    if (!owner) {
      throw new NotFoundException('owner not found');
    }
    return this.ownersRepository.remove(owner);
  }

  // async remove(id: string) {
  //   const proj = this.findOne(id);
  //   if (proj) {
  //     const ret = await this.projectRepository.delete(id);
  //     if (ret.affected === 1) {
  //       return proj;
  //     }
  //   }

  // async remove(id: number) {
  //   const user = await this.findOne(id);
  //   if (!user) {
  //     throw new NotFoundException('user not found');
  //   }
  //   return this.repo.remove(user);
  // }
}
