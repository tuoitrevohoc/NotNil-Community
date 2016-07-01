package notnil.model

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.data.mongodb.core.mapping.DBRef
import java.util.*


/**
 * A program problem
 */
class Challenge : Post() {

    /// the document of the code
    var document = ""

    /// code of the post
    var code = ""

    /// code for testing
    var testCode = ""

    /// award for this solution
    var reward = 100

    /// number of tests
    var tests = ArrayList<Test>()

    /// number of hidden tests
    var hiddenTests = ArrayList<Test>()

    /// shortest solution
    var shortestSolution = 0

    /// if the challenge belongs to an page
    @DBRef var page: Page? = null

    /// all replies on this Problem
    @DBRef var replies = ArrayList<Reply>()

}