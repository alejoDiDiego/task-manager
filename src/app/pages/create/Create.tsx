import React, { useState } from "react";
import * as Yup from "yup";
import { Task, TaskForm } from "../../models/Task";
import { Formik } from "formik";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import MyTextInput from "../../components/form/MyTextInput";

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
    <div>
      <p>Add task</p>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={task}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting }) => (
          <form className="bg-blue-500 flex flex-col" onSubmit={handleSubmit}>
            <MyTextInput name="title" placeholder="Title" />
            <MyTextInput name="content" placeholder="Description" />
            <button type="submit" disabled={isSubmitting}>
              Create
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default observer(Create);
