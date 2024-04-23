import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { IListItems } from '../../interface/IListitems.interface';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss',
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);
//ele pega o child com essa variavel do child HTML
  @ViewChild('inputText') public inputText!: ElementRef;
  @Output() public outPutListItems = new EventEmitter<IListItems>();

  public focusAndAddItem(value: string) {
    if (value) {
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = "";

      const dataAtual = new Date();
      const timeStamp = dataAtual.getTime();
      const id = `ID ${timeStamp}`

      this.outPutListItems.emit({
        id,
        checked:false,
        value
      })
      return this.inputText.nativeElement.focus();
    }
  }
}
