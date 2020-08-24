import { Component, EventEmitter, Input, Output } from '@angular/core';
import { defaultColors } from "../../../other/variables";

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {

  @Input() heading: string;
  @Input() color: string;
  @Output() selectColorEmitter = new EventEmitter<string>();

  public defaultColors: string[] = defaultColors;

  selectColor(color: string) {
    this.selectColorEmitter.emit(color);
  }

}
