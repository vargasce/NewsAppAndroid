import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/index'; 
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Platform, ActionSheetButton } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

    @Input() article: Article;
    @Input() indice: number;

    constructor(
        private _appBrowser: InAppBrowser,
        private _socialShare: SocialSharing,
        private platform: Platform,
        private actionSheetController: ActionSheetController,
        private _storageService: StorageService
    ) { }

    ngOnInit() {}

    public async onOpenMenu(){

        const articleIsFavorite = this._storageService.articleInFavorite( this.article );

        const bottoms: ActionSheetButton[] =
        [
            {
                text: articleIsFavorite ? 'Remove Favorite' : 'Favorito',
                icon: articleIsFavorite ? 'heart' : 'heart-outline',
                handler: ()=> this.onToggleFavorite()
            },
            {
                text: 'Cancelar',
                icon: 'close-outline',
                role: 'cancel'
            }
        ]
        
        const share = {
            text: 'Compartir',
            icon: 'share-outline',
            handler: ()=> this.onShareArticle()
        };

        if( this.platform.is('capacitor')){
            bottoms.unshift( share );
        }

        const actionSheet = await this.actionSheetController.create({
            header: 'Options',
            buttons: bottoms         
        });

        await actionSheet.present();
    }

    // EVENTS ON OPEN MENU ACTION SHEET
    public onShareArticle(){

        const { title, source, url } = this.article;
        
        this._socialShare.share(
            title,
            source.name,
            null,
            url
        );

    }

    public onToggleFavorite(){
        this._storageService.saveRemoveArticle( this.article );
    }

    /** OPEN BROWSER
     * @Observations => Abre articulo en el navegador del dispositivo
     */
    public openArticle(){

        if( this.platform.is("ios") || this.platform.is("android") ){
            const browser = this._appBrowser.create( this.article.url );
            browser.show();
            return;
        }

        window.open( this.article.url, '_blank' );

    }

}
