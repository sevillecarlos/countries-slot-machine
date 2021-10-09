import React from "react";
import UniqueCountryForm from "../components/UniqueCountryForm";
import ListCountryForm from "../components/ListCountryForm";
const Countries = () => {
  return (
    <div>
      <UniqueCountryForm />
      <br />
      <ListCountryForm />
    </div>
  );
};

export default Countries;
