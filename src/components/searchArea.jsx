import React, { useState } from "react";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

export default function SearchArea(props) {
  const [cityName, setCityName] = useState("");
  function textType(event) {
    setCityName(event.target.value);
  }
  return (
    <div>
      <form
        className="search-box"
        onSubmit={(event) => {
          props.getCoor(cityName);

          event.preventDefault();
          setCityName("");
        }}
      >
        <input onChange={textType} placeholder="city" value={cityName} />
        {cityName.length !== 0 && (
          <ArrowRightAltIcon
            onClick={(event) => {
              props.getCoor(cityName);
              event.preventDefault();
              setCityName("");
            }}
          />
        )}
      </form>
    </div>
  );
}
