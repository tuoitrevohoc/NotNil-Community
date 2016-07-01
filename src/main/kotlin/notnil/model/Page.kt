package notnil.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import java.util.*

class Page {

    // the topic id
    @Id var id: String? = null

    // name of the topic
    var name = ""

    // page head line
    var headline = ""

    // author of the topic
    @DBRef(lazy=true) var creator: User = User()
}