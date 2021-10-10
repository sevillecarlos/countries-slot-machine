import React, { useCallback } from "react";
import { Form } from "react-bootstrap";
import { RootStateOrAny } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { countriesAction, getListCountries } from "../app/slices/countries";

const ListCountryForm = () => {
  const dispatch = useAppDispatch();
  const country = useAppSelector((state: RootStateOrAny) => state.countries);

  const submitListCountryForm = useCallback(
    (e: any) => {
      e.preventDefault();
      const { value } = e.target;
      if (value !== "") {
        dispatch(getListCountries(value));
      } else {
        dispatch(countriesAction.clearListCountries());
      }
    },
    [dispatch]
  );

  return (
    <div>
      <Form className="unique-contry-form" autoComplete="off">
        <Form.Group className="mb-3" controlId="formCountryName">
          <Form.Label>Type Country Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country name"
            onChange={submitListCountryForm}
          />
        </Form.Group>{" "}
      </Form>
      {country?.status === "success" && !country?.listCountries?.notFoundMsg ? (
        country?.listCountries?.map((country: any, i: number) => (
          <ul key={i}>
            <li>
              {country.countryName} {country.flag}
            </li>
          </ul>
        ))
      ) : (
        <p>{country?.listCountries?.notFoundMsg}</p>
      )}
    </div>
  );
};

export default React.memo(ListCountryForm);
