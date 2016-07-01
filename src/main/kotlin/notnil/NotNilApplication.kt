package notnil

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

/**
 * the spring boot application
 */
@SpringBootApplication open class NotNilApplication {
}


/**
 * the main entrance of the application
 */
fun main(args: Array<String>) {
    SpringApplication.run(NotNilApplication::class.java, *args)
}