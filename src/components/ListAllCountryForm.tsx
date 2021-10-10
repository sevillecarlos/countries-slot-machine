import React, { useState, useEffect } from "react";
import { Table, Form, FloatingLabel } from "react-bootstrap";
import { RootStateOrAny } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAllCountries } from "../app/slices/countries";

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
      <Table bordered hover>
        <thead>
          <tr>
            <th>Country</th>
            <th>Capital</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {country?.status === "success" &&
            countries?.map(
              (
                country: {
                  flag: string;
                  countryName: string;
                  capital: string;
                  region: string;
                },
                i: number
              ) => (
                <tr key={i}>
                  <td>
                    {country.flag} {country.countryName}
                  </td>
                  <td>{country.capital}</td>
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
