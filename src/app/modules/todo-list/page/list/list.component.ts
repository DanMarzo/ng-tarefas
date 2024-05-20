import { JsonPipe, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItems } from '../../interface/IListitems.interface';
import { InputListItemComponent } from '../../components/input-list-item/input-list-item.component';
import { ELocalStorage } from '../../enum/ELocalStorage.enum';
import Swal from 'sweetalert2';

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
    return JSON.parse(localStorage.getItem(ELocalStorage.MY_LIST) ?? '[]');
  }
  #updateLocalStorage() {
    return localStorage.setItem(
      ELocalStorage.MY_LIST,
      JSON.stringify(this.#setListItens())
    );
  }

  public getInputAndAddItem(value: IListItems) {
    localStorage.setItem(
      ELocalStorage.MY_LIST,
      JSON.stringify([...this.#setListItens(), value])
    );
    return this.#setListItens.set(this.#parseItems());
  }

  public listItemsStage(value: 'pending' | 'complete') {
    return this.getListItens().filter((res: IListItems) => {
      if (value === 'pending') {
        return !res.checked;
      }
      if (value == 'complete') {
        return res.checked;
      }
      return res;
    });
  }

  public deleteAllItems() {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Nao sera possivel desfazer essa operacao!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, apagar tudo!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(ELocalStorage.MY_LIST);
        return this.#setListItens.set(this.#parseItems());
      }
    });
  }
  public updateItemCheckbox(newItem: { id: string; checked: boolean }) {
    this.#setListItens.update((old: IListItems[]) => {
      old.filter((res) => {
        if (res.id === newItem.id) {
          res.checked = newItem.checked;
          return res;
        }
        return res;
      });
      return old;
    });
    return this.#updateLocalStorage();
  }

  public updateItemText(newItem: { id: string; value: string }) {
    this.#setListItens.update((old: IListItems[]) => {
      old.filter((res) => {
        if (res.id === newItem.id) {
          res.value = newItem.value;
          return res;
        }
        return res;
      });
      return old;
    });
    return this.#updateLocalStorage();
  }

  public deleteItem(id: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Nao sera possivel desfazer essa operacao!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, apagar item!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItens.update((oldValue: Array<IListItems>) => {
          return oldValue.filter((res) => res.id !== id);
        });
        return this.#updateLocalStorage();
      }
    });
  }
}
