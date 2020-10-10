import { PartialType } from '@nestjs/mapped-types';
import { CreatePdfFileInput } from './create-pdf-file.input';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePdfFileInput extends PartialType(CreatePdfFileInput) {
  @Field(() => Int)
  id: number;
}