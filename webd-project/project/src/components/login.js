import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Navbar from './navbar';
import axios from 'axios';
import Button from '@mui/material/Button';
import { addUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';



export default function Login({handleClose}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate()


    const user = useSelector(state=>state.user);
    const dispatch = useDispatch();

    let data = JSON.stringify({
      "email": email,
      "password": password
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/users/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };


    const handleLogin = async (event) => {
      event.preventDefault();
      event.stopPropagation();
      try{
        const response = await axios.request(config);
        
        console.log(response.data)
        
        dispatch(addUser(response.data))
        navigate("/")
        handleClose();
        
      } catch(error){
        console.log(error)
        console.log(error.response.status);
        if (error.response.status == 404) {
          setErrMsg("Username not found");
        }
        else if (error.response.status == 401) {
          setErrMsg("Invalid credentials");
        }
        
      }
    }

    return (
        <div>
         <Container fixed >
          <Box sx={{ bgcolor: 'white', height: '80vh', width: '60vh', borderRadius: '2%' }} >
          
          <Box
            sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
            }}
            >
          <Box mt={15} sx={{my: 6,
            mx: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left'}} >
              
          <Typography variant="h4" style={{ textAlign: 'left', fontWeight: 'bold',color:'#0062e3' }} >
                Skyscanner
                
            </Typography>
            <br></br>
            <Typography variant="h5" style={{ textAlign: 'left', fontWeight: 'bold',color:'black' }} >
            Get the full experience
            </Typography>
            <br></br>
            <Typography variant="text" style={{ textAlign: 'left',color:'black' }} >
            Track prices, make trip planning easier, and enjoy faster booking.
            </Typography>
        </Box>
        <Box mt={2} >
            <text style={{color:"red"}} >{errMsg}</text> 
          </Box>
        <Box component="form" noValidate onSubmit={(event)=>handleLogin(event)} sx={{ mt: 1 }}>
          <TextField
            //margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onClick={(e)=>e.stopPropagation()}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
            <h4 style={{ marginBottom: 2, paddingBottom: 2 }} >Password</h4>
          <TextField
            //margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onClick={(e)=>e.stopPropagation()}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ backgroundColor: 'black', color: 'white', borderRadius: '20px' }}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Typography variant="text" style={{ textAlign: 'left',color:'black' }} >
            Don't have an account yet? <Link to="/signup" onClick={handleClose} style={{color:"#0062e3",fontWeight:"bold",textDecoration:"none"}}>Sign up</Link>
            </Typography>
        </Box>
          </Box>
    
      </Box>
      </Container>
      
        </div>
    )
}
