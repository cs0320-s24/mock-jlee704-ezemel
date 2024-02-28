import { useState } from "react";
import { csvDataMap } from "../../mockedJSON";
import { REPLFunction} from "../REPLInput";


// Define the interface for the load function component
interface LoadProps {
  filepath: string;
  args: string[];
}

// Define the load function component
export const load: REPLFunction = (args: string[]): string | string[][] => {
  // Use the useFPathState hook to get the fPath and setFPath functions

  // Retrieve data based on fPath from csvDataMap
  const mockData = csvDataMap[args[0]] ?? "file not found";

  return mockData;
};
