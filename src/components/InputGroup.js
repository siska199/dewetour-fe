import React from "react";

const style = {
  input: {
    marginTop: "-10px",
    background: "rgba(210, 210, 210, 0.25)",
    border: "2px solid rgba(210, 210, 210, 0.25)",
    boxSizing: "border-box",
    borderRadius: "5px",
    fontSize: "15px",
  },
  select: {
    marginTop: "-10px",
    width: "320px",
    background: "rgba(210, 210, 210, 0.25)",
    border: "2px solid rgba(210, 210, 210, 0.25)",
    boxSizing: "border-box",
    borderRadius: "5px",
    fontSize: "15px",
    outline: "none",
  },
};

export default function InputGroup({
  register,
  label,
  value,
  keyId,
  handleChange,
}) {
  return (
    <div className={register ? "mb-2" : "mb-3"}>
      <label
        style={{ fontWeight: "800", fontSize: "18px" }}
        htmlFor={keyId}
        className="form-label"
      >
        {label}
      </label>
      {label === "Gender" ? (
        <>
          <select
            className="py-2 px-2"
            style={style.select}
            value={value}
            onChange={handleChange}
            id={keyId}
          >
            <option value="DEFAULT" hidden>
              Choose Gender Here
            </option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </>
      ) : (
        <input
          style={style.input}
          value={value}
          onChange={handleChange}
          type={label === "Password" ? "password" : "text"}
          className="form-control shadow-none"
          id={keyId}
        />
      )}
    </div>
  );
}
