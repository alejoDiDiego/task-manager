import React, { useState } from "react";
import * as Yup from "yup";
import { Task, TaskForm } from "../../models/Task";
import { Formik } from "formik";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import MyTextInput from "../../components/form/MyTextInput";
import MyTextAreaInput from "../../components/form/MyTextArea";

const Create = () => {
  const { taskStore } = useStore();
  const { tasks, addTask } = taskStore;

  const [task, setTask] = useState<TaskForm>({
    content: "",
    title: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    content: Yup.string().required(),
  });

  const handleSubmit = (values: TaskForm) => {
    addTask(values);
  };

  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={task}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ handleSubmit, isValid, isSubmitting }) => (
        <form
          className="bg-blue-500 flex flex-col rounded-lg items-center gap-5 p-5 w-[90%] shadow-md shadow-blue-500 drop-shadow-xl
          sm:w-[400px]"
          onSubmit={handleSubmit}
        >
          <p className="text-white font-bold text-2xl">Add task</p>
          <MyTextInput name="title" placeholder="Title" />
          <MyTextAreaInput rows={3} name="content" placeholder="Description" />
          <button
            className="bg-slate-700 text-white p-3 w-28 rounded-lg font-bold shadow-md shadow-slate-700 
              hover:bg-slate-950
              transform-cpu
              active:scale-110 transition duration-200"
            type="submit"
            disabled={isSubmitting}
          >
            Create
          </button>
        </form>
      )}
    </Formik>
  );
};

export default observer(Create);
