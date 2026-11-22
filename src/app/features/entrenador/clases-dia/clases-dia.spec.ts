import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClasesDia } from './clases-dia';

describe('ClasesDia', () => {
  let component: ClasesDia;
  let fixture: ComponentFixture<ClasesDia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasesDia],
    }).compileComponents();

    fixture = TestBed.createComponent(ClasesDia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
