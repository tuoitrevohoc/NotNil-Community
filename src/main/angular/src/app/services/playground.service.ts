import { Injectable, NgZone } from '@angular/core'
import { Http } from '@angular/http'

export class Message {

  constructor(public action: string,
            public content: string = ""){}
}

@Injectable()
export class PlayGroundService {

  // the web socket
  socket: WebSocket

  wsUrl = "ws://" + window.location.host + "/api/play/connect"

  zone = new NgZone({ enableLongStackTrace: true })

  // function
  callBack: (message: Message) => void

  /// constructor of the user service
  constructor(private http: Http) {
  }

  /// play a code
  play(code: String) {
    return this.http.post("/api/play", code)
  } 

  /// send message
  send(message: Message) {
    var text = JSON.stringify(message)
    this.socket.send(text)
  }

  /// create the playground  
  create(callBack: (message: Message) => void) {
    this.socket = new WebSocket(this.wsUrl)
    this.callBack = callBack

    // open
    this.socket.onopen = (event) => {
      this.send(new Message("create"))
    }

    // event  
    this.socket.onmessage = (event) => {
      this.zone.run(() => this.callBack(JSON.parse(event.data) as Message))
    }
  }

  /// create the playground  
  subscribe(id: string, callBack: (message: Message) => void) {
    this.socket = new WebSocket(this.wsUrl)
    this.callBack = callBack

    // open
    this.socket.onopen = (event) => {
      this.send(new Message("subscribe", id))
    }

    // event  
    this.socket.onmessage = (event) => {
      this.zone.run(() => this.callBack(JSON.parse(event.data) as Message))
    }
  }
}