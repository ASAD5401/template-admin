import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
} from '@mui/material';
import { axiosApi } from 'src/service/apiEnviornment';
import Button from '@mui/material/Button';
import PencilIcon from "../assets/edit.png"
import DeleteIcon from "../assets/trash.png"
import Iconify from 'src/components/iconify/Iconify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// components

import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead } from '../sections/@dashboard/user';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'firstName', label: 'First Name', alignRight: false },
  { id: 'lastName', label: 'Last Name', alignRight: false },
  { id: 'cnic', label: 'CNIC', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
];

// ----------------------------------------------------------------------




export default function AdminPage() {
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    cnic: '',
    phone: '',
    password: '',
    email: '',
    role: 'Admin'
  })
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(false);
  const [edit, setEdit] = useState(false)
  const [tokens, setTokens] = useState(0)
  const [isDisabeld, setIsDisabeld] = useState(false)
  const [add, setAdd] = useState(false)
  const inputhandler = (event) => {
    const name = event.target.name;
    const value = event.target.value
    setInfo({ ...info, [name]: value })
  }
  const handleFailure = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClose = () => {
    setEdit(false);
    setAdd(false);
    setInfo({
      firstName: "",
      lastName: '',
      cnic: '',
      phone: '',
      password: '',
      email: '',
      role: 'Admin'
    })

  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const getData = async () => {
    setLoader(true)
    await axiosApi("GET", `/employee/get-admin`)
      .then((res) => {
        console.log(res)
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoader(false)

  };
  useEffect(() => {
    getData()
  }, [])
  const updateData = async () => {
    setIsDisabeld(true)
    await axiosApi("PUT", `/employee/${info._id}`, info)
      .then((res) => {
        console.log(res)
        if (res.status == 409) {
          handleFailure(res.message)
        } else if (res.status == 404) {
          handleFailure(res.message)
        } else if (res.status == 400) {
          handleFailure(res.message)

        } else {
          handleSuccess("Employee updated successfully!!!")
          getData()

        }
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose()
    setIsDisabeld(false)
  }
  const addData = async () => {
    setIsDisabeld(true)
    await axiosApi("POST", `/auth/new-employee`, info)
      .then((res) => {
        console.log(res)
        if (res.status == 409) {
          handleFailure(res.message)
        } else if (res.status == 404) {
          handleFailure(res.message)
        } else if (res.status == 400) {
          handleFailure(res.message)

        } else {
          handleSuccess("Employee add successfully!!!")
          getData()

        }
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose()
    setIsDisabeld(false)
  }
  const del = async (id) => {
    await axiosApi("DELETE", `/employee/${id}`)
      .then((res) => {
        handleSuccess("Employee deleted successfully!!!")
        getData()
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Helmet>
        <title> Admins  </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Admins
          </Typography>
          <Button onClick={() => { setAdd(true) }} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Admin
          </Button>
        </Stack>
        {loader ? <div style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </div>
          :
          <Card>

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    headLabel={TABLE_HEAD}
                    rowCount={data.length}
                  />

                  <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      const { firstName, lastName, cnic, phone } = row;

                      return (
                        <TableRow key={index}  >
                          <TableCell align="left">{firstName}</TableCell>
                          <TableCell align="left">{lastName}</TableCell>
                          <TableCell align="left">{cnic}</TableCell>
                          <TableCell align="left">{phone}</TableCell>

                          <TableCell style={{ display: "flex", justifyContent: "space-around" }} align="left">
                            <img style={{ cursor: "pointer", marginLeft: "15px" }} src={PencilIcon} onClick={() => { setInfo(row); setEdit(true) }}></img>
                            <img style={{ cursor: "pointer", marginLeft: "15px" }} src={DeleteIcon} onClick={() => { del(row._id) }}></img>

                          </TableCell>

                        </TableRow>
                      );
                    })}

                  </TableBody>




                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        }
        <Dialog
          open={edit || add}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
          {add?"New Admin":"Update Admin"}
          </DialogTitle>
          <DialogContent style={{ minWidth: "600px" }}>
            <div>
              First Name
              <TextField onChange={inputhandler} value={info.firstName} name="firstName" style={{ width: "100%" }}></TextField>
            </div>
            <div>
              Last Name
              <TextField onChange={inputhandler} value={info.lastName} name="lastName" style={{ width: "100%" }}></TextField>
            </div>
            {(!edit) ?
              <div>
                CNIC
                <TextField type='number' onChange={inputhandler} value={info.cnic} name="cnic" style={{ width: "100%" }}></TextField>
              </div>
              : null
            }

            <div>
              Phone
              <TextField type='number' onChange={inputhandler} value={info.phone} name="phone" style={{ width: "100%" }}></TextField>
            </div>
            <div>
              Email
              <TextField onChange={inputhandler} value={info.email} name="email" style={{ width: "100%" }}></TextField>
            </div>
            <div>
              Password
              <TextField onChange={inputhandler} value={info.password} name="password" style={{ width: "100%" }}></TextField>
            </div>


          </DialogContent>
          <DialogActions>
            {add ?
              <Button disabled={isDisabeld} onClick={() => addData()}>Add</Button>
              :
              <Button disabled={isDisabeld} onClick={() => updateData()}>Update</Button>
            }

          </DialogActions>
        </Dialog>
      </Container>
      <ToastContainer />

    </>
  );
}
