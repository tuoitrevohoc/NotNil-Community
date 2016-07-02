/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { MarkUpPipe } from './mark-up.pipe';

describe('Pipe: MarkUp', () => {
  it('create an instance', () => {
    let pipe = new MarkUpPipe();
    expect(pipe).toBeTruthy();
  });
});
