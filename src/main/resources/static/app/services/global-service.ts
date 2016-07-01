import { Injectable } from '@angular/core'
import { User } from './data'

export class Subscription {
  constructor(private manager: EventManager,
              private func: Function) {
  }

  unsubscribe() {
    this.manager.unsubcribe(this.func)
  }

}


///
/// the event manager
export class EventManager {

  /// subcribers
  listeners = []

  /// emit event
  emit(data: any) {
    // call subcriber
    for (var listener of this.listeners) {
      listener(data)
    }
  }

  /// subcribe the event 
  subcribe(listener: Function) {
    this.listeners.push(listener)
    return new Subscription(this, listener)
  }

  /// unsubcribe
  unsubcribe(listener: Function) {
    var index = this.listeners.indexOf(listener)
    if (index > 0) {
      this.listeners.splice(index, 0)
    }
  }
}

@Injectable()
export class GlobalService {

  /// current logged in user
  currentUser: User

  /// list of channel
  channels = {}

  /// get event channel
  channel(name: string) {
    if (!this.channels[name]) {
      this.channels[name] = new EventManager()
    }

    return this.channels[name] as EventManager
  }

}