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
    @Output("change") changeEvent = new EventEmitter<string>()

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
        this.editor.setTheme("ace/theme/monokai")
        this.editor.getSession().setMode("ace/mode/swift")
        this.editor.setValue(this.code || '', 1)
        this.editor.getSession().on('change', () => {
            this.changeEvent.next(this.editor.getValue())
            this.editor.resize()
        })
        
        this.editor.setOptions({
            fontFamily: "SF Mono Regular, Menlo",
            fontSize: "14px"
        });
    }

    // set code
    setCode(code: string) {
        this.code = code
        this.editor.setValue(this.code || '', 1)
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
}