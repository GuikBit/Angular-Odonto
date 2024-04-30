import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsultaComponent } from './admin-consulta.component';

describe('AdminConsultaComponent', () => {
  let component: AdminConsultaComponent;
  let fixture: ComponentFixture<AdminConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminConsultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
