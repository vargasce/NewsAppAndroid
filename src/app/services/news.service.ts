import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NewsResponse, Article } from '../interfaces/index';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private _http: HttpClient
  ) { }

  public getTopHeadLines():Observable<Article[]>{
    return this._http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=ar&category=business`, {
      params : { apiKey }
    }).pipe(
      map( data => data.articles )
    );
  }

}
