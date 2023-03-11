import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { Hero } from './hero';

describe('HeroService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  const apiErrorStub = {
    error: 'Error: Unknown API Error',
    message: 'API Error'
  };

  const heroesStub = [
    {id: 1, name: "hero1"},
    {id: 2, name: "hero2"}
  ] as Hero[]

  const heroStub = {
    id: 10,
    name: "hero"
  } as Hero

  const apiErrorResponseOptions = { status: 400, statusText: 'Bad Request' };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HeroService}]
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });

  afterEach(async () => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getHeroes()', () => {
    const path = "http://localhost:3000/api/heroes";

    it('should return Hero[]', () => {
      service.getHeroes().subscribe(data => expect(data).toEqual(heroesStub));
      const req = httpTestingController.expectOne(path);
      expect(req.request.method).toEqual('GET');

      req.flush(heroesStub);
    });

    it('should return heroes get api error', () => {
      service.getHeroes().subscribe(
        () => {},
        data => {
          expect(data.error).toEqual(apiErrorStub);
        }
      );

      const req = httpTestingController.expectOne(path);
      req.flush(apiErrorStub, apiErrorResponseOptions);
    });
  });

  describe('getHero()', () => {
    const path = "http://localhost:3000/api/heroes/10";

    it('should return Hero', () => {
      service.getHero(10).subscribe(data => expect(data).toEqual(heroStub));
      const req = httpTestingController.expectOne(path);
      expect(req.request.method).toEqual('GET');

      req.flush(heroStub);
    });

    it('should return hero get api error', () => {
      service.getHero(10).subscribe(
        () => {},
        data => {
          expect(data.error).toEqual(apiErrorStub);
        }
      );

      const req = httpTestingController.expectOne(path);
      req.flush(apiErrorStub, apiErrorResponseOptions);
    });
  });

  describe('updateHero()', () => {
    const path = "http://localhost:3000/api/heroes";

    it('should return Hero', () => {
      service.updateHero(heroStub).subscribe(data => expect(data).toEqual(heroStub));
      const req = httpTestingController.expectOne(path);
      expect(req.request.method).toEqual('PUT');

      req.flush(heroStub);
    });

    it('should return hero put api error', () => {
      service.updateHero(heroStub).subscribe(
        () => {},
        data => {
          expect(data.error).toEqual(apiErrorStub);
        }
      );

      const req = httpTestingController.expectOne(path);
      req.flush(apiErrorStub, apiErrorResponseOptions);
    });
  });

  describe('addHero()', () => {
    const path = "http://localhost:3000/api/heroes";

    it('should return Hero', () => {
      service.addHero(heroStub).subscribe(data => expect(data).toEqual(heroStub));
      const req = httpTestingController.expectOne(path);
      expect(req.request.method).toEqual('POST');

      req.flush(heroStub);
    });

    it('should return hero post api error', () => {
      service.addHero(heroStub).subscribe(
        () => {},
        data => {
          expect(data.error).toEqual(apiErrorStub);
        }
      );

      const req = httpTestingController.expectOne(path);
      req.flush(apiErrorStub, apiErrorResponseOptions);
    });
  });

  describe('deleteHero()', () => {
    const path = "http://localhost:3000/api/heroes/10";

    it('should return Hero', () => {
      service.deleteHero(10).subscribe(data => expect(data).toEqual(heroStub));
      const req = httpTestingController.expectOne(path);
      expect(req.request.method).toEqual('DELETE');

      req.flush(heroStub);
    });

    it('should return hero delete api error', () => {
      service.deleteHero(10).subscribe(
        () => {},
        data => {
          expect(data.error).toEqual(apiErrorStub);
        }
      );

      const req = httpTestingController.expectOne(path);
      req.flush(apiErrorStub, apiErrorResponseOptions);
    });
  });

  describe('searchHeroes()', () => {
    const path = "http://localhost:3000/api/heroes/?name=someHero";

    it('should return Hero[]', () => {
      service.searchHeroes("someHero").subscribe(data => expect(data).toEqual(heroesStub));
      const req = httpTestingController.expectOne(path);
      expect(req.request.method).toEqual('GET');

      req.flush(heroesStub);
    });

    it('should return heroes get api error', () => {
      service.searchHeroes("someHero").subscribe(
        () => {},
        data => {
          expect(data.error).toEqual(apiErrorStub);
        }
      );

      const req = httpTestingController.expectOne(path);
      req.flush(apiErrorStub, apiErrorResponseOptions);
    });
  });

});
