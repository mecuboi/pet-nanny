import React from 'react';
import {
  MDBFooter,
} from 'mdb-react-ui-kit';

 function Footer() {

    const style = {
        footer: {
            backgroundColor: '#111'
        }
    }

  return (
    <MDBFooter className='text-center text-white px fixed-bottom' style={{ backgroundColor: '#ccc' }}>

      <div className='text-center text-dark p-3'>
        © 2023 Copyright: <span> </span>
        <a className='text-dark' href='/'>
        PetNanny.com
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;