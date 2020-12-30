import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDto } from "./create-movie.dto";

// export class UpdateMovieDto {
//     @IsString()
//     readonly title?: string;

//     @IsNumber()
//     readonly year?: number;

//     @IsString({each: true}) //each 옵션은 하나씩 다 체크하겠다는 것 
//     readonly genres?: string[]
// }
// // // ? 넣어줘서 optional로 준다.  -> Make them not required 


//Partial Type 
// PartialType은 BaseType이 필요하다. 
// UpdateMovieDto는 CreateMovieDto와 같은데 전부 필수사항이 아니라는 것만 다르다. 
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
