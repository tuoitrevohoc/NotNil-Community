package notnil.controller

import notnil.extension.user
import notnil.extension.xor
import notnil.model.User
import notnil.repository.ChallengeRepository
import notnil.repository.ReplyRepository
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController
import java.security.Principal
import java.util.*

/**
 * Controller who controls reply operation
 */
@RequestMapping("/reply")
@RestController open class ReplyController(
        val replyRepository: ReplyRepository,
        val challengeRepository: ChallengeRepository
) {

    /**
     * like a reply
     */
    @RequestMapping("/{replyId}/like", method = arrayOf(RequestMethod.POST))
    fun like(@PathVariable("replyId") replyId: String,
             principal: Principal): ArrayList<User> {
        val reply = replyRepository.findOne(replyId)
        val user = principal.user()

        reply.likes.xor(user)
        replyRepository.save(reply)

        return reply.likes
    }


    /**
     * An user only delete it's member
     */
    @RequestMapping("/{replyId}", method = arrayOf(RequestMethod.DELETE))
    fun delete(@PathVariable("replyId") replyId: String,
               principal: Principal): Boolean {
        val reply = replyRepository.findOne(replyId)
        val user = principal.user()

        if (reply.creator.id.equals(user.id) || user.isAdmin()) {
            val challenge = challengeRepository.findOneByReplies(reply)
            challenge.replies.removeIf { i -> i.id.equals(reply.id) }

            challengeRepository.save(challenge)
            replyRepository.delete(replyId)
        }

        return true
    }

}