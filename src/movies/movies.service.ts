import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity'

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: string): Movie {
        const movie = this.movies.find(movie => movie.id === parseInt(id));
        if(!movie) {
            throw new NotFoundException(`Movie with ${id} not found.`); //Nest.js에서 제공하는 예외처리 
        }
        return movie;
    }

    deleteOne(id: string) {
        this.getOne(id); // Error가 없으면 정상 
        this.movies.filter(movie => movie.id !== +id); //해당 id영화를 삭제 
    }

    create(movieData) {
        this.movies.push({
            id: this.movies.length+1, 
            ...movieData
        });
    }
}
