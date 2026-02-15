import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Signup() {

  const user = useSelector(state=>state.user);
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  //const [confirmPassword, setcConfirmPassword] = useState("");

  let data = JSON.stringify({
    "firstName": firstName,
    "lastName": lastName,
    "email": email,
    "password": password,
    "type":type
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/users/create',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  const handlePost = async (event) =>
  {
    event.preventDefault();
    //console.log(firstName,lastName,email,password,type)
      try{
        const response = await axios.request(config)
        
        console.log(response.status)
        alert("Done")
        navigate("/")
        
      } catch(error){
        console.log(error)
        console.log(error.response.status);
        if (error.response.status == 404) {
          //setErrMsg("Username not found");
        }
        else if (error.response.status == 401) {
          //setErrMsg("Invalid credentials");
        }
        
      }
  }

  return (
    <div>
    {(!user) ? 
    
      <div>
      <Grid container component="main" sx={{ height: '100vh' }}>
    
    <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
    <Box
sx={{
  my: 8,
  mx: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}}
>
<Typography variant="h5" style={{ textAlign: 'left', fontWeight: 'bold',color:'black' }} >
            Sign up 
</Typography>

<Box component="form" noValidate onSubmit={event=>handlePost(event)} sx={{ mt: 5 }}>
  
<TextField id="firstName" label="First Name " variant="outlined" style={{margin:"20px"}} onChange={(e) => setFirstName(e.target.value)}/>
<TextField id="-lastName" label="Last Name " variant="outlined" style={{margin:"20px"}} onChange={(e) => setLastName(e.target.value)} />
<FormControl style={{margin:"20px"}}  sx={{width: 250}} >
<InputLabel id="demo-simple-select-label" >Type of User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="type"
          value={type}
          label="Type of User"
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value={"user"}>User</MenuItem>
          <MenuItem value={"provider"}>Provider</MenuItem>
        </Select>
</FormControl>
<Box>
  <TextField
    fullWidth
    style={{margin:"20px"}}
    id="email"
    name="email"
    autoComplete="email"
    autoFocus
    label="Email"
    onChange={(e) => setEmail(e.target.value)}
  />
  <br></br>
    
  <TextField
    fullWidth
    style={{margin:"20px"}}
    id="password"
    name="password"
    autoComplete="password"
    autoFocus
    label="Password"
    onChange={(e) => setPassword(e.target.value)}
  />

<TextField
    fullWidth
    style={{margin:"20px"}}
    id="confirmPassword"
    name="confirmPassword"
    autoComplete="confirmPassword"
    autoFocus
    label="Confirm Password"
    //onChange={(e) => setConfirmPassword(e.target.value)}
  />
</Box>

  <br></br>
  <br></br>
    
  

    <br></br>
    
  

  <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    style={{ backgroundColor: 'black', color: 'white', borderRadius: '20px' }}
    sx={{ mt: 3, mb: 2 }}
  >
    Create
  </Button>
</Box>
    </Box>
    </Grid>
</Grid>
      </div>
      :
        navigate("/home")
    }
    </div>
  )
}
