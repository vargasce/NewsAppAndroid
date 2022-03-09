import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NewsResponse, Article, ArticlesByCategoryAndPage } from '../interfaces/index';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = { }

  constructor(
    private _http: HttpClient
  ) { }


  public getTopHeadLines( country: string = 'ar'):Observable<Article[]>{
    return this._http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?category=business`, {
      params : { apiKey, country }
    }).pipe(
      map( data => data.articles )
    );
  }

  public getTopHeadlinesByCategory( category: string, loadMore: boolean, country: string = 'ar' ):Observable<Article[]>{

    if( loadMore ){
      return this.getArticlesByCategory( category, country );
    }

    if( this.articlesByCategoryAndPage[category] ){
      return of( this.articlesByCategoryAndPage[category].articles );
    }

    return this.getArticlesByCategory( category, country );
  }


  private getArticlesByCategory( category: string, country: string ):Observable<Article[]>{

    if( !( Object.keys(this.articlesByCategoryAndPage).includes(category) )){
      this.articlesByCategoryAndPage[category] = {
        page : 0,
        articles : []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page += 1;
    
    return this._http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?`, {
      params : { apiKey, category, country, page }
    }).pipe(
      map( ({ articles }) => {

        if( articles.length == 0 ) return this.articlesByCategoryAndPage[category].articles;

        this.articlesByCategoryAndPage[category] = {
          page: page,
          articles: [ ...this.articlesByCategoryAndPage[category].articles, ...articles ]
        }

        return this.articlesByCategoryAndPage[category].articles;
      })
    );

  }

}
