import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
    //Access to Service 
    constructor(private readonly moviesService: MoviesService) {}

    @Get() 
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    // @Get("search") //search가 @Get(":/id")보다 위에 위치해야 한다. 밑에 있으면 /movies/search가 id로 인식한다. 
    // search(@Query("year") searchingYear: string) {
    //     return `We are searching for a movie made after:  ${searchingYear}`
    // }

    @Get("/:id") 
    getOne(@Param("id") movieId: string): Movie { //파라미터로 id값을 넘기려면 @Param을 써줘야 한다. 
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData) {
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param("id") movieId: string) {
        return this.moviesService.deleteOne(movieId);
    }

    //@Put() - Update Whole Recourse 
    @Patch("/:id")  //Update Part of Resource 
    path(@Param("id") movieId: string, @Body() updateData) {
        return {
            updatedMovie : movieId,
            ...updateData,
        };
    }

}
