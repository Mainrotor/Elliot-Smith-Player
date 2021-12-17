import { createStore } from "redux";
import { loadState } from "../localStorage";
import reducer from "./reducer";
import state from "./state";

const persistedState = loadState();

export default createStore(reducer, persistedState);
