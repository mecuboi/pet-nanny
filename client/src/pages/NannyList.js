import React from "react";
import { useQuery } from "@apollo/client";
import AllNannyList from "../components/AllNanies";
import { QUERY_ALL_NANNIES } from "../utils/queries";

function NannyList() {
  const { loading, data } = useQuery(QUERY_ALL_NANNIES);
  let nannies;
  if (data) {
    nannies = data?.nannies;
  }

  return (
    <>
      <div>
          {loading ? 
            <img
            src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
            className="animation"
            alt="loading"
             />
           : 
            
            <AllNannyList
              profiles={nannies}
            />
          }
        </div>
    </>
  );
}

export default NannyList;
