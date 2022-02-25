import { Injectable, Injector } from '@angular/core';
import { ServiceService } from '../components/service.service';

@Injectable({
  providedIn: 'root'
})
export class FrontService {

  vm = {
    clientModel: {},
    categoryModel: [],
    itemModel:[],
    selectedCategoryId:0,
    sidebarData:[],
    selectedMenuId:0
  };
  private _clientService: ServiceService;
  public get clientsService(): ServiceService {
    if (this._clientService) { return this._clientService };
    return this._clientService = this.injector.get(ServiceService);
  }
  constructor(private injector: Injector) { }
}
