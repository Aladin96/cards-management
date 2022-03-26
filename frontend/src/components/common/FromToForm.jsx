import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../services/authService";
import { apiUrl } from "../../services/httpService";

const FromToForm = ({
  handleChange,
  unitValue,
  colorValue,
  disciplineValue,
  priceValue,
  startDateValue,
  endDateValue,
  seasonValue,
  status,
}) => {
  const [fromToValue, setFromToValue] = useState({
    from: "",
    to: "",
  });

  const [numCards, setNumCards] = useState([]);
  const [toValues, setToValues] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let result;
      if (!status)
        result = await axios.get(
          `${apiUrl}/card/filter?color=${colorValue}&discipline=${disciplineValue}&price=${priceValue}&start_date=${startDateValue}&end_date=${endDateValue}&season=${seasonValue}&status=${status}`,
          config()
        );
      else
        result = await axios.get(
          `${apiUrl}/restore_cards/filter?unit=${unitValue}&color=${colorValue}&discipline=${disciplineValue}&price=${priceValue}&start_date=${startDateValue}&end_date=${endDateValue}&season=${seasonValue}&status=${status}`,
          config()
        );

      setNumCards(result.data);
      setIsLoading(false);
    };
    handleChange(["from", "to"], ["", ""]);

    setFromToValue({
      from: "",
      to: "",
    });

    setNumCards([]);

    setIsLoading(true);
    fetchData();
  }, [seasonValue]);

  useEffect(() => {
    console.log(fromToValue.from);
    if (!fromToValue.from) {
      setToValues([]);
      return;
    }

    const lastNumCard = numCards.slice(-1)[0];
    const toArr = [];

    handleChange(["to"], [""]);
    setFromToValue({ ...fromToValue, to: "" });

    for (let i = fromToValue.from; i <= lastNumCard; i++) {
      if (numCards.find((a) => a == i)) toArr.push(i);

      if (!numCards.find((a) => a === +i + 1)) {
        break;
      }
    }

    setToValues(toArr);
  }, [fromToValue.from]);

  const handleOnChange = (e) => {
    const newData = fromToValue;
    newData[e.target.id] = e.target.value;
    setFromToValue(newData);
    handleChange([e.target.id], [e.target.value]);
  };

  return (
    <>
      <div className="form-row align-items-center mt-2">
        <label forhtml="from">Du: </label>
        <div className="input-group col-sm-5">
          <select
            id="from"
            className="form-control form-control-lg"
            name="from"
            type="text"
            placeholder="Choose card number"
            onChange={handleOnChange}
            value={fromToValue.from}
            required
            disabled={isLoading ? true : false}
          >
            <option value=""></option>
            {numCards.map((numCard) => (
              <option key={numCard} value={numCard}>
                {numCard}
              </option>
            ))}
          </select>
          {isLoading && (
            <span class="input-group-addon sping-form-loading">
              <i class="fa fa-refresh fa-spin"></i>
            </span>
          )}
        </div>

        <label forhtml="to">Au: </label>
        <div className="input-group col-sm-5">
          <select
            id="to"
            className="form-control form-control-lg"
            name="to"
            type="text"
            placeholder="Choose card number"
            onChange={handleOnChange}
            value={fromToValue.to}
            required
            disabled={isLoading ? true : false}
          >
            <option value=""></option>
            {toValues.map((toValue) => (
              <option key={toValue} value={toValue}>
                {toValue}
              </option>
            ))}
          </select>
          {isLoading && (
            <span class="input-group-addon sping-form-loading">
              <i class="fa fa-refresh fa-spin"></i>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default FromToForm;
