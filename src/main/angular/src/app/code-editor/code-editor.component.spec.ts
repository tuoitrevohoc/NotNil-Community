/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CodeEditorComponent } from './code-editor.component';

describe('Component: CodeEditor', () => {
  it('should create an instance', () => {
    let component = new CodeEditorComponent();
    expect(component).toBeTruthy();
  });
});
