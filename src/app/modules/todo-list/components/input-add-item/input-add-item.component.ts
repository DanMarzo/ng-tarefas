import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IListItems } from '../../interface/IListitems.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss',
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);
  //ele pega o child com essa variavel do child HTML
  @ViewChild('inputText') public inputText!: ElementRef;
  /**
   * O @output e eventemitr quer dizer que a aquele component esta enviando determinada informacao
   */
  @Input({required: true}) public inputListItems: Array<IListItems> = [];
  @Output() public oututAddListItems = new EventEmitter<IListItems>();


  public focusAndAddItem(value: string) {
    if (value) {
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = "";
      const dataAtual = new Date();
      const timeStamp = dataAtual.getTime();
      const id = `ID ${timeStamp}`

      this.oututAddListItems.emit({
        id,
        checked:false,
        value
      })
      return this.inputText.nativeElement.focus();
    }
  }
}
