package notnil.language

import notnil.model.Challenge
import notnil.model.Solution

/**
 * Created by banhtieu on 6/28/16.
 */
interface LanguageHandler {

    /**
     * Execute code and return output
     */
    fun execute(code: String): String

    /**
     * Execute code and return output
     */
    fun execute(challenge: Challenge, solution: Solution)
}