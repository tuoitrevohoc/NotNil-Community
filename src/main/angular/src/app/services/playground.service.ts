import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

@Injectable()
class PlayGroundService {

  /// constructor of the user service
  constructor(private http: Http) {
  }

  /// play a code
  play(code: String) {
    return this.http.post("/api/play", JSON.stringify(code))
  } 
}