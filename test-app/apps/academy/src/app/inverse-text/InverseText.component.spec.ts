import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InverseTextComponent } from './InverseText.component';

describe('InverseTextComponent', () => {
  let component: InverseTextComponent;
  let fixture: ComponentFixture<InverseTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InverseTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InverseTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
