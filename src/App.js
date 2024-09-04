// App.js
import React from "react";
import UpvoteList from "./components/UpvoteList";
import { UpvoteProvider } from "./UpvoteContext";

function App() {
  return (
    <UpvoteProvider>
      <div className='container m-8'>
        <h1 className='text-2xl font-semibold'>Upvote Lists</h1>
        <UpvoteList listId='list-1' />
        <UpvoteList listId='list-2' />
      </div>
    </UpvoteProvider>
  );
}

export default App;
