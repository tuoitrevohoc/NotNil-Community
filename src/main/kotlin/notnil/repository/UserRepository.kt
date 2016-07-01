package notnil.repository

import notnil.model.User
import org.springframework.data.mongodb.repository.MongoRepository

/**
 * User repository
 */
public interface UserRepository: MongoRepository<User, String> {

    /**
     * find user by facebook Id
     */
    fun findByFacebookId(facebookId: String): User?
}