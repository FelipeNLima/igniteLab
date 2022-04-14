import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Enrollment } from './enrollments';

@ObjectType()
export class Student {
  @Field(() => ID)
  id: string;

  @Field(() => [Enrollment])
  enrollment: Enrollment[];
}