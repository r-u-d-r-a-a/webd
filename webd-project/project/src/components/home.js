import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import Login from "./login";
import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [places, setplaces] = useState([
    "Atlanta",
    "Boston",
    "Chicago",
    "Dallas",
    "Denver",
    "Honolulu",
    "LasVegas",
    "London",
    "LosAngeles",
    "Miami",
    "Minneapolis",
    "NewYork",
    "Orlando",
    "Phoenix",
    "Portland",
    "SanFrancisco",
    "Seattle",
  ]);
  const [fromPlace, setFromPlace] = useState("");
  const [toPlace, setToPlace] = useState("");
  const [flag, setFlag] = useState(false);
  const [travelDate, setTravelDate] = useState("");
  const [flights, setFlights] = useState([]);

  const images = [
    "../../assests/7.jpg",
    "../../assests/7.jpg",
    "../../assests/7.jpg",
    // Add more image URLs here
  ];

  // const getDataFromAPI = () => {
  //   console.log("Options Fetched from API")

  //   const arr = [];

  //     for (var i = 0; i < places.length; i++) {
  //       arr.push(places[i])
  //     }
  //     setplaces(arr)

  // }

  const handleClose = () => {
    setOpen(false);
    console.log("page closed");
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const searchFlight = async () => {
    setFlag(true);
    console.log(fromPlace);
    console.log(toPlace);
    console.log(travelDate);
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `http://localhost:3000/flight?arrival=${toPlace}&departure=${fromPlace}&date=${travelDate}`,
        headers: {},
      };

      const avaliabeFlights = await axios(config);
      setFlights(avaliabeFlights.data);
      console.log(avaliabeFlights.data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteFlight = async (event, flight) => {
    event.stopPropagation();
    const row = document.getElementById(flight._id);
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/flight/66213a2d294e7a0ef7f31985',
      headers: { 
        'Content-Type': 'application/json'
      }
    }
    row.innerHTML=""
    try{
      const response = await axios(config);
      if(response){
        alert("Flight Deleted")
      }
    } catch(e){
      console.log(e);
    }
    console.log(flight);
  };

  return (
    <div>
      <Container maxWidth="xxl" sx={{ backgroundColor: "#05203c", p: 3 }}>
        <br></br>
        <Typography
          variant="h4"
          noWrap
          href="#app-bar-with-responsive-menu"
          sx={{
            my: 3,
            mx: 4,
            flexDirection: "column",
            alignItems: "center",
            display: { xs: "none", md: "flex" },
            fontFamily: "Rubik",
            fontWeight: 500,
            color: "white",
            textDecoration: "none",
          }}
        >
          Millions of cheap flights. One simple search.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            "@media (min-width: 600px)": {
              flexDirection: "row",
            },
          }}
        >
          <Box sx={{ marginBottom: { xs: 2, md: 0 }, marginRight: { md: 1 } }}>
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-departure"
              options={places}
              sx={{ width: 210 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ backgroundColor: "white" }}
                  id="departure"
                  placeholder="Departure"
                  sx={{ m: 1 }}
                  onSelect={(e) => setFromPlace(e.target.value)}
                />
              )}
            />
          </Box>

          <Box sx={{ marginBottom: { xs: 2, md: 0 }, marginLeft: { md: 1 } }}>
            <Autocomplete
              disablePortal
              fullWidth
              id="combo-box-arrival"
              options={places}
              sx={{ width: 210 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ backgroundColor: "white" }}
                  id="arrival"
                  placeholder="Arrival"
                  sx={{ ml: { xs: 0, md: 4 } }}
                  onSelect={(e) => setToPlace(e.target.value)}
                />
              )}
            />
          </Box>

          <div
            className="d-flex flex-row justify-content-around"
            sx={{ width: { xs: "100%", md: "auto" } }}
          >
            <input
              placeholder="Departure date"
              type="date"
              className="form-control w-25"
              sx={{ width: { xs: "100%", md: "25%" } }}
              onChange={(e) => setTravelDate(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              color: "white",
              borderRadius: "2px",
              marginTop: { xs: 2, md: 0 },
            }}
            onClick={(event) => searchFlight(event)}
          >
            Search flights
          </Button>
        </Box>
      </Container>

      {flag ? (
        <div className="mt-5 mx-auto w-100 d-flex justify-content-center">
          <TableContainer sx={{ width: "75%" }} component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Airline</TableCell>
                  <TableCell>Departure/Arrival</TableCell>
                  <TableCell>Travel Time</TableCell>
                  <TableCell>Layover</TableCell>
                  <TableCell>Price</TableCell>

                  {user?.type == "admin" ? (
                    <TableCell>Delete</TableCell>
                  ) : (
                    <></>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {flights.map((flight) => (
                  <TableRow
                    id={`${flight._id}`}
                    onClick={() =>
                      user
                        ? navigate(`/flightDetails/${flight._id}`)
                        : handleOpen()
                    }
                  >
                    <TableCell>
                      <img
                        width={50}
                        className="m-4"
                        alt=""
                        src={`../../assests/${flight.airline}.png`}
                      />{" "}
                      {flight.airline}
                    </TableCell>
                    <TableCell>
                      {flight.arrivalDate} - <br></br> {flight.departureDate}
                    </TableCell>
                    <TableCell>{flight.duration}</TableCell>
                    <TableCell>{flight.layover} stops</TableCell>
                    <TableCell>${flight.price}</TableCell>
                    {user?.type == "admin" ||
                    (user?.type == "provider" &&
                      user.firstName == flight?.providerName) ? (
                      <TableCell>
                        <Button
                          onClick={(event) => deleteFlight(event, flight)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    ) : (
                      <></>
                    )}
                  </TableRow>
                ))}
                <Box sx={{ flexGrow: 0 }}>
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={open}
                    //onClick={handleClose}
                  >
                    <Login handleClose={handleClose} />
                  </Backdrop>
                </Box>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <Container
          maxWidth="xl"
          sx={{
            my: 6,
            mx: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            style={{
              borderRadius: "2%",
              width: "100%", // Ensure image takes up full width of container
              maxWidth: "100%", // Ensure image doesn't exceed its natural width
            }}
            src="../../assests/1.jpg"
            alt="Image"
          />
        </Container>
      )}
    </div>
  );
}
