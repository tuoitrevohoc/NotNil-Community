package notnil.extension

import notnil.model.Post
import notnil.model.User
import notnil.model.UserAuthenticationToken
import java.io.InputStream
import java.security.Principal
import java.util.*
import java.util.function.BiPredicate

/**
 * Get user from principal
 */
fun Principal.user() =
        (this as UserAuthenticationToken)?.user


/**
 * add or remove user from the list
 */
fun ArrayList<User>.xor(item: User) {
    if (!removeIf{ e -> e.id.equals(item.id)}){
        add(item)
    }
}

/**
 * Input stream read to end
 */
fun InputStream.readToEnd(): String {
    val buffer = ByteArray(available())
    read(buffer)
    return String(buffer)
}