package notnil.model

import org.springframework.data.mongodb.core.mapping.DBRef

/**
 * Created by banhtieu on 6/28/16.
 */
open class Reply: Post() {

    /**
     * content of the reply
     */
    var content = ""

}