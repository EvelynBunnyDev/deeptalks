import React from "react";
import { useParams } from "react-router-dom";
import { THREADS } from "../configs/threads";

export default function ThreadPage() {

  const { threadId } = useParams();
  const curThread = THREADS[parseInt(threadId)];

  return (
    <div>
      <h1>Thread Page</h1>
      <p>Thread ID: {threadId}</p>
      <h2>{curThread.title}</h2>
      <p>{curThread.content}</p>
      <h2>Comments</h2>
      <p>{curThread.comments[0].author}</p>
      <p>{curThread.comments[0].content}</p>
    </div>
  );
}
