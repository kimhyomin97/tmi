import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { useStyles } from './public/styles';
import './public/Header.css';
import { AlignHorizontalLeftRounded } from '@mui/icons-material';

import { withRouter } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import logo from './public/logo.png';

function Header_test({history}) {
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
    if(window.Kakao.Auth.getAccessToken()){
      window.Kakao.Auth.logout(() => {
        setLogin(false);
        alert("로그아웃 성공");
        localStorage.clear();
        history.push("/");
      })
    }
    else{
      alert("로그아웃 상황");
    }
    // window.Kakao.Auth.logout(function() {
    //   console.log
    // })

    // window.Kakao.API.request({
    //   success: function(res) {
    //     console.log(res);
    //   }
    // })
  }
  const [login, setLogin] = useState(false);
  const move_login = () => {
    // return(
      <LoginPage></LoginPage>
    // )
  }
  const [user_account, setUser_account] = useState(null);
  useEffect(() => {
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: function({ kakao_account }){
        // const { age_range, profile } = kakao_account;
        setUser_account(kakao_account);
      }
    })
  // }, [login]);
  }, []);
  
  const view_info = () => {
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: function({ kakao_account }){
        const { age_range, profile } = kakao_account;
        console.log(age_range);
        console.log(`responsed img: ${profile.profile_image_url}`);
        console.log("성공");
        console.log(kakao_account);
        // console.log(res);
      },
      fail: function(error){
        console.log("실패");
        console.log(error);
      }
    })
  }
  const [loginModal, setLoginModal] = useState(false);
  
  // console.log(localStorage.Kakao_token);
  // console.log(user_account);
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
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
            <div className="header_item">
              <a href="/homepage">Homepage</a>
            </div>
            {/* <a href="/mappage">
              <div className="header_item">
                  MapPage
              </div>
            </a> */}
            <div className="header_item">
              <a href="/mappage">MapPage</a>
            </div>
            <div className="header_item">
              <a href="/word">Word</a>
            </div>
            <div className="header_item">
              <a href="/trend">Trend</a>
            </div>
            <div className="header_item">
              <a href="/study">Study</a>
            </div>
            <div className="header_item">
              <a href="/chatlist">Chat</a>
            </div>
            <div className="header_item">
              <a href="/list">List</a>
            </div>
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          {/* 이부분 페이지 이동시 초기화되는 문제가 발생... 
              페이지 이동시에도 카카오 로그인 유지되는 방안 생각해야됨
              토큰을 활용한 방법을 생각해봐야 될듯
          */}
          {
            // !login ?
            // 페이지 이동시 로그인은 유지되지만 로그인 정보가 문제...
            !localStorage.Kakao_token ? 
            <List>
              <div className="header_item">
                <a onClick={() => setLoginModal(true)}>로그인</a>
              </div>
              {loginModal ?
                <LoginPage
                  login={login}
                  setLogin={setLogin}
                ></LoginPage>
                :
                <></>
              }
            </List>
            :
            <>
            {
            !user_account ?
              <List>
                <div className="header_item">
                  <a onClick={() => setLoginModal(true)}>로그인</a>
                </div>
                {loginModal ?
                  <LoginPage
                    login={login}
                    setLogin={setLogin}
                  ></LoginPage>
                  :
                  <></>
                }
              </List>
              :
              <List>
                <div className="header_item">{user_account?.profile?.nickname} 님 안녕하세요</div>
                <div className="header_item">
                  <a onClick={kakao_logout}>로그아웃</a>
                </div>
              </List>
            }
            </>
          }
          <List>
          </List>
        </Drawer>
      </div>
      </>
  );
}

export default withRouter(Header_test);