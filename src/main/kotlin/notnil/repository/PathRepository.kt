package notnil.repository

import notnil.model.Path
import org.springframework.data.mongodb.repository.MongoRepository

/**
 * The mongo interface for the path
 */
interface  PathRepository: MongoRepository<Path, String> {
}