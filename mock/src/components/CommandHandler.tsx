import { REPLFunction } from "./REPLInput";
import { Dispatch, SetStateAction, useState } from "react";

const CommandHandler = () => {
  const view: REPLFunction = (args: Array<string>): string | string[][] => {
    // Your implementation here
    console.log("result");
    return "Result"; // Example return value
  };

  const [funcMap, setfuncMap] = useState<Map<string, REPLFunction>>(
    new Map([
        ["view", view]
    ])
  );

  /**
   * function for devs to add new commands to the REPL
   * @param func - function to be added
   * @param commandString - command which should call func in the REPL
   */
  const addCommandHandler = (func: REPLFunction, commandString: string) => {
    const newMap = new Map(funcMap);
    newMap.set(commandString, func);
    setfuncMap(newMap);
  };

  /**
   * function that processes REPL commands
   * @param command 
   * @param args 
   * @returns 
   */
  const handleCommand = (command: string, args: string[]): string | string[][]  => {
    const func = funcMap.get(command);
    if (func) {
      // Check if the function exists in the map
      const result = func(args);
      return result;
    } else {
      // Handle the case when the command is not found
      console.error(`Command '${command}' not found`);
      return "error";
    }
  };
  return {handleCommand, addCommandHandler};
}
// export const exportedHandleCommand = handleCommand;
export default CommandHandler;