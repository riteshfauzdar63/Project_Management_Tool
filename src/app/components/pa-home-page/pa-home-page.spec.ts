import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaHomePage } from './pa-home-page';

describe('PaHomePage', () => {
  let component: PaHomePage;
  let fixture: ComponentFixture<PaHomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaHomePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
