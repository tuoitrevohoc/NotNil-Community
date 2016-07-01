package notnil.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import java.util.*

/**
 * Created by banhtieu on 6/27/16.
 */

open class Post {

    // id of the post
    @Id var id: String? = null

    // creator of the post
    @DBRef var creator = User()

    // user who likes the posts
    @DBRef var likes = ArrayList<User>()

    // creating time
    var createAt = Date()

}