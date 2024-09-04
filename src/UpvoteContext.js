import React, { createContext, useContext, useReducer, useEffect } from "react";

const UpvoteContext = createContext();

export function useUpvoteContext() {
  const context = useContext(UpvoteContext);
  if (!context) {
    throw new Error("useUpvoteContext must be used within an UpvoteProvider");
  }
  return context;
}

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SELECTION":
      return {
        ...state,
        [action.listId]: {
          ...state[action.listId],
          isSelected: !state[action.listId]?.isSelected,
        },
      };
    case "ADD_UPVOTE":
      return {
        ...state,
        [action.listId]: {
          ...state[action.listId],
          upvotes: [
            ...(state[action.listId]?.upvotes || []),
            state[action.listId]?.upvotes.length || 0,
          ],
        },
      };
    case "INITIALIZE_LIST":
      return {
        ...state,
        [action.listId]: {
          upvotes: action.payload.upvotes,
          isSelected: action.payload.isSelected,
        },
      };
    default:
      return state;
  }
}

export function UpvoteProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem("upvoteState") || "{}");
    for (const listId in storedState) {
      dispatch({
        type: "INITIALIZE_LIST",
        listId,
        payload: storedState[listId],
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("upvoteState", JSON.stringify(state));
  }, [state]);

  const toggleGlobalSelection = (listId) => {
    dispatch({ type: "TOGGLE_SELECTION", listId });
  };

  const addUpvote = (listId) => {
    dispatch({ type: "ADD_UPVOTE", listId });
  };

  return (
    <UpvoteContext.Provider value={{ state, toggleGlobalSelection, addUpvote }}>
      {children}
    </UpvoteContext.Provider>
  );
}
