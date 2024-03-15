import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editorStyle.css";

class EditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  handleChange = e => {
    this.setState(state => ({ ...state, content: e.blocks[0].text }));
    this.props.handleContentState(this.state.content);
  };

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        initialEditorState={editorState}
        wrapperClassName="demo-wrapper wrapperClass"
        editorClassName="demo-editor height"
        onEditorStateChange={this.onEditorStateChange}
        onChange={e => this.handleChange(e)}
      />
    );
  }
}

export default EditContainer;
