import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import AllNannyList from '../components/AllNanies';
import { QUERY_ALL_NANNIES } from '../utils/queries';
import { NoFragmentCyclesRule } from 'graphql';


function NannyList() {
  const { loading, data } = useQuery(QUERY_ALL_NANNIES);
  let nannies
  if (data) {
    nannies = data?.nannies;
  }

  return (
    <>
      <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            
            <AllNannyList
              profiles={nannies}
            />
          )}
        </div>
    </>
  );
}

export default NannyList;
