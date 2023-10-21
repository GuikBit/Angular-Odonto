import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistaEditComponent } from './dentista-edit.component';

describe('DentistaEditComponent', () => {
  let component: DentistaEditComponent;
  let fixture: ComponentFixture<DentistaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentistaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DentistaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
