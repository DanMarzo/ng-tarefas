import { JsonPipe, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItems } from '../../interface/IListitems.interface';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgIf, InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  public addItem = signal<boolean>(true);

  #setListItens = signal<Array<IListItems>>(this.#parseItems());
  public getListItens = this.#setListItens.asReadonly();

  #parseItems() {
    return JSON.parse(localStorage.getItem('@my-list') ?? '[]');
  }
  public getInputAndAddItem(value: IListItems) {
    localStorage.setItem(
      '@my-list',
      JSON.stringify([...this.#setListItens(), value])
    );
    return this.#setListItens.set(this.#parseItems());
  }

  public listItemsStage(value:'pending'| 'complete'){
    return this.getListItens().filter((res:IListItems)=>{
      if(value === 'pending'){
        return !res.checked;
      }
      if(value == 'complete'){
        return res.checked;
      }
      return res;
    })
  }


  public deleteAllItems(){
    localStorage.removeItem("@my-list")
    return this.#setListItens.set(this.#parseItems());
  }

}
