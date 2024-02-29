import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PciphpapplicableprojectmodifyComponent } from './pciphpapplicableprojectmodify.component';

describe('PciphpapplicableprojectmodifyComponent', () => {
  let component: PciphpapplicableprojectmodifyComponent;
  let fixture: ComponentFixture<PciphpapplicableprojectmodifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PciphpapplicableprojectmodifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PciphpapplicableprojectmodifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
