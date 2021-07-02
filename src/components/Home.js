import React, { useEffect, useState } from "react";
import axios from "axios";
import Filelist from "./Filelist";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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

  const getFiles = () => {
    axios
      .get("http://localhost:5000/files/")
      .then((res) => {
        // then print response status
        setFilesData(res.data);
      })
      .catch(function () {
        console.log("Error!");
      });
  };

  const onClickHandler = () => {
    const data = new FormData();
    data.append("file", file);
    console.log(data);
    axios
      .post("http://localhost:5000/files/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // then print response status
        console.log(res);
      })
      .catch(function () {
        console.log("Error!");
      });

    getFiles();
    // window.location.reload();
  };

  useEffect(() => {
    getFiles();
  }, []);

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
