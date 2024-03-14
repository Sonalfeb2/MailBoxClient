import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './editorStyle.css';


class EditContainer extends Component {
    constructor(props) {
        super(props);
        this.state =  {
          editorState: EditorState.createEmpty(),
        };
      }
    
      onEditorStateChange=(editorState) => {
        this.setState({
          editorState,
        });
      };
    
      render() {
        const { editorState } = this.state;
        return (
          <Editor
            initialEditorState={editorState}
            wrapperClassName="demo-wrapper wrapperClass"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            
          />
        )
      }
}

export default EditContainer;