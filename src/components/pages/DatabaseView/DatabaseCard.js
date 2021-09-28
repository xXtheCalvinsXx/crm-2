import React from 'react';
import { Drawer, AppBar, Toolbar, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import ContactsIcon from '@material-ui/icons/Contacts';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TuneIcon from '@material-ui/icons/Tune';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ContactCard from '../../card/ContactCard';

const drawerWidth = 40;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  page: {
    width: '100%',
    padding: theme.spacing(10),
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: theme.palette.primary,
  },
  drawerPaper: {
    width: 60,
  },
  title: {
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function DatabaseCard() {
  const classes = useStyles();
  /*const [contacts, setContacts] = useState([])

  useEffect(() => {
    fetch()
      .then(res => res.json())
      .then(data => setContacts(data))
  }, []) 
  {contacts.map(contact => (
            <Grid item key={contact.id} xs={12} md={6} lg={4}>
              <ContactCard />
            </Grid>
          ))}

  {contacts.map(contact => (
        <p key={contacts.id}>{ contact.title }</p>
      ))}
  */

  return (
    <div className={classes.root}>
      <AppBar position="fixed"
        className={classes.appBar}
        style={{
          color: '#cfd8dc',
          boxShadow: "0px 0px 0px 0px"
        }}>
        <Toolbar>
          <Grid
            justifyContent ="space-between" // Add it here :)
            container spacing={10}
          >
            <Grid item>
              
            </Grid>
            <Grid item>
              <div>
                <IconButton>
                  <MoreHorizIcon fontSize="small"/>
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left">
        <div className={classes.toolbar} />
        <IconButton>
          <HomeIcon style={{ fontSize: 30 }} />
        </IconButton>
        <IconButton>
            <ContactsIcon style={{ fontSize: 30 }} />
        </IconButton>
      </Drawer>
      
      <div className={classes.page}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <ContactCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ContactCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ContactCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ContactCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ContactCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ContactCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ContactCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ContactCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ContactCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ContactCard />
          </Grid><Grid item xs={12} sm={6} md={4}>
            <ContactCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ContactCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ContactCard />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default DatabaseCard;