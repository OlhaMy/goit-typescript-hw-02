import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./SearchBar.module.css";

import * as Yup from "yup";

const searchFormSchema = Yup.object().shape({
  search: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("The field is required"),
});

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values.search);
    resetForm();
  };

  return (
    <header className={s.header}>
      <Formik
        initialValues={{ search: " " }}
        validationSchema={searchFormSchema}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <Field
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage
            name="search"
            component="div"
            style={{ color: "red" }}
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
