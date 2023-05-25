import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SelectByTopicName = () => {
  const params = useParams();

  const [progams, setProgams] = useState([]);

  useEffect(() => {
    fetch(
      `https://localhost:5001/api/MST_Program/programsByTopicName/${params.name}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProgams(data);
      })
      .catch((e) => {});
  }, [params.name, params.id]);
  const allPrograms = progams.map((program) => {
    return (
      <>
        <tr>
          <td>
            <Link
              to={"../../../SelectAll/SelectByID/" + program.id}
              style={{ textDecoration: "none" }}
            >
              {program.program_Name}
            </Link>
          </td>
          <td>{program.program_Topic}</td>
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
  return (
    <div className="selectAll container my-5 darkTheme">
      <h1 style={{textTransform:"capitalize"}}>{params.name}</h1>
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
          <tbody>{allPrograms}</tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectByTopicName;
