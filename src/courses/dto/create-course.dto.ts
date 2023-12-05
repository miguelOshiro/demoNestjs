import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, IsUrl } from "class-validator";

export class CreateCourseDto {

    @ApiProperty(
        {
            description: 'The age of a cat',
            minimum: 1,
            default: 1,
          }
    )
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    idAuthor: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    cover: string;
}
