import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

// @InputType()
// export class UpdateUserInput extends PartialType(CreateUserInput) {
//   @Field(() => Int)
//   id: number;

//   @Field({ nullable: true })
//   firstName?: string;

//   @Field({ nullable: true })
//   lastName?: string;
// }

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}
