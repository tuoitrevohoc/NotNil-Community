package notnil.language

import notnil.model.Challenge
import notnil.model.Solution

/**
 * Created by banhtieu on 6/28/16.
 */
interface LanguageHandler {

    ///
    /// execute an answer for a problem
    ///
    fun execute(challenge: Challenge, solution: Solution)
}