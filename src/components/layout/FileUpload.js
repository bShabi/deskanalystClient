import React, { useState, Fragment } from "react";
import axios from "axios";
import Player from "./players-component";

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = e => {
    setFile(e.target.files[0]);
    try {
      setFilename(e.target.files[0].name);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/upload/:name",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      const { fileName, filePath } = res.data;
      console.log(res.data);
      setUploadedFile({ fileName, filePath });
    } catch (error) {
      if (error.response.status === 500) {
        console.log("there was problem with the server");
      } else {
        console.log(error.response.data.msg);
      }
    }
  };
  return (
    <Fragment>
      <h2>Upload New CSV File:</h2>
      <br />
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label htmlFor="customFile" className="custom-file-label">
            {filename}
          </label>
        </div>
        <div className="container">
          <Player name={filename} />
        </div>
      </form>
    </Fragment>
  );
};

export default FileUpload;
