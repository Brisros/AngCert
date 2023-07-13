import { Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { GenericItem } from '../data.models';

@Component({
  selector: 'app-dropdown-auto',
  templateUrl: './dropdown-auto.component.html',
  styleUrls: ['./dropdown-auto.component.css'],
})
export class DropdownAutoComponent<T> {
  @Input() items: GenericItem<T>[] = [];
  @Input() searchPlaceholder: string = '';
  @Output() selectedItem: EventEmitter<GenericItem<T>> = new EventEmitter();
  filteredItems: any[] = [];
  searchTerm: string = '';
  displayDropdown: boolean = false;

  search(): void {
    this.displayDropdown = true;
    this.filteredItems = [];
    this.items.forEach((item) => {
      const currentItem = (item.name as string).toLowerCase();
      const currentSearchTerm = this.searchTerm.toLowerCase();
      if (currentItem.includes(currentSearchTerm)) {
        this.filteredItems.push(item);
      }
    });
  }

  selectItem(event: GenericItem<T>): void {
    this.displayDropdown = false;
    this.searchTerm = event.name as string;
    this.selectedItem.emit(event);
  }
}
