import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly year: number;

    @IsOptional()
    @IsString({each: true}) //each 옵션은 하나씩 다 체크하겠다는 것 
    readonly genres: string[]
}
