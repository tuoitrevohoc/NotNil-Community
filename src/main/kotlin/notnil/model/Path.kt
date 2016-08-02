package notnil.model

import org.springframework.data.mongodb.core.mapping.DBRef
import java.util.*

/**
 * Path is a set of challenge
 *
 */
open class Path: Post() {

    /**
     * Title of the path
     */
    var title = ""

    /**
     *
     */
    var intro = ""

    /**
     * list of challenges of this path
     */
    @DBRef var challenges = ArrayList<Challenge>()

    /**
     * Users who join the path
     */
    @DBRef var users = ArrayList<User>()

    /**
     * Users who finished the path
     */
    @DBRef var finishedUsers = ArrayList<User>()
}