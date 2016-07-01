import Foundation

var tests = [Bool]()

func compareArray<T: Equatable>(expected: [T], actual: [T]) -> Bool {
    var result = expected.count == actual.count

    if (result) {
        for i in 0..<expected.count {
            result = result && (expected[i] == actual[i])
        }
    }

    return result
}

/**
  Assert two array
 **/
func assert<T: Equatable>(expected: T, actual: T) {
    tests.append(expected == actual)
}

/**
  Assert equal two arrays
 **/
func assert<T: Equatable>(expected: [T], actual: [T]) {
    tests.append(compareArray(expected: expected, actual: actual))
}

/**
 Assert equal two matrices
 **/
func assert<T: Equatable>(expected: [[T]], actual: [[T]]) {
    var result = expected.count == actual.count

    if (result) {
        for i in 0..<expected.count {
            result = result && compareArray(expected: expected[i], actual: actual[i])
        }
    }

    tests.append(result)
}

/**
  Assert equal two dictionaries
 **/
func assert<T: Equatable, U: Equatable>(expected: [T: U], actual: [T: U]) {
    var result = expected.count == actual.count

    for key in expected.keys {
        if let expectedValue = expected[key],
            let actualValue = actual[key] {
            result = result && (expectedValue == actualValue)
        } else {
            result = false
            break
        }
    }

    tests.append(result)
}
