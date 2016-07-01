import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Challenge, Reply, Solution } from './data'

@Injectable()
export class ChallengeService {

  /// constructor of the user service
  constructor(private http: Http) {
  }

  /// save the challege
  save(challenge: Challenge) {
    return this.http.post("/challenge", JSON.stringify(challenge))
  } 

  // post a reply
  addReply(challenge: Challenge, reply: Reply) {
    return this.http.post('/challenge/' + challenge.id + '/reply', JSON.stringify(reply))
  }

  // test a solution
  testSolution(challenge: Challenge, solution: Solution, submit: boolean) {
    var url = '/challenge/' + challenge.id + '/test';

    if (submit) {
      url  = '/challenge/' + challenge.id + '/submit'
    }

    return this.http.post(url, JSON.stringify(solution))
  }

  /// get latest challeges
  getLatest() {
    return this.http.get("/challenge/feed")
  }
}