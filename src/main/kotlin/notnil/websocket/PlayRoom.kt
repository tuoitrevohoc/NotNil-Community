package notnil.websocket

import org.springframework.web.socket.WebSocketSession
import java.util.*

/**
 * a play room
 */

class PlayRoom (
        public val id: String,
        public var owner: WebSocketSession?
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

        member.send("update", code)
    }

    /**
     * remove a member
     */
    fun remove(member: WebSocketSession) {
        if (member == owner) {
            owner = null
        }

        members.remove(member)
    }

    /**
     * is empty
     */
    fun empty(): Boolean {
        return members.isEmpty() && owner == null
    }

    /**
     * update code
     */
    fun updateCode(code: String) {
        for (member in members) {
            member.send("update", code)
        }

        this.code = code
    }

    /**
     * update
     */
    fun update(name: String, value: String) {
        for (member in members) {
            member.send(name, value)
        }
    }
}