import React, { useState, useEffect } from "react";
//bootstrap import
import { Table, Form, FloatingLabel } from "react-bootstrap";
//redux import
import { RootStateOrAny } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAllCountries } from "../app/slices/countries";
//icons components
import { BiWorld } from "react-icons/bi";
import { GiModernCity } from "react-icons/gi";
import { FaMapMarkedAlt } from "react-icons/fa";
//style
import "./style/CountriesForm.css";

const ListAllCountryForm = () => {
  const dispatch = useAppDispatch();
  const country = useAppSelector((state: RootStateOrAny) => state.countries);

  const [countries, setCountries] = useState<Array<any>>([]);

  //filter the countries by select name
  const onChangeFilterByName = (e: any) => {
    //get given name by form
    const { value: countryName } = e.target;
    //check if the name is not empty
    if (countryName !== "") {
      //filter the countries table with the select country
      const filterByNameCountry = country.listAllCountries?.filter(
        (country: { countryName: string }) =>
          country.countryName.toLowerCase() === countryName
      );

      //set the filter country to countries state
      setCountries(filterByNameCountry);
    } else {
      //if the countryName is empty return the original table countries
      setCountries(country.listAllCountries);
    }
  };

  useEffect(() => {
    //make request for all countries when render the component
    dispatch(getAllCountries());
  }, [dispatch]);

  useEffect(() => {
    //check if the list of all country that we call previous call get fullfilled to set to the  countries state
    if (country.listAllCountries.length !== 0)
      setCountries(country.listAllCountries);
  }, [country.listAllCountries]);

  return (
    <div>
      <FloatingLabel controlId="floatingSelect" label="Filter country by name">
        <Form.Select
          className="select-countries"
          aria-label="Floating label select"
          onChange={onChangeFilterByName}
        >
          <option value="">Select country</option>
          {country.listAllCountries?.map(
            (country: { flag: string; countryName: string }, i: number) => (
              <option key={i} value={country.countryName?.toLowerCase()}>
                {country.flag}
                {country.countryName}
              </option>
            )
          )}
        </Form.Select>
      </FloatingLabel>
      <Table className="countries-table" borderless hover>
        <thead>
          <tr>
            <th>
              Country <BiWorld />
            </th>
            <th>
              Capital <GiModernCity />
            </th>
            <th>
              Region <FaMapMarkedAlt />
            </th>
          </tr>
        </thead>
        <tbody>
          {/* check if the promise status is success to iterate the arrays of countries */}
          {country?.statusGetAllCountries === "success" &&
            countries?.map(
              (
                country: {
                  flag: string;
                  countryName: string;
                  capital: Array<string>;
                  region: string;
                },
                i: number
              ) => (
                <tr key={i}>
                  <td>
                    {country.flag} {country.countryName}
                  </td>
                  <td>{country.capital?.join(", ")}</td>
                  <td>{country.region}</td>
                </tr>
              )
            )}
          {/* check if the promise status is loading for the request */}

          {country?.statusGetAllCountries === "loading" && (
            <p>...Loading Countries</p>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default React.memo(ListAllCountryForm);
