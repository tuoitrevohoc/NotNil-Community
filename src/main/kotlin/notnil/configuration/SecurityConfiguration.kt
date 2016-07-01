package notnil.configuration

import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter

/**
 * Configure spring security
 */

@Configuration
@EnableWebSecurity
open class SecurityConfiguration: WebSecurityConfigurerAdapter() {

    /**
     * enable accessing all request
     */
    override fun configure(http: HttpSecurity?) {
        http?.csrf()?.disable()
        http?.authorizeRequests()?.anyRequest()?.permitAll()
    }

}