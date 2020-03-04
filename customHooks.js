import React, { useEffect, useReducer, useRef } from "react";
import isEqual from "lodash/isEqual";

/* Gives the capability to use setState one line old way method 
in React 16.8+ versions to make it easy to use for developers */

export function useSetState(initialState) {
  const [state, newState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );
  return [state, newState];
}

/* Convenience hook to get previous inputs (props) */

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

/* As long as Effects replaced lyfecycle methods they don't use deep comparesing
as it was in componentWillReceiveProps or getDeriveStateFromProps and etc. 
so we have to create custom hook to do it */

export function useDeepCompareEffect(callback, inputs) {
  const cleanupRef = useRef();
  useEffect(() => {
    if (!isEqual(previousInputs, inputs)) {
      cleanupRef.current = callback();
    }
    return cleanupRef.current;
  });

  const previousInputs = usePrevious(inputs);
}
