import React, { useState } from "react";
import axios from "axios";
import Filelist from "./Filelist";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

// Should be added in .env file
const REACT_APP_API_URL = "https://api.imgur.com/3/image/";
const REACT_APP_CLIENT_ID = "6dc6db3a69cdfe4";

const useStyles = makeStyles({
  root: {
    background: "#112240",
    borderRadius: 3,
    border: "1px solid #64ffda",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});

const Home = () => {
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [filesData, setFilesData] = useState([]);
  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const onClickHandler = async () => {
    const form = new FormData();

    form.append("image", file);
    console.log(form, file);
    setFilesData([...filesData, file.name]);

    try {
      const response = await axios({
        method: "post",
        url: REACT_APP_API_URL,
        data: form,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
          Authorization: `Client-ID ${REACT_APP_CLIENT_ID}`,
        },
      });
      console.log(response);
      setFile(null);
    } catch (error) {
      console.log(error);
      setFile(null);
    }
  };

  return (
    <div className="App">
      <Typography variant="h3">Imgur Image Uploader</Typography>
      <Filelist files={filesData} />
      <Typography variant="h5">Upload a image</Typography>
      <label htmlFor="file-button">
        <div className="upload-section">
          {file ? <p>{file.name}</p> : <p>Drag your image here!</p>}
        </div>
      </label>
      <input
        type="file"
        name="file-button"
        onChange={onChangeHandler}
        style={{ display: "none" }}
        id="file-button"
      />

      <Button
        color="primary"
        classes={{
          root: classes.root,
        }}
        startIcon={<CloudUploadIcon />}
        onClick={onClickHandler}
      >
        Upload
      </Button>
    </div>
  );
};

export default Home;
