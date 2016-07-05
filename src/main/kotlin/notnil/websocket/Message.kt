package notnil.websocket

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession

/**
 * a message
 */
class Message {
    /**
     * action of the message
     */
    var action: String = ""

    /**
     * content
     */
    var content: String = ""

    /**
     * to string
     */
    override fun toString(): String {
        return ObjectMapper().writeValueAsString(this)
    }
}

/**
 * send a message to web socket session
 */
fun WebSocketSession.send(message: Message) {
    sendMessage(TextMessage(message.toString()))
}

/**
 * send a message to web socket session
 */
fun WebSocketSession.send(action: String, content: String) {
    val message = Message()
    message.action = action
    message.content = content
    send(message)
}