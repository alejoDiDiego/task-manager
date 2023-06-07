import React from "react";
import { Field, useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  type?: string;
}

export default function MyTextInput(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <div className="flex flex-col">
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? <label>{meta.error}</label> : null}
    </div>
  );
}
