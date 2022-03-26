import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../services/authService";
import { apiUrl } from "../../services/httpService";

const ColorForm = ({ handleChange, status, unitValue }) => {
  const [colors, setColors] = useState([]);
  const [colorValue, setColorValue] = useState("");

  useEffect(() => {
    if (status) return;
    const fetchData = async () => {
      const result = await axios.get(
        `${apiUrl}/card/filter?accesColor=1&status=${status}`,
        config()
      );
      setColors(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (status) {
      const fetchData = async () => {
        const result = await axios.get(
          `${apiUrl}/restore_cards/filter?unit=${unitValue}&status=${status}`,
          config()
        );
        setColors(result.data);
      };
      handleChange(["color"], [""]);
      setColorValue("");
      setColors([]);

      fetchData();
    }

    return;
  }, [unitValue]);

  const handleOnChange = (e) => {
    setColorValue(e.target.value);
    handleChange([e.target.id], [e.target.value]);
  };

  return (
    <>
      <label forhtml="color">Couleur: </label>
      <select
        id="color"
        className="form-control form-control-lg"
        name="color"
        onChange={handleOnChange}
        value={colorValue}
        required
      >
        <option value=""></option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
    </>
  );
};

export default ColorForm;
