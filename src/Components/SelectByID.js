import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SelectByID = () => {
  const [programObj, setProgramObj] = useState([]);

  const params = useParams();
  useEffect(() => {
    fetch("https://localhost:5001/api/MST_Program/" + params.id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProgramObj(data);
      })
      .catch((e) => {});
  }, [params.id]);
  return (
    <div className="container-fluid my-5">
      <h1 className="my-5">{programObj.program_Name}</h1>
      {/* <h5>
        {programObj.issolved ? (
          <span className="text-success">
            {" "}
            <ion-icon name="checkmark-circle-sharp"></ion-icon>{" "}
          </span>
        ) : (
          <span></span>
        )}
      </h5> */}
      <div className="my-5 d-flex justify-content-center align-items-center flex-column">
        <h4>Topic : {programObj.program_Topic} </h4>
        <hr/>
        <h4> Difficulty : {programObj.program_Difficulty} </h4>
      </div>
      <div className="my-5 d-flex justify-content-center align-items-center">
        <button className="btn btn-outline-primary mx-5">
          <Link
            to={programObj.program_Link}
            className="text-decoration-none text-dark"
          >
            Solve Here{" "}
          </Link>
        </button>
        <button className="btn btn-outline-primary">
          <Link
            to={programObj.program_SolutionLink}
            className="text-decoration-none text-dark"
          >
            See Solution{" "}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SelectByID;
