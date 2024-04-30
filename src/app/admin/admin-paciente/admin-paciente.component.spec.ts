import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPacienteComponent } from './admin-paciente.component';

describe('AdminPacienteComponent', () => {
  let component: AdminPacienteComponent;
  let fixture: ComponentFixture<AdminPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
