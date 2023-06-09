import React, { useEffect, useState } from "react";
import { Task } from "../../models/Task";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { router } from "../../router/Routes";

interface Props {
  task: Task;
}

const Task = ({ task }: Props) => {
  const { taskStore } = useStore();
  const { finishOrUnfinishTask, deleteTask } = taskStore;

  return (
    <div
      className={`flex flex-col gap-5 justify-between items-center bg-blue-400 rounded-2xl p-5 shadow-md shadow-blue-400 text-center md:text-left w-full md:w-[500px] transition-all duration-300 ${
        task.finished ? "opacity-50" : ""
      }`}
    >
      <div className="flex flex-col gap-3 md:gap-3  justify-between items-center w-full">
        <p
          className={`text-white font-bold text-2xl md:text-3xl text-center w-64 md:w-full break-words ${
            task.finished ? "line-through" : ""
          }`}
        >
          {task.title}
        </p>
        <p
          className={`md:mb-3 break-words w-full bg-white p-3 rounded-lg shadow shadow-white ${
            task.finished ? "line-through" : ""
          }`}
        >
          {task.content}
        </p>
        <div className="flex justify-center items-center mt-3 md:mt-0">
          <i
            onClick={() => {
              const res = window.confirm("Do you want to delete this task?");
              if (res) {
                deleteTask(task.id);
              }
            }}
            className="fa-solid fa-trash text-red-500 mr-2 text-lg bg-black px-3 py-[5.5px] rounded-full shadow shadow-slate-950 cursor-pointer transition-all hover:bg-slate-600 hover:shadow-slate-600"
          ></i>
          <i
            onClick={() => {
              router.navigate(`edit/${task.id}`);
            }}
            className="fa-solid fa-pen-to-square text-green-400 mr-2 text-lg bg-black px-3 py-[5.5px] rounded-full shadow shadow-slate-950 cursor-pointer transition-all hover:bg-slate-600 hover:shadow-slate-600"
          ></i>
          <button
            onClick={() => {
              finishOrUnfinishTask(task.id);
            }}
            className={`bg-slate-950 text-white p-2 font-bold rounded-full  shadow shadow-slate-950 w-28 transition-all hover:bg-slate-600 hover:shadow-slate-600 ${
              task.finished ? "line-through" : ""
            }`}
          >
            {task.finished ? "Finished" : "In Course"}
          </button>
        </div>
      </div>
      <div className="flex gap-5 font-bold">
        <p>
          Created: {new Date(task.creationDate).getDay()}
          {"/"}
          {new Date(task.creationDate).getMonth()}
          {"/"}
          {new Date(task.creationDate).getFullYear()}{" "}
          {new Date(task.creationDate).getHours()}
          {":"}
          {new Date(task.creationDate).getMinutes()}
        </p>
        {task.finished && task.finishedDate != null ? (
          <p>
            Finished: {new Date(task.finishedDate).getDay()}
            {"/"}
            {new Date(task.finishedDate).getMonth()}
            {"/"}
            {new Date(task.finishedDate).getFullYear()}{" "}
            {new Date(task.finishedDate).getHours()}
            {":"}
            {new Date(task.finishedDate).getMinutes() < 10 ? "0" : ""}
            {new Date(task.finishedDate).getMinutes()}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default observer(Task);
