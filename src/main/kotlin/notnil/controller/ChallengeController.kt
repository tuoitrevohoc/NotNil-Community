package notnil.controller

import notnil.extension.user
import notnil.extension.xor
import notnil.language.swift.SwiftHandler
import notnil.model.Challenge
import notnil.model.Reply
import notnil.model.Solution
import notnil.model.User
import notnil.repository.ChallengeRepository
import notnil.repository.ReplyRepository
import notnil.repository.UserRepository
import org.springframework.data.domain.Sort
import org.springframework.web.bind.annotation.*
import java.security.Principal
import java.util.*

/**
 * The problem controller
 */
@RestController
@RequestMapping("/api/challenge")
class ChallengeController(val challengeRepository: ChallengeRepository,
                          val replyRepository: ReplyRepository,
                          val userRepository: UserRepository){


    val BaseReward = 100


    /// get latest post
    @RequestMapping("/feed")
    fun getLatest() = challengeRepository.findAll(
                        Sort(Sort.Order(Sort.Direction.DESC, "createAt")))

    /**
     * get challenge
     */
    @RequestMapping("/{challengeId}")
    fun get(@PathVariable("challengeId") challengeId: String, principal: Principal?)
            : Challenge {
        val challenge = challengeRepository.findOne(challengeId)
        val user = principal?.user()

        if (user == null || (!user.isAdmin() && !user.id.equals(challenge.creator.id))) {
            challenge.testCode = ""
        }

        return  challenge

    }

    /**
     * save the problem
     * @param challenge the problem
     * @param principal the logged in user
     */
    @RequestMapping(method = arrayOf(RequestMethod.POST))
    fun save(@RequestBody challenge: Challenge, principal: Principal): Challenge {
        challenge.creator = principal.user()
        challenge.reward = BaseReward
        challengeRepository.save(challenge)

        return challenge
    }

    /**
     * delete a problem
     */
    @RequestMapping("/{challengeId}", method = arrayOf(RequestMethod.DELETE))
    fun delete(@PathVariable("challengeId") challengeId: String,
               principal: Principal): Boolean {
        val user = principal.user()
        val challenge = challengeRepository.findOne(challengeId)
        if (challenge.creator.id == user.id || user.isAdmin()) {
            challengeRepository.delete(challengeId)
        }

        return true
    }


    /**
     * Add a reply to a solution
     */
    @RequestMapping("/{challengeId}/reply", method = arrayOf(RequestMethod.POST))
    fun addReply(@PathVariable("challengeId") challengeId: String,
                 @RequestBody reply: Reply,
                 principal: Principal): Reply {
        val challenge = challengeRepository.findOne(challengeId)

        reply.creator = principal.user()
        replyRepository.save(reply)

        challenge.replies.add(reply)
        challengeRepository.save(challenge)
        return reply
    }

    /**
     * test a solution
     */
    @RequestMapping("/{challengeId}/test", method = arrayOf(RequestMethod.POST))
    fun testSolution(@PathVariable("challengeId") challengeId: String,
                     @RequestBody solution: Solution,
                     principal: Principal): Solution {
        val challenge = challengeRepository.findOne(challengeId)

        solution.creator = principal.user()

        // temporary hard-coding swift handler
        val swiftHandler = SwiftHandler()
        swiftHandler.execute(challenge, solution)

        return solution
    }

    /**
     * test a solution
     */
    @RequestMapping("/{challengeId}/submit", method = arrayOf(RequestMethod.POST))
    fun submitSolution(@PathVariable("challengeId") challengeId: String,
                     @RequestBody solution: Solution,
                     principal: Principal): Solution {
        val challenge = challengeRepository.findOne(challengeId)

        solution.creator = principal.user()

        // temporary hard-coding swift handler
        val swiftHandler = SwiftHandler()
        swiftHandler.execute(challenge, solution)

        if (challenge != null
                && solution.result!!.tests.size > 0
                && solution.result!!.tests.all { i -> i }
                && solution.result!!.hiddenTests.all { i -> i}) {
            solution.codeLength = solution.code
                                            .replace(Regex("\\s+"), "")
                                            .length

            calculateReward(solution, challenge)

            replyRepository.save(solution)
            challenge.replies.add(solution)
            challengeRepository.save(challenge)
        }

        return solution
    }


    /**
     * calculate reward
     */
    private fun calculateReward(solution: Solution, challenge: Challenge) {
        val shortestSolution = challenge.shortestSolution

        if (shortestSolution != 0) {

            if (solution.codeLength < shortestSolution) {

                val replies = challenge.replies.filter {
                    i -> i is Solution
                }.reversed()

                val hasPostShortedSolution = replies.any {
                    i -> i.creator.id.equals(solution.creator.id)
                        && (i as Solution).reward > 0
                }

                if (hasPostShortedSolution) {
                    var first = true

                    for (reply in replies) {
                        val item = reply as Solution

                        if (item.creator.id.equals(solution.creator.id)
                                && item.reward > 0) {
                            solution.creator.points -= item.reward
                            item.reward = 0
                            replyRepository.save(item)

                            break
                        } else if (item.reward > 0) {

                            val reducePoint = item.reward / 2

                            // reduce reward point
                            item.reward -= reducePoint
                            item.creator.points -= reducePoint

                            if (first) {
                                item.creator.shortestSolutions--
                                first = false
                            }

                            replyRepository.save(item)
                            userRepository.save(item.creator)
                        }
                    }

                    // reward
                    solution.reward = challenge.reward / 2
                } else {
                    solution.reward = challenge.reward
                    challenge.reward *= 2
                }

                challenge.shortestSolution = solution.codeLength
            }

        } else {
            challenge.shortestSolution = solution.codeLength
            solution.reward = challenge.reward
            challenge.reward *= 2
            solution.creator.earliestSolutions++
            solution.creator.solutions++
        }


        solution.creator.points += solution.reward
    }

    /**
     * Add a like to a solution
     */
    @RequestMapping("/{problemId}/like", method = arrayOf(RequestMethod.POST))
    fun like(@PathVariable("problemId") problemId: String,
                    principal: Principal): ArrayList<User> {
        val challenge = challengeRepository.findOne(problemId)!!
        val user = principal.user()
        challenge.likes.xor(user)

        challengeRepository.save(challenge)

        return challenge.likes
    }
}
