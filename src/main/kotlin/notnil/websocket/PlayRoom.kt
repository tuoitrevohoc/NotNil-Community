package notnil.websocket

import org.springframework.web.socket.WebSocketSession
import java.util.*

/**
 * a play room
 */

class PlayRoom (
        public val id: String
) {

    /**
     * list of members
     */
    private val members = ArrayList<WebSocketSession>()

    private var code: String = ""

    /**
     * add a member
     */
    fun add(member: WebSocketSession) {
        members.add(member)

        if (members.count() > 1) {
            member.send("setCode", code)
        }
    }

    /**
     * remove a member
     */
    fun remove(member: WebSocketSession) {
        members.remove(member)
    }

    /**
     * is empty
     */
    fun empty(): Boolean {
        return members.isEmpty()
    }

    /**
     * update
     */
    fun update(from: WebSocketSession, name: String, value: String) {
        for (member in members) {
            if (member != from) {
                member.send(name, value)
            }
        }
    }

    /**
     * Set code
     */
    fun setCode(content: String) {
        this.code = content
    }
}