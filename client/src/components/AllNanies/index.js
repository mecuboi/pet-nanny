import React, { useState } from "react";
import { indexOfAll, arrayUnique } from "../../utils/utilfunction";
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
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faStar,
  faMagnifyingGlass,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/react-fontawesome";
// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";
import { chunk } from "lodash";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AllNannyList = ({ profiles }) => {
  let sortProfile = [...profiles];

  const [nannyname, setnannyName] = useState("");
  const [renderProfile, setrenderProfile] = useState(profiles);

  const [isClicked, setisClicked] = useState(true);
  const [openProfileId, setOpenProfileId] = useState()
  

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      searchNanny();
    }
  };

  const searchNanny = () => {
    const nannyFirstName = [];
    const nannylastName = [];
    for (let i = 0; i < profiles.length; i++) {
      nannyFirstName.push(profiles[i].firstName.toLowerCase());
      nannylastName.push(profiles[i].lastName.toLowerCase());
    }
    const queryNannies = indexOfAll(nannyFirstName, nannyname.toLowerCase());
    const queryNannieslast = indexOfAll(nannylastName, nannyname.toLowerCase());
    const nannyArray = arrayUnique([...queryNannies, ...queryNannieslast]);

    const profileArray = [];

    for (let i = 0; i < nannyArray.length; i++) {
      profileArray.push(profiles[nannyArray[i]]);
    }

    setrenderProfile(profileArray);
    setnannyName("");
  };

  const alphabeticalSort = () => {
    sortProfile.sort((a, b) =>
      a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1
    );
    setisClicked(!isClicked)
    if (isClicked === true){
      setrenderProfile(sortProfile)
    } else {
    sortProfile.reverse();
    setrenderProfile(sortProfile);
  }};

  if (!profiles) {
    return <h3>No Profiles Yet</h3>;
  }
  const profileRows = chunk(renderProfile, 3);
  return (
    <div>
      <div className="d-flex flex-row pt-3 my-1 justify-content-center">
        <MDBCol md="10" style={{ marginLeft: "2%", paddingRight: "1px" }}>
          <div className="input-group md-form form-sm form-1 pl-0">
            <input
              className="form-control my-0 py-1"
              type="text"
              value={nannyname}
              onChange={(e) => {
                setnannyName(e.target.value);
              }}
              onKeyDown={handleEnterKey}
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-prepend">
              <button className="btn btn-secondary mx-1" onClick={searchNanny}>
                <span
                  className="input-group-text purple lighten-3"
                  id="basic-text1"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
                </span>
              </button>
            </div>
          </div>
        </MDBCol>

        <Dropdown style={{ marginTop: "2px" }} >
          <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="px-4 py-2">
            Sort
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              href="#/sort/A - Z"
              onClick={alphabeticalSort}
              
            >
              A - Z
            </Dropdown.Item>
            <Dropdown.Item href="#/sort/Price">Price</Dropdown.Item>
            <Dropdown.Item href="#sort/Nearest to me">
              Nearest to me
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

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
          {profileRows.map((profileRow) => (
            <MDBRow key={profileRow.id}>
              {profileRow.map((profile) => (
                <MDBCol key={`${profile.id}-col`} md="4">
                  <MDBCard
                    className="w-auto mx-3 my-2 "
                    style={{ borderRadius: "15px", backgroundColor: "#ffff" }}
                  >
                    <MDBCardBody className="p-4 text-black">
                      <div>
                        <Link
                          to={`${profile._id}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "boldest",
                          }}
                        >
                          <MDBTypography tag="h5">
                            {profile.firstName} {profile.lastName}
                          </MDBTypography>
                        </Link>
                      </div>
                      <div className="d-flex align-items-center justify-content-center mt-3 mb-2">
                        <div className="flex-shrink-0">
                          <Link to={`${profile._id}`}>
                            <MDBCardImage
                              style={{ width: "150px", height: "150px", objectFit:'cover' }}
                              className="img-fluid rounded-circle border border-dark border-3"
                              src={profile.picture}
                              alt="img"
                              fluid
                            />
                          </Link>
                        </div>
                        
                      </div>
                      <div className="flex-grow-1 ms-3">
                          <div className="d-flex flex-row align-items-center justify-content-center mb-2">
                            
                            <ul
                              className="mb-0 list-unstyled d-flex flex-row"
                              style={{ color: "#1B7B2C",  }}
                            >
                              <li>
                                <FontAwesomeIcon
                                  icon={faStar}
                                  style={{ color: "gold", marginTop: "30px" }}
                                />
                              </li>
                              <li>
                                <FontAwesomeIcon
                                  icon={faStar}
                                  style={{ color: "gold", marginTop: "30px" }}
                                />
                              </li>
                              <li>
                                <FontAwesomeIcon
                                  icon={faStar}
                                  style={{ color: "gold", marginTop: "30px" }}
                                />
                              </li>
                              <li>
                                <FontAwesomeIcon
                                  icon={faStar}
                                  style={{ color: "gold", marginTop: "30px" }}
                                />
                              </li>
                              <li>
                                <FontAwesomeIcon
                                  icon={faStar}
                                  style={{ color: "#bbb", marginTop: "30px" }}
                                />
                              </li>
                            </ul>
                          </div>
                        </div>
                      <hr />
                      <div className="flex-grow-1 ms-3">
                          <div className="d-flex flex-row align-items-center justify-content-center mb-2">
                            
                            <ul
                              className="mb-0 list-unstyled d-flex flex-row"
                              
                            >
                              <li>
                                <p className="text-secondary">{profile.email}</p>
                                
                              </li>
                              
                            </ul>
                          </div>
                        </div>
                      <div>
                        <button
                          type="button"
                          id={profile._id}
                          style={{ marginBottom: "5px" }}
                          className="btn btn-secondary"
                          onClick={ () => {window.location.assign(`/bookingPage/${profile._id}`)}}
                        >
                          <FontAwesomeIcon far="true" icon={faClock} /> Book now
                        </button>
                        
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
            </MDBRow>
          ))}
        </MDBContainer>
      </div>
    </div>
  );
};

export default AllNannyList;
