import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Article } from '../../interfaces/index';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

    constructor(
        private _storageService: StorageService
    ) {}


    public ngOnInit():void{

    }

    get articles():Article[]{
        return this._storageService.getLocalArticles;
    }
}
