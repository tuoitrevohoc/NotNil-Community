package notnil.model

import org.springframework.data.annotation.Id

/**
 * Role of user
 */
class Role {

    /**
     * id of the role
     */
    @Id var id: String? = null

    /**
     * name of the roles
     */
    var name = ""
}