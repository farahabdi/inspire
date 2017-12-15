import { combineReducers } from "redux";
import itemsReducer from "./items";
import BoardReducer from "./board";

export default combineReducers({
  items: itemsReducer,
  board: BoardReducer
});
