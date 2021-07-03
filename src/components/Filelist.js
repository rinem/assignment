import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
  icon: {
    color: "#64ffda",
    fontSize: 32,
  },
}));

const Filelist = ({ files }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} item xs={12} md={6}>
      <Typography variant="h6" className={classes.title}>
        Files Uploaded in this session
      </Typography>
      <div className={classes.demo}>
        <List dense={false}>
          {files.length > 0 ? (
            files.map((file, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${index + 1}.  ${file}`}
                  secondary={null}
                />
              </ListItem>
            ))
          ) : (
            <ListItem style={{ textAlign: "center" }}>
              <ListItemText
                primary={"No Uploaded Images Found"}
                secondary={null}
              />
            </ListItem>
          )}
        </List>
      </div>
    </Grid>
  );
};

export default Filelist;
