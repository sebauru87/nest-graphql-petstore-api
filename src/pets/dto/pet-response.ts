import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Owner } from '../../owners/entities/owner.entity';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
export class PetResponse {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;

  @Field(() => Int)
  ownerId: number;

  @ManyToOne(() => Owner, (owner) => owner.pets, { onDelete: 'CASCADE' }) // si elimina owner, se borra todos los pets
  @Field(() => Owner)
  owner: Owner;

  @Field()
  createdDate: Date;
}
