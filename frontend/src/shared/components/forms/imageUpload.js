/** @format */

import React, { useRef, useState, useEffect } from "react";
import { LoginButton } from "./formTemplate";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files || event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.handlePictureChange(props.id, pickedFile, fileIsValid);
    // props.onInput(props.id, pickedFile, isValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={pickedHandler}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "300px",
            height: "300px",
            maxWidth: "300px",
            maxHeight: "300px",
            borderRadius: "30px",
            border: "1px solid black",
            textAlign: "center",
          }}
        >
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              style={{
                width: "300px",
                height: "300px",
                maxWidth: "300px",
                maxHeight: "300px",
                borderRadius: "30px",
              }}
            />
          )}
          {!previewUrl && <p>Please pick an image to change your avatar.</p>}
        </div>
        <LoginButton
          type="button"
          onClick={pickImageHandler}
          style={{ marginTop: "10px" }}
        >
          PICK IMAGE
        </LoginButton>
      </div>
      {!isValid && <p>{props.error}</p>}
    </div>
  );
};

export default ImageUpload;
