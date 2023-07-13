import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Category } from '../data.models';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.currentOption = '';
    }
  }
  @Input() categories: Category[] | null = [];
  @Input() defaultOption: string = 'Select Option';
  @Output() selectedOption: EventEmitter<Category> = new EventEmitter();
  currentOption: Category | string = '';

  mapSelectedData(): void {
    this.selectedOption.emit(this.currentOption as Category);
  }
}
