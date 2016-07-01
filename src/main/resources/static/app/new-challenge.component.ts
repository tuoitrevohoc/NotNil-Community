import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { CodeEditorComponent } from './code-editor.component'
import { Challenge, Test, Definition, FunctionDefinition } from './services/data'
import { ChallengeService } from './services/challenge-service'
import { MarkUpPipe } from './pipes/mark-up.pipe'
import { GlobalService } from './services/global-service'

class Type {
  constructor(public id: number,
              public name: string,
              public description: string){}
}

@Component({
  moduleId: module.id,
  selector: 'new-challenge',
  templateUrl: 'new-challenge.component.html',
  directives: [ CodeEditorComponent ],
  pipes: [ MarkUpPipe ]
})
export class NewChallengeComponent implements OnInit {

  @ViewChild("modal") modalDiv: ElementRef

  showPostForm =  false

  markUpDocument: string
  error: string
  loading: boolean
  parseError: string
  challenge: Challenge = {
    definition: {
      input: [],
      output: {}
    }
  }

  /// list of support type
  supportTypes = [
    new Type(0, "Bool", "A boolean"),
    new Type(1, "Int", "An integer"),
    new Type(2, "Float", "A float"),
    new Type(3, "Double", "A double"),
    new Type(4, "String", "A string"),
    new Type(5, "[Bool]", "An array of Boolean"),
    new Type(6, "[Int]", "An array of integer"),
    new Type(7, "[Float]", "An array of float"),
    new Type(8, "[Double]", "An array of double"),
    new Type(9, "[String]", "An array of string"),
    new Type(10, "[[Bool]]", "A matrix of Boolean"),
    new Type(11, "[[Int]]", "A matrix of integer"),
    new Type(12, "[[Float]]", "A matrix of float"),
    new Type(13, "[[Double]]", "A matrix of double"),
    new Type(14, "[[String]]", "A matrix of string"),
  ]

  code: string = `
/**
# Add Two Numbers
Write a function to add up two numbers
[View markup sample here](https://developer.apple.com/library/mac/documentation/Xcode/Reference/xcode_markup_formatting_ref/AddingMarkup.html)

- parameter a: first number (-10000 <= a <= 10000)
- parameter b: second number (-10000 <= b <= 10000)
- returns: sum of the two integer
 */
func add(a: Int, b: Int) -> Int {
    
}

/// your test cases - do not remove
assert(expected: 3, actual: add(a: 1, b: 2))

/// your hidden test cases - do not remove
assert(expected: -1, actual: add(a: 1, b: -2))
  `

  /// the global service
  constructor(private challengeService: ChallengeService,
              private globalService: GlobalService) {
  }

  /// 
  ngOnInit() { 
    this.updateChallenge(this.code)
  }

  /// when clicked on new challege
  newChallengeClicked() {
    $(this.modalDiv.nativeElement)['modal']("show")
  }

  /// get type
  getType(type) {
    var result = this.supportTypes.filter(item => item.name == type.replace(/\s/g, ''))
    
    if (result.length == 0) {
      this.parseError = "Type " + type + " not supported!"
    }

    return result.length ? result[0].id : 0 
  }

  // get definition type
  getChallengeDefinition(code: string, definition: FunctionDefinition) {
    this.parseError = null

    var funcRegExp = /func\s+([_a-zA-Z][_a-zA-Z0-9]*)\s*\((\s*([_a-zA-Z][_a-zA-Z0-9]*\s*\:\s*[^,\)]+\,?\s*)+)\)\s*\->\s*([^\,\s{]+)/
    var match = code.match(funcRegExp)

    if (match) {
      definition.name = match[1]
      definition.output.type = this.getType(match[4])
      definition.input = []

      var paramRegExp = /([_a-zA-Z][_a-zA-Z0-9]*)\s*\:\s*([^,\)]+)/g
      var matches = match[2].match(paramRegExp)

      var defineRegExp = new RegExp("\\s*-\\s*returns\\s*:\\s*([^\\n]+)\\n")
      match = code.replace(/<\/ br>/g, '\n').match(defineRegExp)

      if (match) {
        definition.output.description = match[1]
      }

      if (matches) {
        for (var item of matches) {
          var parameter: Definition = {}
          match = item.match(/([_a-zA-Z][_a-zA-Z0-9]*)\s*\:\s*([^,\)]+)/)
          parameter.name = match[1]
          parameter.type = this.getType(match[2])
          var defineRegExp = new RegExp("\\s*-\\s*parameter\\s*" + parameter.name + "\\s*:\\s*([^\\n]+)\\n")
          match = code.replace(/<\/ br>/g, '\n').match(defineRegExp)

          if (match) {
            parameter.description = match[1]
          }

          definition.input.push(parameter)
        }        
      }
    } else {
      this.parseError = "Function is not supported."
    }
  }
  
  // get number of tests
  getTests(testCode: string) {
    var tests = []
    var textRegExpG = /assert\s*\(\s*expected\s*:\s*(.*),\s*actual\s*:\s*([^\)]+)\)/g
    var textRegExp = /assert\s*\(\s*expected\s*:\s*(.*),\s*actual\s*:\s*([^\)]+)\)/
    var matches = testCode.match(textRegExpG)

    if (matches) {
      for (var match of matches) {
        var sub = match.match(textRegExp)
        var test: Test = {
          expected: sub[1],
          test: sub[2] + ")"
        }

        tests.push(test)
      }
    }

    return tests
  }

  /// update the document
  updateChallenge(code: string) {
    this.code = code

    this.challenge.document = this.getDocument(code)
    this.getChallengeDefinition(code, this.challenge.definition)
    
    var codePart = this.code.split("/// your test cases - do not remove")
    this.challenge.code = codePart[0]
    this.challenge.testCode = codePart[1]

    var testCode = this.challenge.testCode.split("/// your hidden test cases - do not remove")
    this.challenge.tests = this.getTests(testCode[0])
    this.challenge.hiddenTests = this.getTests(testCode[1])
  }

  /**
   * get document form code
   * @parameter code 
   */
  getDocument(code: string) {
    var document = null
    var match = code.replace(/\n/g, '<br />').match(/\/\*+(.+)\*+\//)

    if (match[1]) {
      document = match[1]
    }

    return document
  }


  /**
   * Handle saving the post
   */
  savePostClicked() {

    this.loading = true
    this.error = null

    
    this.challengeService.save(this.challenge).subscribe((challenge) => {
      this.loading = false
      this.globalService.channel("gift-dialog")
          .emit({
            'title': "Congratulation",
            'message': "Your post has been saved!"
          })

      this.globalService.channel("new-challenge")
          .emit(challenge.json())

      this.showPostForm = false
    },
    () => { 
        this.error = "Error Posting Challenge. Try again later."
        this.loading = false
    })
  }

}