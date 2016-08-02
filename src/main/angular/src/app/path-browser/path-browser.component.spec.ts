/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { PathBrowserComponent } from './path-browser.component';

describe('Component: PathBrowser', () => {
  it('should create an instance', () => {
    let component = new PathBrowserComponent();
    expect(component).toBeTruthy();
  });
});
