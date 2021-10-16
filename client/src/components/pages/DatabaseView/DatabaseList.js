import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Grid, Button, Divider, IconButton, TextField, Typography }
   from '@material-ui/core';
import {
  DataGrid,
  GridToolbarFilterButton
  //GridApi,
  //GridCellValue,
  //GridCellParams
} from '@material-ui/data-grid';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import { createTheme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow } 
  from '@material-ui/core';

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
      dialogCustomizedWidth: {
        "max-width": "80%",
        minHeight: '80vh',
        maxHeight: '80vh',
      },
      table: {
        minWidth: 500,
        border: 0,
      },
      cell: {
        borderBottom: 'none'
      }
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

function createData(date, name, description, notes) {
  return { date, name, description, notes };
}

const rows1 = [
  createData('Mon 13 Aug', 'Calvin Shen', 'Coffee Catchup', '...'),
  createData('Thurs 16 Aug', 'Nimit Agrawal', 'Coffee Catchup', '...'),
];

type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  website: string;
};

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          onCellClick= {handleClickOpen}//{() => history.push('/view')} 
          autoHeight={true}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event) => requestSearch(event.target.value),
              clearSearch: () => requestSearch(''),
            },
          }}
        />
      </div>
      <div className={classes.root}>
        <Dialog
            fullWidth
            classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
            open={open}
            onClose={handleClose}
          >
            <Grid
              justifyContent="space-between"
              container 
              spacing={12}
              >
              <Grid item>
                </Grid>
              <Grid item>
                  <div>
                    <DialogActions>
                      <Button onClick={handleClose}>Edit</Button>
                
                      <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                  </div>
              </Grid>
            </Grid>

            <Divider/>

            <DialogTitle>
                <PersonOutlineIcon style={{ fontSize: 90 }} />
                <Typography gutterBottom variant='h4'>
                  Leanne Graham
                </Typography>
            </DialogTitle>
            
            <DialogContent>
              
              <Typography gutterBottom variant='h5'>
                Future Interactions
              </Typography>
            
              <DialogContentText>
                <TableContainer>
                  <Table className={classes.table}>
                    <TableHead> 
                      <TableRow>
                        <TableCell className={classes.cell}>
                          <Typography> Date </Typography>
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                          <Typography> Name </Typography>
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                          <Typography> Description </Typography>
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                          <Typography> Notes </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody onClick={() => history.push('/view')}>
                      {rows1.map((row) => (
                        <TableRow className={classes.row} key={row.date}>
                          <TableCell className={classes.cell} component="th" scope="row">
                            <Typography> {row.date} </Typography>
                          </TableCell>
                          <TableCell className={classes.cell} align="left">
                            <Typography> {row.name} </Typography>
                          </TableCell>
                          <TableCell className={classes.cell} align="left">
                          <Typography> {row.description} </Typography>
                          </TableCell>
                          <TableCell className={classes.cell} align="left">
                          <Typography> {row.notes} </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </DialogContentText>

              <br/>
            
              <Typography gutterBottom variant='h5'>
                Details
              </Typography>

              <DialogContentText>
                Api
              </DialogContentText>
            
              <br/>
         
              <Typography gutterBottom variant='h5'>
                Notes
              </Typography>

              <DialogContentText>
                Api
              </DialogContentText>
            
              <br/>
            
              <Typography gutterBottom variant='h5'>
                Past Interactions
              </Typography>

              <DialogContentText>
                <TableContainer>
                  <Table className={classes.table}>
                    <TableHead> 
                      <TableRow>
                        <TableCell className={classes.cell}>
                          <Typography> Date </Typography>
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                          <Typography> Name </Typography>
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                          <Typography> Description </Typography>
                        </TableCell>
                        <TableCell className={classes.cell} align="left">
                          <Typography> Notes </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody onClick={() => history.push('/view')}>
                      {rows1.map((row) => (
                        <TableRow className={classes.row} key={row.date}>
                          <TableCell className={classes.cell} component="th" scope="row">
                            <Typography> {row.date} </Typography>
                          </TableCell>
                          <TableCell className={classes.cell} align="left">
                            <Typography> {row.name} </Typography>
                          </TableCell>
                          <TableCell className={classes.cell} align="left">
                          <Typography> {row.description} </Typography>
                          </TableCell>
                          <TableCell className={classes.cell} align="left">
                          <Typography> {row.notes} </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </DialogContentText>
            </DialogContent>

              <br/>

          </Dialog>
        
      </div>
    </Container>
  );
}
