import React from 'react';
import { Drawer, AppBar, Toolbar, Grid, IconButton, Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import ContactsIcon from '@material-ui/icons/Contacts';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ContactCard from '../../card/ContactCard';
import AddContact from '../AddContact/AddContact';
import Layout from '../../layout/Layout';

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
      <Layout />
      
      <div className={classes.page}>
        <Grid
        justifyContent="space-between"
        container 
        spacing={24}
        >
          <Grid item>
            <AddContact />
          </Grid>
          <Grid item>
            <div>
              <Button endIcon={<ListAltIcon /> } raised color="accent">
                Change View
              </Button>
            </div>
          </Grid>
        </Grid>
        <Divider/>
        <br/>
        <br/>
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