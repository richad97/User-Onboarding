import { useState, useEffect } from "react";
import "./App.css";
import Form from "./Components/Form";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Name is required."),
  email: yup.string().required("Email is required."),
  password: yup.string().required("Password is required."),
  terms: yup.boolean().oneOf([true], "Agree to terms to continue."),
});

const initialForm = {
  name: "",
  email: "",
  password: "",
  terms: false,
};

function App() {
  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  const [disabled, setDisabled] = useState(true);

  const [users, setUsers] = useState([]);

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const onChange = (event) => {
    const { checked, value, name, type } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setFormErrors(name, valueToUse);
    setForm({ ...form, [name]: valueToUse });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      name: form.name.trim(),
      email: form.email,
      password: form.password,
      terms: form.terms,
    };
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((resp) => {
        console.log(resp);
        setForm(initialForm);
        setUsers([...users, resp.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  return (
    <div className="App">
      <div style={{ color: "red" }}>
        <div>{errors.name}</div>
        <div>{errors.email}</div>
        <div>{errors.password}</div>
        <div>{errors.terms}</div>
      </div>
      <Form
        onChange={onChange}
        onSubmit={onSubmit}
        disabled={disabled}
        form={form}
      />
      {users.map((obj) => {
        return <span>{JSON.stringify(obj)}</span>;
      })}
    </div>
  );
}

export default App;
