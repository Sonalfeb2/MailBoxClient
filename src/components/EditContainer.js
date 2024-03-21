import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./EditorStyle.css";
import { convertToRaw } from "draft-js";
function EditContainer(props) {
  const [state, setState] = useState({
    editorState: EditorState.createEmpty()
  });
  const onEditorStateChange = editorState => {
    setState({
      editorState
    });
    var currentContent = editorState.getCurrentContent();
    const obj = convertToRaw(currentContent);
    props.handleContentState(obj.blocks[0].text);
  };
  useEffect(
    () => {
      if (props.isEmpty) {
        setState({
          editorState: EditorState.createEmpty()
        });
        props.setEmpty();
      }
      return;
    },
    [props]
  );
  return (
    <Editor
      editorState={state.editorState}
      wrapperClassName="demo-wrapper wrapperClass"
      editorClassName="demo-editor height"
      onEditorStateChange={e => onEditorStateChange(e)}
    />
  );
}

export default EditContainer;
