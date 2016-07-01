package notnil.repository

import notnil.model.Page
import notnil.model.User
import org.springframework.data.mongodb.repository.MongoRepository

/**
 * the page repository
 */
interface  PageRepository: MongoRepository<Page, String> {

    /**
     * find a list of page by user
     */
    fun findAllByCreator(creator: User): List<Page>
}