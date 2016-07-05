package notnil.controller

import notnil.language.swift.SwiftHandler
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

/**
 * Play controller for playing with swift
 */

@RequestMapping("/api/play")
@RestController open class PlayController {

    /// run swift code and return output
    @RequestMapping("", method = arrayOf(RequestMethod.POST))
    fun play(@RequestBody code: String): String {
        val swiftHandler = SwiftHandler()
        return swiftHandler.execute(code)
    }
}