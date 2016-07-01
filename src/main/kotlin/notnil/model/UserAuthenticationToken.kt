package notnil.model

import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority

/**
 * Created by banhtieu on 6/26/16.
 */

class UserAuthenticationToken(val user: User): Authentication {

    /**
     * set authenticated
     */
    override fun setAuthenticated(isAuthenticated: Boolean) {
        throw UnsupportedOperationException()
    }

    /**
     * get the authentication credentials
     */
    override fun getCredentials() = null

    /**
     * check if user is authenticated
     */
    override fun isAuthenticated() = true

    /**
     * get the details
     */
    override fun getDetails() = null

    /**
     * get authorities of logged in user
     */
    override fun getAuthorities() = null

    /**
     * get the principal
     */
    override fun getPrincipal() = user

    /**
     * get name of logged in user
     */
    override fun getName() = user.id


}