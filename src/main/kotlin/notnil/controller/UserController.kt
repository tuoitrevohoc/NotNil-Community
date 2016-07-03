package notnil.controller

import notnil.extension.user
import notnil.model.User
import notnil.model.UserAuthenticationToken
import notnil.repository.UserRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.social.facebook.api.impl.FacebookTemplate
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal
import javax.servlet.http.HttpSession

/**
 * The user controller
 */
@RestController
@RequestMapping("/api/user")
class UserController (val userRepository: UserRepository) {

    /**
     * Login with Facebook
     * @param accessToken the facebook access token
     */
    @RequestMapping("/fbLogin")
    fun loginWithFacebook(@RequestBody accessToken: String,
                          principal: Principal?): User {
        var user = principal?.user()

        if (user == null) {
            val facebook = FacebookTemplate(accessToken)

            val fbUser = facebook.userOperations().getUserProfile("me")
            user = userRepository.findByFacebookId(fbUser.id)

            if (user == null) {
                user = User()

                user.fullName = fbUser.name
                user.facebookId = fbUser.id
                user.profilePicture = "http://graph.facebook.com/" + fbUser.id + "/picture?type=square"

                userRepository.save(user)
            }

            val token = UserAuthenticationToken(user)

            val context = SecurityContextHolder.getContext()
            context.authentication = token
        }

        return user
    }

    /**
     * get profile of logged in user
     * @param principal injected Principal of logged in user
     */
    @RequestMapping("/me")
    fun getMyProfile(principal: Principal)
            = principal.user()
}