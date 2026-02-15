import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { styled } from "@mui/system";
import { spacing } from "@mui/system";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Login from "./login";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const pages = ["About", "Contact", "Login"];

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.setItem("user", null);
    window.location.reload();
    //dispatch(addUser(null))
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    console.log("page closed");
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xxl" sx={{ backgroundColor: "#05203c" }}>
        <br></br>
        <Toolbar disableGutters sx={{ p: 3 }}>
          {/* add logo */}
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}

          {/* ------------open name */}

          <Typography
            variant="h5"
            noWrap
            //component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              // fontFamily: 'monospace',
              fontFamily: "Rubik",
              fontWeight: 700,
              //letterSpacing: '.3rem',
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link
              to="/"
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Skyscanner
            </Link>
          </Typography>

          {/* ------------closed menu */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center", fontFamily: "Rubik" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}

          {/* ------------closed name */}

          <Typography
            variant="h5"
            noWrap
            //component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              //mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Rubik",
              fontWeight: 700,
              //letterSpacing: '.3rem',
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Skyscanner
          </Typography>

          {/* ------------open menu */}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ color: "white", display: "block" }}>
              <Link
                to="/explore"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Explore
              </Link>
            </Button>

            <Button
              onClick={handleOpen}
              sx={{ color: "white", display: "block" }}
            >
              <Link
                to="/about"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                About
              </Link>
            </Button>

            <Button
              onClick={handleOpen}
              sx={{ color: "white", display: "block" }}
            >
              <Link
                to="/contact"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Contact
              </Link>
            </Button>

            {user?.type == "provider" ? (
              <Button
                onClick={handleOpen}
                sx={{ color: "white", display: "block" }}
              >
                <Link
                  to="/postFlight"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  Post Flight
                </Link>
              </Button>
            ) : (
              <></>
            )}

            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{  color: 'white', display: 'block', }}
              >
                {page}
              </Button>
            ))} */}
          </Box>

          {/* ------------setting */}

          {!user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                  <Avatar alt="" src="/static/images/avatar/2.jpg" />
                </IconButton>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                  onClick={handleClose}
                >
                  <Login handleClose={handleClose} />
                </Backdrop>
              </Tooltip>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user?.firstName}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="logout" onClick={handleLogout}>
                  <Typography sx={{ textAlign: "center", fontFamily: "Rubik" }}>
                    Logout
                  </Typography>
                </MenuItem>
                <MenuItem key="profile">
                  <Typography sx={{ textAlign: "center", fontFamily: "Rubik" }}>
                    <Link
                      to="/userProfile"
                      style={{
                        color: "black",

                        textDecoration: "none",
                      }}
                    >
                      Profile
                    </Link>
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
      {/* <h1>{user?.firstName}</h1>
      <h1>{sessionStorage.getItem("user")?.firstName}</h1> */}
    </AppBar>
  );
}
export default Navbar;
