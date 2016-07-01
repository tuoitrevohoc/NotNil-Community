package notnil.repository

import notnil.model.Challenge
import notnil.model.Reply
import org.springframework.data.domain.Sort
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

/**
 * The problem repository
 */
interface ChallengeRepository : MongoRepository<Challenge, String> {


    @Query(value = "{}", fields = "{ 'testCode': 0, 'hiddenTests': 0 }")
    override fun findAll(sort: Sort): List<Challenge>

    /**
     * find the challenge by reply
     */
    fun findOneByReplies(reply: Reply): Challenge
}