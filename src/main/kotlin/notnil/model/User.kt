package notnil.model

import org.springframework.data.annotation.Id
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import java.security.Principal
import java.util.*

/**
 * the database model for user
 */
class User: Principal {

    @Id var id: String? = null
    var fullName = ""
    var profilePicture = ""
    var facebookId = ""
    var accessToken: String? = null
    var likes = 0
    var points = 0
    var follows = 0
    var shortestSolutions = 0
    var earliestSolutions = 0
    var solutions = 0
    var createAt = Date()
    var roles = ArrayList<Role>()

    /**
     * get name of the user
     */
    override fun getName() = id

    /**
     * check if user is administrator or not
     */
    fun isAdmin() : Boolean {
        return roles.count { role -> role.name.equals("administrator") } > 0
    }
}