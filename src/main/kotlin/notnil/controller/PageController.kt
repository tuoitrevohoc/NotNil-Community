package notnil.controller

import notnil.extension.user
import org.springframework.web.bind.annotation.RestController
import notnil.model.Page
import notnil.repository.PageRepository
import notnil.repository.UserRepository
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import java.security.Principal

/**
 * The page controller
 */
@RequestMapping("/page")
@RestController open class PageController(
        val pageRepository: PageRepository,
        val userRepository: UserRepository
) {

    /**
     * Create a request
     */
    @RequestMapping("", method = arrayOf(RequestMethod.POST))
    fun create(page: Page, principal: Principal ): Page {
        page.creator = principal.user()
        pageRepository.save(page)

        return page
    }

    /**
     * return all page of the user
     */
    @RequestMapping("/byUser/{userId}", method = arrayOf(RequestMethod.GET))
    fun getByUser(@PathVariable("userId") userId: String): List<Page> {
        return pageRepository.findAllByCreator(userRepository.findOne(userId))
    }


    /**
     * delete a page
     */
    @RequestMapping("/{pageId}", method = arrayOf(RequestMethod.DELETE))
    fun delete(@PathVariable("pageId") pageId: String, principal: Principal): Boolean {
        val page = pageRepository.findOne(pageId)
        val user = principal.user()

        if (page.creator.id == user.id || user.isAdmin()) {
            pageRepository.delete(page)
        }

        return true
    }
}