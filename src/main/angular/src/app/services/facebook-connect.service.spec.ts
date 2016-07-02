/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { FacebookConnectService } from './facebook-connect.service';

describe('FacebookConnect Service', () => {
  beforeEachProviders(() => [FacebookConnectService]);

  it('should ...',
      inject([FacebookConnectService], (service: FacebookConnectService) => {
    expect(service).toBeTruthy();
  }));
});
