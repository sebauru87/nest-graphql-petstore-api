import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  // @Field(() => Int)
  // id: number;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}
