import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Grid from "@mui/material/Grid";

export default function PostFlight() {
  const navigate = useNavigate();

  const [airline, setAirline] = useState("");
  const [type, setType] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [number, setNumber] = useState("");
  const [duration, setDuration] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [stops, setStops] = useState("");
  const [price, setPrice] = useState("");


  let data = JSON.stringify({
    airline:airline,
    arrival:to,
    departure:from,
    duration: duration,
    departureDate: departure,
    arrivalDate: arrival,
    price:price,
    layover:stops,
    type:type,
    flightNumber: number

  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/flight/create",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const handlePost = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.request(config);
      alert("Done");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div  >
      {/* <Paper elevation={3} style={{ maxWidth: 700, maxHeight:500, margin: '0 auto' }} sx={{p:5,mt:4}}  > */}
      <div className="m-5 mx-auto w-75">
        <div className="">
          <Grid container component="main" sx={{ height: "60vh" }}>
            <Grid
              item
              xs={8}
              sm={8}
              md={12}
              component={Paper}
              elevation={3}
              square
              sx={{
                display: 'flex',
  flexDirection: 'column'
              }}
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="form"
                  noValidate
                  onSubmit={(event) => handlePost(event)}
                  sx={{ mt: 5 }}
                >
                  <TextField
                    required
                    fullWidth
                    id="airline"
                    name="airline"
                    autoComplete="airline"
                    autoFocus
                    placeholder="Airline"
                    sx={{ p: 3 }}
                    onChange={(e) => setAirline(e.target.value)}
                  />
                  <br></br>

                  <FormControl  style={{ margin: "20px" }} sx={{ width: 750 }}>
                    <InputLabel id="demo-simple-select-label">
                      Type of User
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      id="type"
                      value={type}
                      label="Type of Flight"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <MenuItem value={"Economy"}>Economy</MenuItem>
                      <MenuItem value={"Economy Premium"}>Economy Premium</MenuItem>
                      <MenuItem value={"Business"}>Business</MenuItem>
                      <MenuItem value={"First Class"}>First Class</MenuItem>
                    </Select>
                  </FormControl>

                  <br></br>

                  <TextField
                    required
                    name="arrival"
                    type="arrival"
                    id="arrival"
                    autoComplete="arrival"
                    placeholder="Arrival Airport"
                    sx={{ p: 3 }}
                    onChange={(e) => setTo(e.target.value)}
                  />

                  <TextField
                    required
                    name="departure"
                    type="departure"
                    id="departure"
                    autoComplete="departure"
                    placeholder="Departure Airport"
                    sx={{ p: 3 }}
                    onChange={(e) => setFrom(e.target.value)}
                  />

                  <TextField
                    required
                    name="number"
                    type="text"
                    id="number"
                    autoComplete="number"
                    placeholder="Flight Number"
                    sx={{ p: 3 }}
                    onChange={(e) => setNumber(e.target.value)}
                  />

                  <br></br>

                  <TextField
                    required
                    name="duration"
                    type="duration"
                    id="duration"
                    autoComplete="duration"
                    placeholder="Flight Duration"
                    sx={{ p: 3 }}
                    onChange={(e) => setDuration(e.target.value)}
                  />

                  <TextField
                    required
                    name="stops"
                    type="number"
                    id="stops"
                    autoComplete="stops"
                    placeholder="Number of Stops"
                    sx={{ p: 3 }}
                    onChange={(e) => setStops(e.target.value)}
                  />
                  <TextField
                    required
                    name="price"
                    type="price"
                    id="price"
                    autoComplete="price"
                    placeholder="Price"
                    sx={{ p: 3 }}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <div className="d-flex flex-row justify-content-around">
                    <label>
                      Departure <br></br> date:
                    </label>
                    <input
                      placeholder="Departure date"
                      type="date"
                      className="m-1 form-control w-25"
                      onChange={(e)=>setDeparture(e.target.value)}
                    />
                    <label>
                      Arrival <br></br> date:
                    </label>
                    <input onChange={(e)=>setArrival(e.target.value)} type="date" className="m-1 form-control w-25" />
                  </div>

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
                  >
                    Post
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
      {/* </Paper> */}
    </div>
  );
}
