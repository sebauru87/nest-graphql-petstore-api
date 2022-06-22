import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';
import { OwnersService } from '../owners/owners.service';
import { Owner } from '../owners/entities/owner.entity';
import { PetResponse } from './dto/pet-response';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    private ownersServive: OwnersService,
  ) {}

  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput);
    return this.petsRepository.save(newPet);
  }

  findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  findOne(id: number): Promise<PetResponse> {
    return this.petsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersServive.findOne(ownerId);
  }
}
