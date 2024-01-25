import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreDataComponent } from './core-data.component';

describe('CoreDataComponent', () => {
  let component: CoreDataComponent;
  let fixture: ComponentFixture<CoreDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoreDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
