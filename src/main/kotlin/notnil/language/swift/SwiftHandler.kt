package notnil.language.swift

import notnil.extension.readToEnd
import notnil.language.LanguageHandler
import notnil.model.Challenge
import notnil.model.Solution
import notnil.model.TestResult
import org.springframework.stereotype.Component
import java.io.File
import java.io.PrintWriter
import java.util.*
import java.util.concurrent.TimeUnit

/**
 * language handler for swift
 */
@Component
open class SwiftHandler: LanguageHandler {

    /**
     * path to swift execution
     */
    val swiftPath = "swift"

    /**
     * execute a challenge with a solution
     */
    override fun execute(challenge: Challenge, solution: Solution) {
        val uuid = UUID.randomUUID().toString()
        val file = File.createTempFile(uuid, ".swift")


        writeSourceCodeFile(file, uuid, challenge, solution)
        solution.result = executeFile(file, uuid)
    }

    /**
     * Execute file and get the result
     */
    fun executeFile(file: File, uuid: String): TestResult {

        val path = file.absolutePath
        val processBuilder = ProcessBuilder(swiftPath, path)
        val process = processBuilder.start()

        var tests = ArrayList<Boolean>()
        var hiddenTests = ArrayList<Boolean>()

        process.waitFor(5000, TimeUnit.MILLISECONDS)

        val output = process.inputStream.readToEnd()
        var error = process.errorStream.readToEnd()
        error = error.replace(path, "")
        error = error.replace("\n", "<br />\n")

        if (process.isAlive) {
            process.destroy()
            error = "Execution time out!!! "
        } else if (process.exitValue() != 0){
            error = "<code>$error</code>"
            error = "Execution Error: " + error
        } else {
            val result = output.split(uuid)

            if (result.count() == 5) {
                val testResult = result[1]
                val hiddenTestResult = result[3]

                tests = readArray(testResult)
                hiddenTests = readArray(hiddenTestResult)

            } else {
                error = "Execution Error!!!"
            }
        }

        val result = TestResult()
        result.tests = tests
        result.hiddenTests = hiddenTests
        result.error = error

        return result
    }

    /**
     * Read array of boolean
     */
    fun readArray(text: String): ArrayList<Boolean> {
        val array = text.substring(1, text.length - 1).split(",")
        val result = ArrayList<Boolean>(array.size)

        for (i in array) {
            result.add(i.trim().equals("true"))
        }

        return result
    }

    /**
     * write the source code file
     */
    fun writeSourceCodeFile(file: File,
                            uuid: String,
                            challenge: Challenge,
                            solution: Solution) {
        val printer = PrintWriter(file)
        val swiftResource = this.javaClass.getResourceAsStream(
                            "/SwiftDefine.swift")
        printer.println(swiftResource.readToEnd())

        printer.println(solution.code)
        val testCodes = challenge.testCode.split("/// your hidden test cases - do not remove")
        printer.println(testCodes[0])

        printer.printf("print(\"  %s\\(tests)%s  \")\n", uuid, uuid)
        printer.println("tests = []")
        printer.println(testCodes[1])
        printer.printf("print(\"  %s\\(tests)%s  \")\n", uuid, uuid)

        printer.close()
    }
}