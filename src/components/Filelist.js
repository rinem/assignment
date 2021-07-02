import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/FolderOpen";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 752,
    margin: "40px auto",
  },
  demo: {
    backgroundColor: "#112240",
  },
  title: {
    margin: "20px auto",
  },
}));

const Filelist = ({ files }) => {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);

  const onDeleteHandler = (fileName) => {
    axios
      .delete("http://localhost:5000/files/" + fileName)
      .then((res) => {
        // then print response status
        console.log(res);
      })
      .catch(function () {
        console.log("Error!");
      });

    window.location.reload();
  };

  return (
    <Grid className={classes.root} item xs={12} md={6}>
      <Typography variant="h6" className={classes.title}>
        Files Uploaded in this session
      </Typography>
      <div className={classes.demo}>
        <List dense={dense}>
          {files.length > 0 ? (
            files.map((file, index) => (
              <ListItem>
                <ListItemAvatar>
                  <FolderIcon style={{ color: "#64ffda", fontSize: 32 }} />
                </ListItemAvatar>
                <ListItemText primary={file} secondary={null} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => {
                      onDeleteHandler(file);
                    }}
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon style={{ color: "#64ffda", fontSize: 32 }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <ListItem style={{ textAlign: "center" }}>
              <ListItemText primary={"No Files Found"} secondary={null} />
            </ListItem>
          )}
        </List>
      </div>
    </Grid>
  );
};

export default Filelist;
