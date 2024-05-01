import { JsonPipe, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItems } from '../../interface/IListitems.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgIf, InputAddItemComponent, JsonPipe],
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
}
