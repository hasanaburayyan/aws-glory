import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsTableComponent } from './achievements-table.component';

describe('AchievementsTableComponent', () => {
  let component: AchievementsTableComponent;
  let fixture: ComponentFixture<AchievementsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchievementsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
