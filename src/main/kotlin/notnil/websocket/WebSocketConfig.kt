package notnil.websocket

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.config.annotation.EnableWebSocket
import org.springframework.web.socket.config.annotation.WebSocketConfigurer
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry

/***
 * Web socket configuration
 */

@Configuration
@EnableWebSocket
open class WebSocketConfig: WebSocketConfigurer {

    /**
     * register the handler
     */
    override fun registerWebSocketHandlers(registry: WebSocketHandlerRegistry?) {
        registry?.addHandler(playCenter(), "/api/play/connect")
    }

    /**
     * the play center
     */
    @Bean
    open fun playCenter(): PlayCenter {
        return PlayCenter()
    }

}
