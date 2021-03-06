import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity'

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id);
        if(!movie) {
            throw new NotFoundException(`Movie with ${id} not found.`); //Nest.js에서 제공하는 예외처리 
        }
        return movie;
    }

    deleteOne(id: number) {
        this.getOne(id); // Error가 없으면 정상 
        this.movies = this.movies.filter(movie => movie.id !== id); //해당 id영화 삭제 
    }

    create(movieData: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length+1, 
            ...movieData
        });
    }

    update(id: number, updateData: UpdateMovieDto) {
        const movie = this.getOne(id); //기존 데이터 백업
        this.deleteOne(id); // 기존 데이터 삭제 
        this.movies.push({...movie, ...updateData}); //기존 데이터에 업데이트 데이터 덮어쓰기 
    }
}
