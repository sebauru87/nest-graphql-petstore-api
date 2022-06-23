import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Owner } from '../owners/entities/owner.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;

  @Column()
  @Field(() => Int)
  ownerId: number;

  @ManyToOne(() => Owner, (owner) => owner.pets, { onDelete: 'CASCADE' }) // si elimina owner, se borra todos los pets
  @Field(() => Owner)
  owner: Owner;

  @CreateDateColumn()
  createdDate: Date;
}
