import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLightbulb, faStar} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/react-fontawesome';
// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";
import { chunk } from "lodash";

const AllNannyList = ({ profiles }) => {
  if (!profiles) {
    return <h3>No Profiles Yet</h3>;
  }
  const profileRows = chunk(profiles, 3);
  return (
    <div className=" w-100 p-3 my-4 " style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="my-4">
        {profileRows.map((profileRow) => (
          <MDBRow>
            {profileRow.map((profile) => (
              <MDBCol md="4" >
                <MDBCard
                  className="w-auto mx-3 my-2 "
                  style={{ borderRadius: "15px", backgroundColor: "#ffff",  }}
                >
                  <MDBCardBody className="p-4 text-black">
                    <div>
                      <MDBTypography tag="h5">
                        {profile.firstName} {profile.lastName}
                      </MDBTypography>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="small mb-0">
                          <MDBIcon far icon="clock me-2" />3 hrs
                        </p>
                        <p className="fw-bold mb-0">$90</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-4">
                      <div className="flex-shrink-0">
                        <MDBCardImage
                          style={{ width: "75px" }}
                          className="img-fluid rounded-circle border border-dark border-3"
                          src={
                            profile.picture
                          }
                          alt="img"
                          fluid
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="d-flex flex-row align-items-center mb-2">
                          <div>
                            <p className="mb-0 me-2">{profile.description }</p>
                            <p
                              className="mb-0 me-0"
                              style={{ fontSize: "13px", fontWeight: "bold" }}
                            >
                              postcode: {profile.postcode}{" "}
                            </p>
                          </div>
                          <ul
                            className="mb-0 list-unstyled d-flex flex-row"
                            style={{ color: "#1B7B2C" }}
                          >
                            <li>
                            <FontAwesomeIcon icon={faStar}/>
                            </li>

                            <li>
                            <FontAwesomeIcon icon={faStar}/>
                            </li>
                            <li>
                            <FontAwesomeIcon icon={faStar}/>
                            </li>
                            <li>
                            <FontAwesomeIcon icon={faStar}/>
                            </li>
                            <li>
                            <FontAwesomeIcon icon={faStar}/>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <button type="button" class="btn btn-primary">
                      <MDBIcon far icon="clock me-2" /> Book now
                    </button>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        ))}
      </MDBContainer>
    </div>
  );
};

export default AllNannyList;
