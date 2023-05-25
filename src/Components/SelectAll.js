import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SelectAll = () => {
  const [programObj, setProgramObj] = useState([]);
  const [topicObj, setTopicObj] = useState([]);
  const [filterObj, setFilterObj] = useState({
    program_Topic: "all",
    program_Difficulty: "all",
  });

  useEffect(() => {
    fetch("https://localhost:5001/api/MST_Program")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProgramObj(data);
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    fetch(`https://localhost:5001/api/MST_ProgramTopic/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTopicObj(data);
      })
      .catch((e) => {});
  }, []);

  const allPrograms = programObj.map((program) => {
    return (
      <>
        <tr>
          <td>
            <Link
              to={"./SelectByID/" + program.id}
              style={{ textDecoration: "none" }}
            >
              {program.program_Name}
            </Link>
          </td>
          <td style={{textTransform:"capitalize"}}>{program.program_Topic}</td>
          <td>
            <Link to={program.program_Link} target="_blank">
              <ion-icon name="link-outline"></ion-icon>
            </Link>
          </td>
          <td>
            <Link to={program.program_SolutionLink} target="_blank">
              <ion-icon name="link-outline"></ion-icon>
            </Link>
          </td>
          {program.program_Difficulty === "Easy" ? (
            <td className="customBadgeSuccess">
              <span>{program.program_Difficulty}</span>
            </td>
          ) : program.program_Difficulty === "Medium" ? (
            <td className="customBadgeWarning">
              <span>{program.program_Difficulty}</span>
            </td>
          ) : (
            <td className="customBadgeDanger">
              <span>{program.program_Difficulty}</span>
            </td>
          )}
        </tr>
      </>
    );
  });

  const allTopicsName = topicObj.map((topicObj) => {
    return (
      <>
        <option>{topicObj.topic_Name}</option>
      </>
    );
  });

  const fetchUsingFilter = (program_Topic, program_Difficulty) => {
    // console.warn(program_Topic + " " + program_Difficulty);
    fetch(
      `https://localhost:5001/api/MST_Program/getByFilter/${program_Topic}/${program_Difficulty}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProgramObj(data);
        filterObj.program_Topic = program_Topic;
        filterObj.program_Difficulty = program_Difficulty;
      })
      .catch((e) => {});
  };

  return (
    <div className="selectAll container-sm darkTheme p-5">
      <div className="d-flex justify-content-between">
        <div>
          <h1>Programs</h1>
        </div>
        <div className="d-flex justify-content-center w-50">
          <select
            className="form-control m-2"
            value={filterObj.program_Topic}
            onChange={(e) => {
              setFilterObj({ ...filterObj, program_Topic: e.target.value });
              fetchUsingFilter(e.target.value, filterObj.program_Difficulty);
            }}
          >
            <option value={"all"}>Select Topic Name</option>
            {allTopicsName}
          </select>
          <select
            className="form-control m-2"
            value={filterObj.program_Difficulty}
            onChange={(e) => {
              setFilterObj({
                ...filterObj,
                program_Difficulty: e.target.value,
              });
              fetchUsingFilter(filterObj.program_Topic, e.target.value);
            }}
          >
            <option value={"all"}>Select Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          {/* <button
            className="btn btn-outline-success h-75 m-2"
            onClick={(e) => {
              fetchUsingFilter(filterObj.program_Topic,filterObj.program_Difficulty);
            }}
          >
            Search
          </button> */}
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-borderless align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Topic</th>
              <th scope="col">Program Link</th>
              <th scope="col">Solution Link</th>
              <th scope="col">Difficulty</th>
            </tr>
          </thead>
          {allPrograms.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={5}>
                  <h3>No match found</h3>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>{allPrograms}</tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default SelectAll;
