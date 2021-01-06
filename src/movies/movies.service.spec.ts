import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array", () => {
      
      //beforeEach function에서 service에 MovieService를 담아주었다. 때문에 아래와 같이 service로 바로 함수에 접근 가능하다. 
      const result = service.getAll(); 

      //getAll()이 배열을 return 하는지 테스트 
      expect(result).toBeInstanceOf(Array);
    }) 
  });


  //We can not test getOne function if we don't creat a movie 
  describe("getOne", () => { //movie Service의 create 함수를 통해 Movie 생성 
    
    it("should return a movie", () => {
      service.create({
        title : "Test Movie",
        genres: ["test"],
        year: 2000
      });
      
      const movie = service.getOne(1); //위에서 create한 것 
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    //id가 없을 때 NotFoundException 에러를 잘 처리하는지 테스트 
    it("should throw 404 error", () => {
      try {
        service.getOne(999);  //NotFoundException  발생 
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException); //테스트 
        expect(e.message).toEqual("Movie with 999 not found.")
      }
    })
  })

  describe("deleteOne", () => { //option1 : 성공, option2: 실패 (notfound)
    it("deletes a movie", () => {
      service.create({
        title : "Test Movie",
        genres: ["test"],
        year: 2000
      });

      const beforeMovie = service.getAll().length;
      service.deleteOne(1); 
      const afterMovie = service.getAll().length;
      expect(afterMovie).toBeLessThan(beforeMovie);
    });

    it("should return a 404", () => {
      try {
        service.deleteOne(999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });


  describe("create", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title : "Test Movie",
        genres: ["test"],
        year: 2000
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", () => {
    it("should update a movie", () => {
      service.create({
        title : "Test Movie",
        genres: ["test"],
        year: 2000
      });
      service.update(1, {title: "Updated Test"}); 
      const movie = service.getOne(1);
      expect(movie.title).toEqual("Updated Test")
    });

    it("should return a NotFoundException", () => {
      try {
      service.update(999, {})
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      } 
    })
  });

});
