import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public articles: Article[] = [];

  constructor(
    private _newsService: NewsService
  ) {}

  ngOnInit(){
    this._newsService.getTopHeadLines().subscribe(
      articles => {
        console.log( articles );
        this.articles.push( ...articles );
      },
      error =>{
        console.log( error );
      }
    );
  }

}
