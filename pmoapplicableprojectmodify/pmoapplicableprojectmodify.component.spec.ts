import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmoapplicableprojectmodifyComponent } from './pmoapplicableprojectmodify.component';

describe('PmoapplicableprojectmodifyComponent', () => {
  let component: PmoapplicableprojectmodifyComponent;
  let fixture: ComponentFixture<PmoapplicableprojectmodifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmoapplicableprojectmodifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmoapplicableprojectmodifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
