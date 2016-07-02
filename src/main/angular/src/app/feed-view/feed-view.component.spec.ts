/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { FeedViewComponent } from './feed-view.component';

describe('Component: FeedView', () => {
  it('should create an instance', () => {
    let component = new FeedViewComponent(null, null);
    expect(component).toBeTruthy();
  });
});
