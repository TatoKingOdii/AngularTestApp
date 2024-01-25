import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiInterfacesComponent } from './api-interfaces.component';

describe('ApiInterfacesComponent', () => {
  let component: ApiInterfacesComponent;
  let fixture: ComponentFixture<ApiInterfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiInterfacesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
