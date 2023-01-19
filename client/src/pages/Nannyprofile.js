import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_USER } from "../utils/queries";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBCardText,
} from "mdb-react-ui-kit";
import "@fortawesome/react-fontawesome";
import Auth from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/react-fontawesome";
import NannyList from "./NannyList"

const Nannyprofile = () => {
  const { _id } = useParams();

  const { data, loading, error } = useQuery(QUERY_SINGLE_USER, {
    variables: { _id: _id },
  });
  console.log(data);

  const user = data?.user || {};
  console.log(user);



  if (loading)
    return (
      <img
        src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
        className="animation"
        alt="loading"
      />
    );
  if (error) {
    console.log(error);
    return (<h4 className="text-secondary m-3 text-center">Please login to view this page</h4>)
  }

  return (

    <div
      className=" w-100 p-3 my-4 "
      style={{
        backgroundColor: "#eee",
        backgroundImage:
          "url(https://thumbs.dreamstime.com/z/paw-prints-background-6936081.jpg)",
        minHeight: "1200px",
      }}
    >
      <MDBContainer className="my-4">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="12">
            <MDBCard className="w-auto">
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: "#333", height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <MDBCardImage
                    src={user.picture}
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{
                      width: "150px",
                      zIndex: "1",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <MDBTypography tag="h5">
                    {user.firstName} {user.lastName}
                  </MDBTypography>
                  
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5"></MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                    email: {user.email}
                    </MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                    Address: {user.address} {user.postcode}
                    </MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1 text-secondary">About me:</p>
                  <div
                    className="p-4 border rounded"
                    style={{
                      backgroundColor: "#f8f9fa",
                      paddingLeft: "500px",
                      paddingRight: "500px",
                    }}
                  >
                    <MDBCardText className="font-italic mb-1">
                      {user.description}
                    </MDBCardText>
                  </div>
                </div>
              </MDBCardBody>
              <div> 
                <Link to={`/bookingPage/${user._id}`}>
                <button
                  type="button"
                  id={user._id}
                  style={{ marginBottom: "25px" }}
                  class="btn btn-secondary"
                  // onClick={() => {window.location.assign(`/bookingPage/${user._id}`)} }
                >
                  <FontAwesomeIcon far icon={faClock} /> Book now
                </button>
                </Link>
              </div>
              <div className="order-container">
                    <NannyList />
                </div>
            </MDBCard>
              
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Nannyprofile;
