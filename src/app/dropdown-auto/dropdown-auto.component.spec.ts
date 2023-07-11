import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownAutoComponent } from './dropdown-auto.component';

describe('DropdownAutoComponent', () => {
  let component: DropdownAutoComponent;
  let fixture: ComponentFixture<DropdownAutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownAutoComponent]
    });
    fixture = TestBed.createComponent(DropdownAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
