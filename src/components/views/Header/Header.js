import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

import { useStyles } from "./public/styles";
import "./public/Header.css";
// import { AlignHorizontalLeftRounded } from '@mui/icons-material';

// import { withRouter } from 'react-router-dom';
import LoginPage from "../LoginPage/LoginPage";
// import logo from './public/logo.png';

function Header({ history }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const kakao_logout = () => {
    if (window.Kakao.Auth.getAccessToken()) {
      window.Kakao.Auth.logout(() => {
        setLogin(false);
        alert("로그아웃 성공");
        localStorage.clear();
        history.push("/");
      });
    } else {
      alert("로그아웃 상황");
    }
  };
  const [login, setLogin] = useState(false);
  const move_login = () => {
    // return(
    <LoginPage></LoginPage>;
    // )
  };
  const [user_account, setUser_account] = useState(null);
  useEffect(() => {
    window.Kakao.API.request({
      url: "/v2/user/me",
      success: function ({ kakao_account }) {
        // const { age_range, profile } = kakao_account;
        setUser_account(kakao_account);
      },
    });
    // }, [login]);
  }, []);

  const view_info = () => {
    window.Kakao.API.request({
      url: "/v2/user/me",
      success: function ({ kakao_account }) {
        const { age_range, profile } = kakao_account;
      },
      fail: function (error) {
        console.log("실패");
        console.log(error);
      },
    });
  };
  const [loginModal, setLoginModal] = useState(false);

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="static"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          // style={{background:"#1877F2"}}
        >
          <Toolbar variant="dense">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              <a href="/">
                {/* <img className = "header_logo" src={logo}/> */}
                Join-delivery
              </a>
            </Typography>
            {/* Homepage
              MapPage
              Word
              Trend
              Study */}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <div className="header_item">
              <a href="/">Homepage</a>
            </div>
            <div className="header_item">
              <a href="/chatlist">Chat</a>
            </div>
            <div className="header_item">
              <a href="/list">List</a>
            </div>
            <div className="header_item">
              <a href="/foodmap">foodmap</a>
            </div>
            <div className="header_item">
              <a href="/component">component</a>
            </div>
            <div className="header_item">
              <a href="/testpage">testpage</a>
            </div>
          </List>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Divider />

          {!localStorage.Kakao_token ? (
            <List>
              <div className="header_item">
                <a onClick={() => setLoginModal(true)}>로그인</a>
              </div>
              {loginModal ? (
                <LoginPage login={login} setLogin={setLogin}></LoginPage>
              ) : (
                <></>
              )}
            </List>
          ) : (
            <>
              {!user_account ? (
                <List>
                  <div className="header_item">
                    <a onClick={() => setLoginModal(true)}>로그인</a>
                  </div>
                  {loginModal ? (
                    <LoginPage login={login} setLogin={setLogin}></LoginPage>
                  ) : (
                    <></>
                  )}
                </List>
              ) : (
                <List>
                  <div className="header_item">
                    {user_account?.profile?.nickname} 님 안녕하세요
                  </div>
                  <div className="header_item">
                    <a onClick={kakao_logout}>로그아웃</a>
                  </div>
                </List>
              )}
            </>
          )}
          <List></List>
        </Drawer>
      </div>
    </>
  );
}

// export default withRouter(Header);
export default Header;
