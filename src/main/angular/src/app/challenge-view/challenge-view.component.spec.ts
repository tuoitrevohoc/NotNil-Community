/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ChallengeViewComponent } from './challenge-view.component';

describe('Component: ChallengeView', () => {
  it('should create an instance', () => {
    let component = new ChallengeViewComponent(null, null);
    expect(component).toBeTruthy();
  });
});
