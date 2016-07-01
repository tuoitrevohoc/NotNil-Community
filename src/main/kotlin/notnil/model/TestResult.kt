package notnil.model

import java.util.*

/**
 * The result for the tests
 */
class TestResult() {

    var tests = ArrayList<Boolean>()

    var hiddenTests = ArrayList<Boolean>()

    var error: String? = null

}