import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDentistaComponent } from './admin-dentista.component';

describe('AdminDentistaComponent', () => {
  let component: AdminDentistaComponent;
  let fixture: ComponentFixture<AdminDentistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDentistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDentistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
