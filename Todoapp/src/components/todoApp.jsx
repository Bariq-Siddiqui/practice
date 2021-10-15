import { useEffect, useState } from 'react';
import './todo.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import bar from './images/bar.png';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import * as yup from 'yup';
import { useFormik } from "formik";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { db } from '../firebase';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';import { collection, addDoc,doc,deleteDoc , query, updateDoc,deleteField, onSnapshot  } from "firebase/firestore";
const userCol = collection(db, "todo")
const validationSchema = yup.object({
    todoItems: yup
    .string('Enter your Todo Items')
    .min(3, 'Todo Items should be of minimum 3 characters length')
    .required('Todo Items is required'),
});

async function del(id) {
  await deleteDoc(doc(userCol, id));
}
// async function deleteAll() {

// }
export default function TodoApp(){
    const [todo,setTodo]=useState([]);
    useEffect(() => {

        const q = query(userCol);
        const unsubscribe = onSnapshot(q, (snapshot) => {
          let todo = [];
          snapshot.forEach((doc) => {
            let data = doc.data();
            let id=doc.id
            todo.unshift(
                {
                    todoItems: data.todoItems,
                    id:id,
                }
            )
          })
          setTodo(todo)
        });
        return () => {
          unsubscribe()
          console.log("unsub")
        };
      }, []);
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            todoItems: '',
        },
        onSubmit: async(values)=> {
            try {
              const docRef = await addDoc(userCol, {
                todoItems: values.todoItems,
              });
              console.log("Document written with ID: ", docRef.id);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }
    });
    
    return(
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='secondary'>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
                        >
                            Todo App
                        </Typography>
                        <Avatar alt="Bariq Siddiqui" src={bar} />
                    </Toolbar>
                </AppBar>
                <Grid container>

                    <Grid item sx={{
                                width: '40%',
                                margin: "auto",
                                marginTop:"2%",
                    }} className='todoWidth'>
                        <form onSubmit={formik.handleSubmit}>
                        <Stack direction="row">
                             <TextField
                                fullWidth
                                color="secondary"
                                id="outlined-basic"
                                label="Todo Items"
                                variant="standard"

                                name="todoItems"
                                value={formik.values.todoItems}
                                onChange={formik.handleChange}

                                error={formik.touched.todoItems && Boolean(formik.errors.todoItems)}
                                helperText={formik.touched.todoItems && formik.errors.todoItems}
                            />
                            <IconButton aria-label="add"  type="submit">
                                <AddCircleIcon style={{ fontSize: 50, color:'purple'}}/>
                            </IconButton>
                            {/* <IconButton onClick={()=>{deleteAll()}}>
                                <DeleteForeverIcon style={{ fontSize: 50, color:'red'}}/>
                            </IconButton> */}
                        </Stack>
                         </form>

                        {/* {todo.map((eachUser, i) => {

                        return (
                            <Grid key={i} marginRight='15%' marginLeft='2%'>
                            <TableContainer component={Paper} elevation={5}>
                                <Table>
                                    <TableCell width='50%'>
                                        <Typography variant="h6" gutterBottom component="div">
                                            {eachUser.todoItems}
                                        </Typography>
                                    </TableCell>
                                    <TableCell width='15%'>
                                        <IconButton onClick={()=>{del(eachUser.id)}}>
                                            <DeleteForeverIcon style={{ fontSize: 40, color:'red'}}/>
                                        </IconButton>
                                    </TableCell>
                                </Table>
                            </TableContainer>
                            </Grid>   
                            )
                        })} */}

                    </Grid>
                </Grid>
            </Box>
        </>
    );
}