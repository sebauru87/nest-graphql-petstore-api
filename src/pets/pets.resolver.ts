import { Query, Resolver } from '@nestjs/graphql';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';

@Resolver()
export class PetsResolver {
  constructor(private petService: PetsService) {}

  @Query((returns) => [Pet])
  pets(): Promise<Pet[]> {
    return this.petService.findAll();
  }
}
