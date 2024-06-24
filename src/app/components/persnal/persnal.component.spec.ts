import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersnalComponent } from './persnal.component';

describe('PersnalComponent', () => {
  let component: PersnalComponent;
  let fixture: ComponentFixture<PersnalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersnalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersnalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
