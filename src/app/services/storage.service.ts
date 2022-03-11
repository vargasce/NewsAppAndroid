import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private _storage: Storage | null = null;
    private _localArticles: Article[] = [];

    constructor(
        private storage: Storage
    ) {
        this.init();
    }

    get getLocalArticles():Article[]{
        return [ ...this._localArticles ];
    }

    async init() {
        const storage = await this.storage.create();
        this._storage = storage;
        this.loadFavorites();
    }

    public set(key: string, value: any) {
        this._storage?.set(key, value);
    }

    /** GUARDAR O REMOVER ARTICULO DE FAVORITOS
     * @Observations => Guarda o remueve segun corresponda un elemento article de lista favoritos
     * @param { Article } article => Objeto article a procesar.
     * @returns { void } 
     */
    public async saveRemoveArticle( article: Article ){

        const exist = this._localArticles.find( localArticle => localArticle.title === article.title );

        if( exist != null ){
            this._localArticles = this._localArticles.filter( localArticle => localArticle.title !== article.title );
        }else{
            this._localArticles = [ article, ...this._localArticles ];
        }

        this._storage.set('articles', this._localArticles );
    }

    /** OBTENER ARTICLES.
     * @Observations => Retorna lista de articulos ffavoritos
     * @returns { Article[] }
     */
    public async loadFavorites(){

        try{

            const articles: Article[] = await this._storage.get('articles');
            this._localArticles = articles || [];

        }catch( _error ){

        }

    }


    /** ARTICLE IN FAVORITE
     * @Observations => Retorna TRUE or FALSE, su existe en favoritos el articulo enviado por parametro
     * @param { Article } article => Objeto articulo a evaluar, por titulo.
     * @returns { booleand } => TRUE or FALSE
     */
    public articleInFavorite( article: Article ){
        return !!this._localArticles.find( localArticle => localArticle.title === article.title );
    }
}
