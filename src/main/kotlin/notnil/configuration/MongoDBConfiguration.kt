package notnil.configuration

import com.mongodb.Mongo
import com.mongodb.MongoClient
import com.mongodb.MongoClientURI
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.config.AbstractMongoConfiguration

/**
 * Created by banhtieu on 6/23/16.
 */

@Configuration open class MongoDBConfiguration: AbstractMongoConfiguration() {

    /**
     * the client uri
     */
    private val clientURI: MongoClientURI by lazy {
        var mongoDBURI = System.getenv("MONGODB_URI")

        if (mongoDBURI == null) {
            mongoDBURI = "mongodb://localhost/notnil"
        }

        MongoClientURI(mongoDBURI)
    }

    /**
     * Get mongodb client
     */
    override fun mongo(): Mongo? {
        return MongoClient(clientURI)
    }


    /**
     * get database name
     */
    override fun getDatabaseName() = clientURI.database
}