import React from "react";
import { useParams } from "react-router-dom";

function AdminEdit() {
  const params = useParams();
  const { id } = useParams();
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}

export default AdminEdit;
