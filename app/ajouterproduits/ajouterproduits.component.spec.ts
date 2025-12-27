import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterproduitsComponent } from './ajouterproduits.component';

describe('AjouterproduitsComponent', () => {
  let component: AjouterproduitsComponent;
  let fixture: ComponentFixture<AjouterproduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterproduitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterproduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
