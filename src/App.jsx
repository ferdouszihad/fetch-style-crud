// import { useEffect } from "react";
import "./App.css";
// import { useState } from "react";
import Card from "./components/Card";
import useComments from "./hooks/useComments";

function App() {
  const { comments, refetch } = useComments();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;
    fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: comment }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          // const newData = [...comments, { _id: data.insertedId, comment }];
          // setComments(newData);
          refetch();
        }
      });
  };
  const handleDelete = (id) => {
    fetch("http://localhost:5000/comments/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.deletedCount > 0) {
          // const remaining = comments.filter((comment) => comment._id != id);
          // setComments(remaining);
          refetch();
        }
      });
  };
  return (
    <div className="w-11/12 mx-auto py-10 bg-white ">
      <div className="min-h-screen">
        <h2 className="text-3xl font-bold">Opinion Board</h2>
        <p>Share opinion AnnonymusLy</p>
        <hr />
        <div className="py-10 ">
          <h2 className="text-xl font-bold text-right">Recent Comments</h2>
          <div className="grid grid-cols-3 gap-5">
            {comments.map((comment) => (
              <Card
                className="p-5 bg-green-100"
                comment={comment}
                key={comment._id}
                handleDelete={handleDelete}
              ></Card>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0  py-2   backdrop-blur-sm">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap items-center gap-5"
        >
          <h2 className="text-2xl font-bold">Add your Comment</h2>
          <div>
            <textarea
              name="comment"
              className="outline-none border-2 rounded p-5"
              cols="50"
              rows="3"
            ></textarea>
          </div>
          <div>
            <button className="bg-green-300 p-2 px-4 rounded-2xl" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
