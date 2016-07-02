/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ChallengeService } from './challenge.service';

describe('Challenge Service', () => {
  beforeEachProviders(() => [ChallengeService]);

  it('should ...',
      inject([ChallengeService], (service: ChallengeService) => {
    expect(service).toBeTruthy();
  }));
});
