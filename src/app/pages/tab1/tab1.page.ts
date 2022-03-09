import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article } from '../../interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public articles: Article[] = [];
  //El static true sirve para no caer el error en que en primera instancia este undefained.
  @ViewChild( IonInfiniteScroll, { static : true } ) infiniteScroll: IonInfiniteScroll;

  constructor(
    private _newsService: NewsService
  ) {}

  ngOnInit(){
    this.getBusiness();
  }

  public loadData(){
    this.getBusiness( 'business', true, true );
  }

  private getBusiness( category: string = 'business', loadMore: boolean = false, isEndScroll: boolean = false ){

    this._newsService.getTopHeadlinesByCategory( category, loadMore ).subscribe(
      articles => {
        this.articles = [ ...articles ];

        if( isEndScroll ){
          setTimeout( ()=>{
            this.infiniteScroll.complete();
          }, 1000 );
        }

      },
      error => {
        this.infiniteScroll.complete();
      }
    );
  }


}
