import React from "react";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  rows: number;
  label?: string;
}

export default function MyTextAreaInput(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <div className="flex flex-col w-full">
      <label>{props.label}</label>
      <textarea
        className="rounded-lg shadow-sm shadow-white p-2 font-bold"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <label className="capitalize text-red-400 font-bold ml-1 mt-1">
          {meta.error}
        </label>
      ) : null}
    </div>
  );
}
