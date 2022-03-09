import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public categories: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  public selectedCategory: string = this.categories[0];
  public articles: Article[] = [];

  //El static true sirve para no caer el error en que en primera instancia este undefained.
  @ViewChild( IonInfiniteScroll, { static : true } ) infiniteScroll: IonInfiniteScroll;

  constructor(
    private _newsService: NewsService
  ){
  }

  ngOnInit(): void {
    this.getByCategory( this.selectedCategory );
  }

  public segmentChanged( event: Event ){
    this.selectedCategory = ( event as CustomEvent ).detail.value;
    this.getByCategory( this.selectedCategory );
  }

  private getByCategory( category: string, loadMore: boolean = false, isEndScroll: boolean = false ){

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

  public loadData( ){
    this.getByCategory( this.selectedCategory, true, true );
  }

}
