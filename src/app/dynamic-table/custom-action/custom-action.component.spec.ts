import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomActionComponent } from './custom-action.component';

describe('CustomActionComponent', () => {
  let component: CustomActionComponent;
  let fixture: ComponentFixture<CustomActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
