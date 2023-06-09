import React, { useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Formik } from "formik";
import * as Yup from "yup";
import { TaskForm } from "../../models/Task";
import MyTextInput from "../../components/form/MyTextInput";
import MyTextAreaInput from "../../components/form/MyTextArea";

const Edit = () => {
  const { taskStore } = useStore();
  const { loadTask, tasks, selectedTask, loadingTask, updateTask, setLoading } =
    taskStore;

  const [task, setTask] = useState<TaskForm>({
    content: "",
    title: "",
    id: 0,
  });

  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    if (id) {
      loadTask(parseInt(id));
      return;
    }
  }, [tasks]);

  useEffect(() => {
    if (selectedTask) {
      setTask({
        content: selectedTask.content,
        title: selectedTask.title,
        id: selectedTask.id,
      });
    }
  }, [selectedTask]);

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    content: Yup.string().required(),
  });

  const handleSubmit = (values: TaskForm) => {
    updateTask(values);
  };

  if (loadingTask) {
    return <p>Loading...</p>;
  }

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
          <p className="text-white font-bold text-2xl">Edit task</p>
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
            Edit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default observer(Edit);
