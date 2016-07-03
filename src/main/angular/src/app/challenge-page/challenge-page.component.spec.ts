/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ChallengePageComponent } from './challenge-page.component';

describe('Component: ChallengePage', () => {
  it('should create an instance', () => {
    let component = new ChallengePageComponent(null, null);
    expect(component).toBeTruthy();
  });
});
