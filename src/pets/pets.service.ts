import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  async findAll(): Promise<Pet[]> {
    const pet = new Pet();
    pet.id = 2;
    pet.name = 'pancho';
    return [pet];
  }
}
