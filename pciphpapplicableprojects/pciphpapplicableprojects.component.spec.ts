import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PciphpapplicableprojectsComponent } from './pciphpapplicableprojects.component';

describe('PciphpapplicableprojectsComponent', () => {
  let component: PciphpapplicableprojectsComponent;
  let fixture: ComponentFixture<PciphpapplicableprojectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PciphpapplicableprojectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PciphpapplicableprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
