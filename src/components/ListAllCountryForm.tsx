import React, { useState, useEffect } from "react";
import { Table, Form, FloatingLabel } from "react-bootstrap";
import { RootStateOrAny } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAllCountries } from "../app/slices/countries";
import "./style/CountriesForm.css";

import { BiWorld } from "react-icons/bi";
import { GiModernCity } from "react-icons/gi";
import { FaMapMarkedAlt } from "react-icons/fa";

const ListAllCountryForm = () => {
  const dispatch = useAppDispatch();
  const country = useAppSelector((state: RootStateOrAny) => state.countries);

  const [countries, setCountries] = useState<Array<any>>([]);

  const onChangeFilterByName = (e: any) => {
    const { value } = e.target;
    if (value !== "") {
      const filterByNameCountry = country.listAllCountries?.filter(
        (country: { countryName: string }) =>
          country.countryName.toLowerCase() === value
      );

      setCountries(filterByNameCountry);
    } else {
      setCountries(country.listAllCountries);
    }
  };

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  useEffect(() => {
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
      <Table className="countries-table" hover>
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
        </tbody>
      </Table>
    </div>
  );
};

export default React.memo(ListAllCountryForm);
