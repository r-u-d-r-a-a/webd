import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FlightDetails() {
  let { id } = useParams();
  let [flight, setFlight] = useState({});
  let [email, setEmail] = useState("");

  const navigate = useNavigate(); 

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/booking/create?email=${email}&flightNumber=${flight?.flightNumber}`,
    headers: { }
  };

  const onPageLoad = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/flight/${id}`,
      headers: {},
    };
    const flightDetails = await axios(config);
    console.log(flightDetails.data);
    setFlight(flightDetails.data);
  };

  const handleBooking = async (event) =>
  {
    event.preventDefault();
    try {
      const response = await axios.request(config);
      console.log(response);
      alert("Done");
      navigate("/");
    } catch (error) {
      console.log(error);
    } 
  }

  useEffect(() => {
    onPageLoad();
  }, []);

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <div>
      {/* {id} */}
      <Typography
        variant="h6"
        noWrap
        href="#app-bar-with-responsive-menu"
        sx={{
          p: 3,
          m: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "Rubik",
          fontWeight: 500,
          color: "black",
          textDecoration: "none",
        }}
      >
        Your flight details:
      </Typography>
      <Container sx={{ p: 3, m: 2 }}>
        <Card sx={{ width: 750, p: 4 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {flight.airline}
            </Typography>
            <Typography variant="h6" component="div">
              {bull} 7:30 pm, {flight?.departure} Airport
            </Typography>
            <Typography color="text.secondary">
              Travel time: {flight.duration}
            </Typography>
            <Typography variant="h6" component="div">
              {bull} 2:55 am, {flight.arrival} Airport
            </Typography>
            <br></br>
            <Typography variant="body2">
              {flight?.type} {flight?.flightNumber}
            </Typography>
          </CardContent>
        </Card>
      </Container>

      <Typography
        variant="h6"
        noWrap
        href="#app-bar-with-responsive-menu"
        sx={{
          p: 3,
          m: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "Rubik",
          fontWeight: 500,
          color: "black",
          textDecoration: "none",
        }}
      >
        Passenger details:
      </Typography>

      <Container sx={{ p: 3, m: 2 }}>
        <Card sx={{ width: 750, p: 4 }}>
          <CardContent>
            <Box component="form" noValidate sx={{ mt: 1, width: 500 }}>
              <TextField
                id="firstName"
                label="First Name "
                variant="outlined"
                style={{ margin: "20px" }}
              />
              <TextField
                id="-lastName"
                label="Last Name "
                variant="outlined"
                style={{ margin: "20px" }}
              />
              <TextField
                fullWidth
                id="passport"
                label="Passport Number "
                variant="outlined"
                style={{ margin: "20px" }}
              />
              <br></br>
              <TextField
                fullWidth
                id="email"
                label="Email "
                variant="outlined"
                style={{ margin: "20px" }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <br></br>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "20px",
                }}
                sx={{ mt: 3, mb: 2 }}
                onClick={(e)=>{handleBooking(e)}}
              >
                Book ticket
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
