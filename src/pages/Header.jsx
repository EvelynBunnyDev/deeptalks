import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ButtonBase, Grid, Menu, MenuItem } from "@mui/material/";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useNavigate } from "react-router-dom";
import Link from "../components/Link.js";
//import logo from "./../logo.jpg";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import Api from "../models/Api.js";
import Auth from "../models/Auth.js";

let barStyle = {
  color: "black",
  backgroundColor: "white",
  padding: "10px 35px",
  borderBottom: "3px solid rgba(0, 0, 0, .09)"
};

let buttonStyle = {
  padding: "5px 20px",
  color: "black",
};

export default function NavBar(props) {
  const navigate = useNavigate();
  let { title, post, type } = props;
  title = title || "Home";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const navigateBack = () => {
    navigate(-1);
  }

  let createPostButton
  if (post === "true") {
    if (type === "home") {
      createPostButton = <a href="/createPost" style={buttonStyle}><Button>Create a post</Button></a>;
    } else if (type === "group") {
      createPostButton = <a href="/createGroupPost" style={buttonStyle}><Button>Create a post</Button></a>;
    }
  }

  const [loading, setLoading] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState(null);
  React.useEffect(() => void (async () => {
    const user = await Auth.check();
    setCurrentUser(user);
    setLoading(false);
  })(), []);

  const handleDiv = (node) => {
    if (!node) return;
    Auth.render(node, (data) => {
      const { apiKey, email, user } = data;
      if (user) {
        Api.setKey(apiKey);
        setCurrentUser(user);
      } else {
        navigate("/signup", { state: { apiKey, email } });
      }
    });
  };

  const handleLogout = () => {
    Auth.logout(currentUser);
    setCurrentUser(null);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={0}>
          <Toolbar style={barStyle}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "20%"

            }}>
              <Button onClick={navigateBack} style={{ color: "black", padding: "5px 20px" }}>
                <ArrowBackIcon />
              </Button>
              <Typography
                variant="h5" style={{
                  marginLeft: "25px", color: "#33363F", whiteSpace: "nowrap", cursor: "pointer"
                }}
                onClick={() => navigate("/")}
              >
                <b>{title}</b>
              </Typography>
            </div>
            <Grid container columnSpacing={2} justifyContent="flex-end" alignItems="center">
              {/* <img src={logo} alt="Logo" style={{ height: '50px', marginRight: '20px' }} /> */}

              {currentUser ?
                <Grid container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  columnSpacing={2}
                  rowSpacing={2}
                >
                  <Grid item style={{ display: 'flex', justifyContent: 'center', width: '300px' }}>
                    {createPostButton}
                    <Link to="/journal" style={{ textDecoration: 'none', display: 'block', margin: 'auto', width: 'auto' }}>
                      <Button style={{ display: 'block' }}>View Journal Entries</Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <ButtonBase variant="contained" onClick={handleClick}>
                      <AccountCircleRoundedIcon fontSize="large" sx={{ color: "#33363F" }} /> <ExpandMoreRoundedIcon fontSize="large" sx={{ color: "#33363F" }} />
                    </ButtonBase>
                    <Menu
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                    >
                      <Link to="/profile"><MenuItem sx={{ color: "#33363F" }}>Account Settings</MenuItem></Link>
                      <MenuItem sx={{ color: "darkred" }} onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </Grid>
                </Grid> : loading ? <>
                  <Typography>Loading...</Typography>
                </> : 
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Link to="/journal" style={{ textDecoration: 'none', display: 'block', margin: 'auto', width: 'fit-content' }}>
                    <Button style={{ display: 'block' }}>Journal Entries</Button>
                  </Link>
                  <div ref={handleDiv} />
                </div>}

            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
