import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const SingleUserData = async () => {
    const response = await fetch(`http://localhost:4000/${id}`);

    const result = await response.json();

    if (response.ok) {
      setError("");
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
    if (!response.ok) {
      setError(result.error);
    }
  };

  useEffect(() => {
    SingleUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };

    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (response.ok) {
      console.log("User added successfully", result);
      setError("");
      navigate("/all");
    }
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <fieldset>
          <legend>Edit Info of User </legend>
          <div className="mb-3">
            <label for="disabledTextInput" className="form-label">
              Edit Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="disabledTextInput" className="form-label">
              Edit Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="disabledTextInput" className="form-label">
              Edit Age
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Info
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Update;
