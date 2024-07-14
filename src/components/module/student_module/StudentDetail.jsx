import React from "react";
import { useParams } from "react-router-dom";
function StudentDetail() {
  const { id } = useParams();
  // const {id} =
  console.log(id);
  return <div>{/* <h1>{params.id}</h1> */}</div>;
}

export default StudentDetail;
