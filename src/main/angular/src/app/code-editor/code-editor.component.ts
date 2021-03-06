import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core'

declare var ace: any

@Component({
    moduleId: module.id,
    selector: 'code-editor',
    templateUrl: 'code-editor.component.html'
})
export class CodeEditorComponent implements OnInit {
    
    @ViewChild("editordiv") editorDiv: ElementRef
    @Input() code: String       
    @Input() theme: String
    @Input() readOnly: String

    @Output("change") changeEvent = new EventEmitter<string>()
    @Output("delta") deltaEvent = new EventEmitter<string>()
    @Output("run") runEvent = new EventEmitter<string>()

    public editor: any    

    constructor() { }

    // initialize
    ngOnInit() { 
    }
    
    // initialize the editor
    ngAfterViewInit() {
        var div = this.editorDiv.nativeElement
        this.editor = ace.edit(div)
        this.editor.$blockScrolling = Infinity
        this.editor.setTheme(this.theme || "ace/theme/monokai")
        this.editor.getSession().setMode("ace/mode/swift")
        this.editor.setValue(this.code || '', 1)

        this.editor.getSession().on('change', (event) => {
            this.changeEvent.next(this.editor.getValue())
            this.deltaEvent.next(event)
            this.editor.resize()
        })

        this.editor.setReadOnly(this.readOnly)
        
        this.editor.setOptions({
            fontSize: "14px"
        })

        this.editor.commands.addCommand({
            name: 'myCommand',
            bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
            exec: (editor) => {
                this.runEvent.emit(editor.getValue())
            },
            readOnly: false
        })
    }

    applyDelta(delta: any) {
        this.editor.getSession().getDocument().applyDelta(delta)
    }

    // set code
    setCode(code: string) {
        this.code = code
        this.editor.setValue(this.code || '', 1)
        this.editor.focus()
    }

    focus() {
        this.editor.focus()
    }

    // get value of this code editor
    getCode() : string {
        return this.editor.getValue()
    }

    // set the mode for the code
    setMode(mode: string) {
        this.editor.getSession().setMode("ace/mode/" + mode)
    }

    setReadOnly(mode: boolean) {
        this.editor.setReadOnly(mode)
    }
}