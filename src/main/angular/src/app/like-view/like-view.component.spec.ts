/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { LikeViewComponent } from './like-view.component';

describe('Component: LikeView', () => {
  it('should create an instance', () => {
    let component = new LikeViewComponent(null, null);
    expect(component).toBeTruthy();
  });
});
