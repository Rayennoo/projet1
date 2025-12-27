import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionproduitsComponent } from './gestionproduits.component';

describe('GestionproduitsComponent', () => {
  let component: GestionproduitsComponent;
  let fixture: ComponentFixture<GestionproduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionproduitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionproduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
