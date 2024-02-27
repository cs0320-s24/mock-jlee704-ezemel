import { csvDataMap } from "../mockedJSON";
import { REPLFunction } from "./REPLInput";
import { Dispatch, SetStateAction, useState } from "react";

export function CommandHandler() {
  

  const [myMap, setmyMap] = useState<Map<string, REPLFunction>>(
    new Map([
        ["view", view]
    ])
  );

  const handleCommand: (
    command: string,
    args: Array<string>
  ) => string | string[][] = (command, args) => {
    // Your implementation here
    const func = myMap.get(command);
    if (func) {
      // Check if the function exists in the map
      const result = func(args);
      return result; // Example return value
    } else {
      // Handle the case when the command is not found
      console.error(`Command '${command}' not found`);
      return "error";
    }
  };

  return { handleCommand }; // Export the handleCommand function
}

export const view: REPLFunction = (args: Array<string>): string | string[][] => {
    // Your implementation here
    const filepath = args[0]

    const file = csvDataMap[filepath]

    return file; // Example return value
};