import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const getData = async () => {
    const response = await fetch("http://localhost:4000");

    const result = await response.json();

    if (response.ok) {
      setData(result);
      setError("");
    }
    if (!response.ok) {
      setError(result.error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (response.ok) {
      setError("Data Deleted ");
      setTimeout(() => {
        setError("");
        getData();
      }, 500);
    }
    if (!response.ok) {
      setError(result.error);
    }
  };

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger">{error}</div>}

      <h2 className="text-center">All Data</h2>
      <div className="row">
        <div className="row">
          {data?.map((item) => (
            <div className="col-4" key={item._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {item.email}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">{item.age}</h6>

                  <Link
                    to="#"
                    className="card-link"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Link>
                  <Link to={`/${item._id}`} className="card-link">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Read;
