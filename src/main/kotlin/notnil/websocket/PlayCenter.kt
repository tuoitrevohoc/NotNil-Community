package notnil.websocket

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler
import java.util.*

/**
 * The play center
 */
class PlayCenter: TextWebSocketHandler() {

    /**
     * look up table
     */
    val lookUpSession = HashMap<WebSocketSession, PlayRoom>()

    /**
     * all rooms
     */
    val lookUpRoom = HashMap<String, PlayRoom>()


    override fun afterConnectionEstablished(session: WebSocketSession?) {
        super.afterConnectionEstablished(session)
    }


    /**
     * Handle text message
     */
    override fun handleTextMessage(session: WebSocketSession?, textMessage: TextMessage?) {
        val message = parseMessage(textMessage)
        if (message.action != "ping") {
            if (lookUpSession.containsKey(session)) {
                val room = lookUpSession[session]

                if (session === room?.owner) {
                    if (message.action == "update") {
                        room?.updateCode(message.content)
                    } else {
                        room?.update(message.action, message.content)
                    }
                }

            } else {
                if (message.action == "create") {
                    val id = UUID.randomUUID().toString().substring(0, 10)
                    val room = PlayRoom(id, session!!)

                    lookUpSession[session] = room
                    lookUpRoom[id] = room

                    session.send("ok", id)
                } else if (message.action == "subscribe") {
                    val id = message.content
                    val room = lookUpRoom[id]

                    room?.add(session!!)
                }
            }
        } else {
            session!!.send("pong", "")

        }
    }

    /**
     * after connection closed
     */
    override fun afterConnectionClosed(session: WebSocketSession?, status: CloseStatus?) {
        val room = lookUpSession[session]

        room?.remove(session!!)
        lookUpSession.remove(session)

        if (room != null && room.empty()) {
            lookUpRoom.remove(room.id)
        }
    }


    /**
     * parse message content
     */
    private fun parseMessage(textMessage: TextMessage?): Message {
        val mapper = ObjectMapper()
        return mapper.readValue(textMessage!!.payload, Message::class.java)
    }
}