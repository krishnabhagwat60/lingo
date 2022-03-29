import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeFirstComponentFunction = new EventEmitter();
  invokeMenuList = new EventEmitter();
  loadedCategoryList = new EventEmitter();
  invokeProfileChange = new EventEmitter();

  categoryMover = new EventEmitter();
  subsVar: Subscription;
  menubar: any;

  constructor() { }

  onFirstComponentButtonClick(Menu) {
    this.invokeFirstComponentFunction.emit(Menu == undefined || Menu == null ? null : Menu);
  }
  

  onMenuChanged() {
    this.invokeMenuList.emit();
  }
  onProfileChanged() {
    this.invokeProfileChange.emit();
  }
  
  onCategoryLoaded() {
    this.loadedCategoryList.emit();
  }
  
  CategoryTomenulist(Menu) {
    this.menubar = Menu;
    this.categoryMover.emit(Menu);
  }

}
