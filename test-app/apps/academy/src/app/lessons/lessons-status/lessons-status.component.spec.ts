import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonsStatusComponent } from './lessons-status.component';

describe('LessonsStatusComponent', () => {
  let component: LessonsStatusComponent;
  let fixture: ComponentFixture<LessonsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
