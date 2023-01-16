import React, {useState}from "react";
import {indexOfAll} from "../../utils/utilfunction"
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
import {faClock, faStar, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/react-fontawesome';
// Import Link component for all internal application hyperlinks
import { Link } from "react-router-dom";
import { chunk } from "lodash";

const AllNannyList = ({ profiles }) => {

const [nannyname, setnannyName] = useState('')
const [renderProfile, setrenderProfile] = useState(profiles)

const searchNanny = () => {
  const nannyFirstName = []
  for (let i = 0; i < profiles.length; i++){
    nannyFirstName.push(profiles[i].firstName)
  }
  const queryNannies = indexOfAll(nannyFirstName, nannyname)
  console.log(queryNannies)
const profileArray = []

  for (let i = 0; i < queryNannies.length; i++){
    profileArray.push(profiles[queryNannies[i]])
  }

  setrenderProfile(profileArray)
  setnannyName('')

}


  if (!profiles) {
    return <h3>No Profiles Yet</h3>;
  }
  const profileRows = chunk(renderProfile, 3);
  return (
    <div>
          <MDBCol md="10" style={{marginLeft: "2%"}}>
      <div className="input-group md-form form-sm form-1 pl-0">
        <input
          className="form-control my-0 py-1"
          type="text"
          value={nannyname}
          onChange={(e) => {setnannyName(e.target.value)}}
          placeholder="Search"
          aria-label="Search"
        />
        <div className="input-group-prepend">
          <button style={{backgroundColor: "#c5ced2"}}
          onClick={searchNanny}
          >
          <span className="input-group-text purple lighten-3" id="basic-text1">
            <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
          </span>

          </button>
        </div>
      </div>
    </MDBCol>

    
    <div className=" w-100 p-3 my-4 " style={{ backgroundColor: "#eee", backgroundImage:"url(https://thumbs.dreamstime.com/z/paw-prints-background-6936081.jpg)" }}>
      <MDBContainer className="my-4">
        {profileRows.map((profileRow) => (
          <MDBRow>
            {profileRow.map((profile) => (
              <MDBCol md="4" >
                <MDBCard
                  className="w-auto mx-3 my-2 "
                  style={{ borderRadius: "15px", backgroundColor: "#ffff"  }}
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
                            style={{ color: "#1B7B2C", marginLeft: "25px" }}
                          >
                            <li>
                            <FontAwesomeIcon icon={faStar} style={{color: "gold", marginTop: "30px"}}/>
                            </li>
                            <li>
                            <FontAwesomeIcon icon={faStar} style={{color: "gold", marginTop: "30px"}}/>
                            </li>
                            <li>
                            <FontAwesomeIcon icon={faStar} style={{color: "gold", marginTop: "30px"}}/>
                            </li>
                            <li>
                            <FontAwesomeIcon icon={faStar} style={{color: "gold", marginTop: "30px"}}/>
                            </li>
                            <li>
                            <FontAwesomeIcon icon={faStar} style={{color: "#bbb", marginTop: "30px"}}/>
                            </li>                      
                          </ul>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <button type="button" class="btn btn-primary">
                      <FontAwesomeIcon far icon={faClock} /> Book now
                    </button>
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
