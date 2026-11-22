import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaseLista } from './pase-lista';

describe('PaseLista', () => {
  let component: PaseLista;
  let fixture: ComponentFixture<PaseLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaseLista],
    }).compileComponents();

    fixture = TestBed.createComponent(PaseLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
