import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { SearchBarProps, FormValues } from "../App/App.types";
import s from "./SearchBar.module.css";

import * as Yup from "yup";

const searchFormSchema = Yup.object().shape({
  search: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("The field is required"),
});

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    onSubmit(values.search);
    resetForm();
  };

  return (
    <header className={s.header}>
      <Formik
        initialValues={{ search: "" }}
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
          <ErrorMessage name="search" component="div" className={s.error} />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
