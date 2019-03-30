import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  charcterType: string;
  range: number;
  movie: string;
  url = "https://gateway.marvel.com/v1/public/characters?ts=100&apikey=5c451b99688834a75445b41580903c67&hash=990c60a797e7f015e6e354ab6b016739";
  orderbY: string;
  constructor(private _http: HttpClient, private _router: Router) { }
  getData(offset) {
    this.url = this.url.split("offset")[0];
    this.url = this.url + "&offset=" + offset;
    return this._http.get(this.url);
  }
  setFilter(charcterType: string, range: number, movie: string, orderby: string, category: string) {
    this.url = "https://gateway.marvel.com/v1/public/" + category + "?ts=100&apikey=5c451b99688834a75445b41580903c67&hash=990c60a797e7f015e6e354ab6b016739&limit=" + range;
    this._router.navigateByUrl('/tabs');
    console.log(charcterType, range, movie, orderby);
    console.log(this.url);
  }
  getDataByCat(category: string,offset:number) {
    this.url = "https://gateway.marvel.com/v1/public/" + category + "?ts=100&apikey=5c451b99688834a75445b41580903c67&hash=990c60a797e7f015e6e354ab6b016739"+"&offset="+offset;
    return this._http.get(this.url);
  }
}
