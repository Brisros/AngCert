import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-auto',
  templateUrl: './dropdown-auto.component.html',
  styleUrls: ['./dropdown-auto.component.css'],
})
export class DropdownAutoComponent {
  @Input() items: any[] = [];
  @Input() searchPlaceholder: string = '';
  @Output() selectedItem: EventEmitter<any> = new EventEmitter();
  filteredItems: any[] = [];
  searchTerm: string = '';
  displayDropdown: boolean = false;

  search(event: any): void {
    this.displayDropdown = true;
    this.filteredItems = [];
    this.items.forEach((item) => {
      const currentItem = item.name.toLowerCase();
      const currentSearchTerm = this.searchTerm.toLowerCase();
      if (currentItem.includes(currentSearchTerm)) {
        this.filteredItems.push(item);
      }
    });
  }

  selectItem(event: any): void {
    this.displayDropdown = false;
    this.searchTerm = event.name;
    this.selectedItem.emit(event);
  }
}
