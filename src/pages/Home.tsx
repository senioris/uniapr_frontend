import * as React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UniswapIcon from '../assets/uniswap-uni-logo.svg'
import SushiswapIcon from '../assets/sushiswap-sushi-logo.svg'
import { Avatar, Hidden, Switch, useMediaQuery } from '@material-ui/core';
import HomeRooter from './HomeRooter';
import { Link } from 'react-router-dom'
import { Link as MaterialLink } from '@material-ui/core'
import { NightsStayTwoTone as NightsStayIcon } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux';
import { appAction, AppActionType, AppState } from '../redux/App';
import { AllState } from '../redux/All';
import { inherits } from 'node:util';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    title: {
      flexGrow: 1,
    },
    appBarShift: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(6) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(8) + 1,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    listIcon: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    bottomMenu: {
      position: 'absolute',
      bottom: 0,
      width: drawerWidth - theme.spacing(2)
    },
    inline: {
      display: 'flex',
    },
    nightSwitch: {
      display: 'flex',
      flexGrow: 1,
    },
    nightIcon: {
      width: 40,
      height: 40,
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
    donate: {
      paddingTop: theme.spacing(1),
    },
    link: {
      textDecoration: 'none',
      color: "inherit",
    }
  }),
);

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isBrowser = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerOpen = () => {
    if (isBrowser) {
      setOpen(true);
    } else {
      setMobileOpen(true)
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setMobileOpen(false)
  };

  const handleMobileDrawerClose = () => {
    setMobileOpen(false)
  };

  const stateApp = useSelector<AllState, AppState>(state => state.app)
  const dispatch = useDispatch()
  const handleNightSwitchChanged = () => {
    dispatch(appAction(AppActionType.ACTION_DARKMODE, {
      lastUpdate: "",
      isDark: !stateApp.isDark,
      rowsPerPage: 0
    }))
  }

  const drawer = () => {
    return (
      <div>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Uniswap', 'SushiSwap'].map((text, index) => (
            drawerListItem(text)
          ))}
        </List>
      </div>
    ) 
  }

  const drawerListItem = (name: string) => {
    const classes = useStyles();
    switch (name) {
      case 'Uniswap':
        return (
          <Link to="/uniswap" replace className={classes.link} onClick={handleMobileDrawerClose} key={name}>
            <ListItem button key={name}>
              <ListItemIcon>
                <Avatar src={UniswapIcon} className={classes.listIcon} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        )
      case 'SushiSwap':
        return (
          <Link to="/sushiswap" replace className={classes.link} onClick={handleMobileDrawerClose} key={name}>
            <ListItem button key={name}>
              <ListItemIcon>
                <Avatar src={SushiswapIcon} className={classes.listIcon} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        )
      default:
        return ""
    }
  }

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            AMM DEX APR
          </Typography>
        </Toolbar>
      </AppBar>
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer()}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          {drawer()}
          <div className={classes.bottomMenu}>
            <div className={classes.inline}>
              <div className={classes.nightSwitch}>
                <Switch onChange={handleNightSwitchChanged} checked={stateApp.isDark} />
                <NightsStayIcon className={classes.nightIcon} />
              </div>
              <MaterialLink href="https://etherscan.io/address/0x3Ca7C3846B4eBA9e041733514E9D31c7AfbdfbDc"
                target="_blank" rel="noopener noreferrer" className={classes.donate}>
                Donate
            </MaterialLink>
            </div>
          </div>
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <HomeRooter />
      </main>
    </div>
  );
}