package notnil.repository

import notnil.model.Challenge
import org.springframework.data.domain.Sort
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

/**
 * The problem repository
 */
interface ChallengeRepository : MongoRepository<Challenge, String> {


    @Query(value = "{}", fields = "{ 'testCode': 0, 'hiddenTests': 0 }")
    override fun findAll(sort: Sort): List<Challenge>
}