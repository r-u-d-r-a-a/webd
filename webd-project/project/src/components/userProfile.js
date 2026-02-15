import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserProfile() {

  const [booking, setBooking] =useState([]);
  const [name, setName] = useState("");

  const user = useSelector(state=>state.user);
    const dispatch = useDispatch();

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://localhost:3000/booking?email=${user?.email}`,
    headers: {},
  };

  const apiCall = async () =>
  {
    const response = await axios(config);
    console.log(response.data);
    setBooking(response.data.bookings)
    
    console.log(booking)
  }

  useEffect(() => {

    apiCall();
    
  },[]);


  return (
    <div>
        
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      {/* <MDBContainer className="py-5 h-500">
        <MDBRow className="justify-content-center align-items-center h-500">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src=""
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">{name}</MDBTypography>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">info@example.com</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">info@example.com</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer> */}
      <h1 className='mt-5 text-center'>My Bookings</h1>
    <TableContainer className="mt-5 mx-auto" sx={{ width: "75%" }} component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Airline</TableCell>
                  <TableCell>Departure/Arrival</TableCell>
                  <TableCell>Travel Time</TableCell>
                  <TableCell>Layover</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {booking?.map((flight) => (
                 <TableRow>
                      <TableCell>
                        <img
                          width={100}
                          className="m-4"
                          alt=""
                          src={`../../assests/${flight[0].airline}.png`}
                        />{" "}
                        {flight.airline}
                      </TableCell>
                      <TableCell>
                        {flight.arrivalDate} - <br></br> {flight[0].departureDate}
                      </TableCell>
                      <TableCell>{flight[0].duration}</TableCell>
                      <TableCell>{flight[0].layover} stops</TableCell>
                      <TableCell>${flight[0].price}</TableCell>
                      
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </section>
    </div>
    
  )
}
