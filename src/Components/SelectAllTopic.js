import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SelectAllTopic = () => {
  const [topicObj, setTopicObj] = useState([]);

  useEffect(() => {
    fetch("https://localhost:5001/api/MST_ProgramTopic")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTopicObj(data);
      })
      .catch((e) => {});
  }, []);

  const allTopics = topicObj.map((topic) => {
    return (
      <>
        <tr>
          <td>
            <Link
              to={"./SelectByTopicName/" + topic.topic_Name}
              style={{ textDecoration: "none" }}
            >
              {topic.topic_Name}
            </Link>
          </td>
        </tr>
      </>
    );
  });

  return (
    <div>
      <div className="selectAll main container my-5">
        <h1>Topics</h1>
        <div>
          <table class="table my-5">
            <thead>
              <tr>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>{allTopics}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SelectAllTopic;
