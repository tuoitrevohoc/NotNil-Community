package notnil.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod

/**
 * Created by banhtieu on 7/3/16.
 */
@Controller open class RouteController {

    /**
     * Map all false route to index html
     */
    @RequestMapping("/challenge/**",
                    "/user/**",
                    "/reply/**",
                    "/playground/**",
                    method = arrayOf(RequestMethod.GET))
    fun redirect(): String {
        return "forward:/index.html"
    }
}