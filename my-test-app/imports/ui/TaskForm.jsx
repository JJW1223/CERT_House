import React, { useState } from "react";
import { TasksCollection } from "/imports/api/TasksCollection";

export const TaskForm = () => {
  const [text, setText] = useState("");

const handleSubmit = async (e) => { 
    e.preventDefault();

    if (!text) return;

    try {
      await Meteor.callAsync("tasks.insert", { 
        text: text.trim(),
        createdAt: new Date(),
      });
      setText(""); // 성공적으로 추가된 경우 텍스트 필드 초기화
    } catch (error) {
      console.error("Error inserting task:", error);
    }
  };


  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
};