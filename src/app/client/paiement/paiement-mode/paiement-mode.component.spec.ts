import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementModeComponent } from './paiement-mode.component';

describe('PaiementModeComponent', () => {
  let component: PaiementModeComponent;
  let fixture: ComponentFixture<PaiementModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaiementModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaiementModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
