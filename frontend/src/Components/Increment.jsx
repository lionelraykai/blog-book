import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../Redux/reducers/counterSlice";

const Increment = () => {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div className="increment-container">
      <h2>Counter</h2>
      <div className="counter-buttons">
        <button onClick={() => dispatch(decrement())}>-</button>
        <span className="count">{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
      <button
        className="increment-by-5"
        onClick={() => dispatch(incrementByAmount(10))}
      >
        Increment by 5
      </button>
    </div>
  );
};

export default Increment;
