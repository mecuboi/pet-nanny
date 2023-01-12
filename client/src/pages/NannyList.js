import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import AllNannyList from '../components/AllNanies';
import { QUERY_ALL_Nannies } from '../utils/queries';

function NannyList() {
  const { loading, data } = useQuery(QUERY_ALL_Nannies);
  let nannies;

  if (data) {
    nannies = data.nannies;
  }

  return (
    <>
      <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <AllNannyList
              profiles={nannies}
              title="Here's a list of available Nannies ..."
            />
          )}
        </div>
    </>
  );
}

export default NannyList;
