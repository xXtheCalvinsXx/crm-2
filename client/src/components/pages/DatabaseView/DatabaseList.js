import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Grid, Button, Divider, IconButton, TextField }
   from '@material-ui/core';
import {
  DataGrid,
  GridToolbarFilterButton,
} from '@material-ui/data-grid';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import { createTheme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      },
      grid: {
        '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus': {
          outline: 'none',
        },
        border: 0,
        overflow: "auto",
        overflowX: 'hidden',
      },
      textField: {
        //[theme.breakpoints.down('l')]: {
          //width: '100%',
        //},
        width : "90%",
        borderBottom : "none",
        margin: theme.spacing(1, 0.5, 1.5),
        '& .MuiSvgIcon-root': {
          marginRight: theme.spacing(0.5),
        },
        '& .MuiInput-underline:before': {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    }),
  { defaultTheme },
);

const heading = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: "username", headerName: "Username", width: 200 },
  { field: "name", headerName: "Name", width: 250 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "phone", headerName: "Phone", width: 200 },
  { field: 'website', headerName: "Web Link", width: 200 }
]

function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        variant="standard"
        //fullWidth 
        //id="fullWidth"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search"
        className={classes.textField}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />

      <div>
        <GridToolbarFilterButton />
      </div>

    </div>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default function DatabaseList() {
  const classes = useStyles();
  const history = useHistory()

  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(resp => resp.json())
      .then(resp => {
        setRows(resp)
      })
      .catch(error => alert('Error! ' + error.message))
  }, [])

  const [searchText, setSearchText] = React.useState('');

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = rows.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  React.useEffect(() => {
    setRows(rows);
  }, [rows]);

  return (
    <Container>
      <div style={{ height: '85vh', width: '100%' }}>
        <Grid
          justifyContent="space-between"
          container 
          spacing={24}
          >
          <Grid item>
            </Grid>
          <Grid item>
            <div>
              <Button startIcon={<CalendarTodayIcon /> } raised color="accent" onClick={() => history.push('/card')}>
                Change View
              </Button>

              <Button startIcon={<AddSharpIcon /> } raised color="accent">
                Add Contact
              </Button>
            </div>
          </Grid>
        </Grid>

        <Divider/>
        <br/>
        <br/>

        <DataGrid
          className={classes.grid}
          rowHeight={65}
          //rowsPerPageOptions={[]}
          components={{ Toolbar: QuickSearchToolbar }}
          rows={rows}
          columns= {heading}
          onCellClick={() => history.push('/view')} //Need to link to particular contact
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event) => requestSearch(event.target.value),
              clearSearch: () => requestSearch(''),
            },
          }}
        />
      </div>
    </Container>
  );
}
