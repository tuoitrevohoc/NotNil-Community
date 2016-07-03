import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Challenge, Reply, Solution } from './data'

@Injectable()
export class ChallengeService {

  /// constructor of the user service
  constructor(private http: Http) {
  }

  // get the challenge
  get(id: string) {
    return this.http.get("/api/challenge/" + id)
  }

  /// save the challege
  save(challenge: Challenge) {
    return this.http.post("/api/challenge", JSON.stringify(challenge))
  } 

  /// delete a challenge
  deleteChallenge(challenge: Challenge) {
    return this.http.delete("/api/challenge/" + challenge.id)
  }

  /// delete a reply
  deleteReply(reply: Reply) {
    return this.http.delete("/api/reply/" + reply.id)
  }

  // post a reply
  addReply(challenge: Challenge, reply: Reply) {
    return this.http.post('/api/challenge/' + challenge.id + '/reply', JSON.stringify(reply))
  }

  // test a solution
  testSolution(challenge: Challenge, solution: Solution, submit: boolean) {
    var url = '/api/challenge/' + challenge.id + '/test';

    if (submit) {
      url  = '/api/challenge/' + challenge.id + '/submit'
    }

    return this.http.post(url, JSON.stringify(solution))
  }

  /// get latest challeges
  getLatest() {
    return this.http.get("/api/challenge/feed")
  }
}