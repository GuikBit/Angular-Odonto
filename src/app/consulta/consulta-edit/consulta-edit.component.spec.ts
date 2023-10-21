import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEditComponent } from './consulta-edit.component';

describe('ConsultaEditComponent', () => {
  let component: ConsultaEditComponent;
  let fixture: ComponentFixture<ConsultaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
