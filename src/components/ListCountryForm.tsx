import React, { useCallback, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { RootStateOrAny } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { countriesAction, getListCountries } from "../app/slices/countries";
import { MdSearch, MdError } from "react-icons/md";

import { BiWorld } from "react-icons/bi";
import { GiModernCity } from "react-icons/gi";
import { FaMapMarkedAlt } from "react-icons/fa";

import "./style/CountriesForm.css";

const ListCountryForm = () => {
  const dispatch = useAppDispatch();
  const country = useAppSelector((state: RootStateOrAny) => state.countries);

  const [countryQuery, setCountryQuery] = useState("");

  const submitListCountryForm = useCallback(
    async (e: any) => {
      e.preventDefault();
      const { value } = e.target;

      if (value !== "") {
        await dispatch(getListCountries(countryQuery));
      } else {
        dispatch(countriesAction.clearListCountries());
      }
    },
    [dispatch, countryQuery]
  );
  return (
    <div className="country-form">
      <Form onSubmit={submitListCountryForm} autoComplete="off">
        <Form.Group className="mb-3" controlId="formCountryName">
          <Form.Label>Type Country Name</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter country name"
            onChange={(e) => setCountryQuery(e.target.value)}
          />
        </Form.Group>{" "}
        <Button type="submit">
          Search list of countries <MdSearch />
        </Button>
      </Form>
      {country.statusGetListCountries === "success" &&
        country.listCountries !== null && (
          <div className="countries-list-container">
            {country.listCountries?.map((country: any, i: number) => (
              <ul key={i}>
                <li>
                  <BiWorld /> {country.countryName} {country.flag}
                </li>
                <li>
                  {" "}
                  <GiModernCity />
                  {country.capital?.join(", ")}
                </li>
                <li>
                  <FaMapMarkedAlt /> {country.region}
                </li>
              </ul>
            ))}
          </div>
        )}

      {country.statusGetListCountries === "reject" && (
        <p>
          {country.errorGetListCountries}
          <MdError />
        </p>
      )}
    </div>
  );
};

export default React.memo(ListCountryForm);
