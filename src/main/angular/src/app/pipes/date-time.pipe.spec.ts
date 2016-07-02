/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { DateTimePipe } from './date-time.pipe';

describe('Pipe: DateTime', () => {
  it('create an instance', () => {
    let pipe = new DateTimePipe();
    expect(pipe).toBeTruthy();
  });
});
