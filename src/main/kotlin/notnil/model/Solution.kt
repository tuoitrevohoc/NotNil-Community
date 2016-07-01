package notnil.model

import org.springframework.data.mongodb.core.mapping.Document

/**
 * a solution for the post
 */
@Document(collection = "reply")
class Solution: Reply() {

    // code for reply
    var code = ""

    // test result of this solution
    var result: TestResult? = null

    // reward for the solution
    var reward = 0

    // length of code
    var codeLength: Int = 0

}