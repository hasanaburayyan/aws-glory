import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalSwitchComponent } from './terminal-switch.component';

describe('TerminalSwitchComponent', () => {
  let component: TerminalSwitchComponent;
  let fixture: ComponentFixture<TerminalSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminalSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
