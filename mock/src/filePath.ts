import { useState } from "react";

export const useFPathState = () => {
  const [fPath, setFPath] = useState("");

  return { fPath, setFPath };
};
