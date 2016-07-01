package notnil.repository

import notnil.model.Reply
import org.springframework.data.mongodb.repository.MongoRepository

/**
 * repository for reply
 */
interface ReplyRepository: MongoRepository<Reply, String> {

}