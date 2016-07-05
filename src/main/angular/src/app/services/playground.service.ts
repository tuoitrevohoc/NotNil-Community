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

  // on close
  onClose: () => void

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

    if (this.socket) {
      this.socket.send(text)
    }
  }

  /// create the playground  
  create(callBack: (message: Message) => void, onClose: () => void) {
    this.socket = new WebSocket(this.wsUrl)
    this.callBack = callBack
    this.onClose = onClose

    // open
    this.socket.onopen = (event) => {
      this.send(new Message("create"))
    }

    this.socket.onclose = () => {
      this.zone.run(() => this.onClose())
    }

    // event  
    this.socket.onmessage = (event) => {
      this.zone.run(() => this.callBack(JSON.parse(event.data) as Message))
    }

    setInterval(() => {
      this.send(new Message("ping"))
    }, 1000)
  }

  /// create the playground  
  subscribe(id: string, callBack: (message: Message) => void, onClose: () => void) {
    this.socket = new WebSocket(this.wsUrl)
    this.callBack = callBack
    this.onClose = onClose

    // open
    this.socket.onopen = (event) => {
      this.send(new Message("subscribe", id))
    }

    // event  
    this.socket.onmessage = (event) => {
      this.zone.run(() => this.callBack(JSON.parse(event.data) as Message))
    }

    this.socket.onclose = () => {
      this.zone.run(() => this.onClose())
    }

    setInterval(() => {
      this.send(new Message("ping"))
    }, 1000)
  }
}