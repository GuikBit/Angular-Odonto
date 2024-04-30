import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRelatorioComponent } from './admin-relatorio.component';

describe('AdminRelatorioComponent', () => {
  let component: AdminRelatorioComponent;
  let fixture: ComponentFixture<AdminRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRelatorioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
