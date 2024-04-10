import { IsNotEmpty, IsString } from "class-validator";

export class addTodoDto {
    @IsString() //pipe validator
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}