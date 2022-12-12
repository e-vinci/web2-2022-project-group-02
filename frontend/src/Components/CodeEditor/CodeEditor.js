import { basicSetup } from 'codemirror';
import { StreamLanguage } from '@codemirror/language';
import { gas } from '@codemirror/legacy-modes/mode/gas';
import { c } from '@codemirror/legacy-modes/mode/clike';

import { StateField, StateEffect } from '@codemirror/state';
import { EditorView, Decoration } from '@codemirror/view';

// Some nonsense to get the line highlight to work
const lineHighlightMark = Decoration.line({
  class: 'activeLine',
});

const addLineHighlight = StateEffect.define();
const lineHighlightField = StateField.define({
  create() {
    return Decoration.none;
  },
  update(lines_, tr) {
    let lines = lines_.map(tr.changes);
    tr.effects.forEach((e) => {
      if (e.is(addLineHighlight)) {
        lines = Decoration.none;
        lines = lines.update({ add: [lineHighlightMark.range(e.value)] });
      }
    });

    return lines;
  },
  provide: (f) => EditorView.decorations.from(f),
});

const initEditor = (parent, doc, lang) => {
  const language = lang === 'asm' ? gas : c;

  return new EditorView({
    extensions: [basicSetup, lineHighlightField, StreamLanguage.define(language)],
    parent,
    doc,
  });
};

class CodeEditor {
  constructor(parent, doc, lang = 'asm') {
    this.editor = initEditor(parent, doc, lang);
  }

  getValue() {
    return this.editor.state.doc.toString();
  }

  highlightLine(line) {
    if (line === null) {
      this.editor.dispatch({ effects: addLineHighlight.of(-1) });
      return;
    }

    const docPosition = this.editor.state.doc.line(line).from;
    this.editor.dispatch({ effects: addLineHighlight.of(docPosition) });
  }
}

export default CodeEditor;
