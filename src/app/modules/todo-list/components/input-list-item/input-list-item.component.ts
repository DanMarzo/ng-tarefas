import { Component, Input } from '@angular/core';
import { IListItems } from '../../interface/IListitems.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [NgFor],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {
    @Input({required: true}) public inputListItems: Array<IListItems> = [];

}
