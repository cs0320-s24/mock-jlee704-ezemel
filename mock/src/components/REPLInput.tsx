import { Dispatch, SetStateAction, useState } from 'react';
import '../styles/main.css';
import { ControlledInput } from './ControlledInput';
import { CommandHandler, search, view } from './CommandHandler';
import {load} from './Commands/Load';

interface REPLInputProps{
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: string[],
  setHistory: Dispatch<SetStateAction<string[]>>,
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props : REPLInputProps) {
    // Remember: let React manage state in your webapp. 
    // Manages the contents of the input box
    const [commandString, setCommandString] = useState<string>('');
    // TODO WITH TA : add a count state
    const [count, setCount] = useState<number>(0)
    // keep track of filepath
    const [filepath, setFilepath] = useState<string>("")
    // keeps track of functions to call
    const [commandMap, setcommandMap] = useState<Map<string, REPLFunction>>(
      new Map([
        ["view", view],
        ["search", search],
        ["load", load],
      ])
    );

    // This function is triggered when the button is clicked.
    function handleSubmit(commandString:string) {
      setCount(count+1);
      const userInput = commandString.split(" "); // split userInput into format [command args]
      const command = userInput[0];
      const args = userInput.slice(1); // get everything but the command

      if (filepath != "") {
        args.push(filepath); // filepath will always be last arg if loaded
      }

      // if command in myMap
      const result: string | string[][] =
          commandMap.get(command)?.(args) ?? "Command not found";

      if (result != "Command not found" && command == "load") { // if we load successfully
        setFilepath(args[0]);
      }
      
      const flattenedResult: string[] = Array.isArray(result)
            ? result.flat()
            : [result];
      props.setHistory([...props.history, ...flattenedResult])
      setCommandString('')
    }
    /**
     * We suggest breaking down this component into smaller components, think about the individual pieces 
     * of the REPL and how they connect to each other...
     */
    return (
        <div className="repl-input">
            {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
            {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
            <fieldset>
              <legend>Enter a command:</legend>
              <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"}/>
            </fieldset>
            {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
            <button onClick={() => handleSubmit(commandString)}>Submitted {count} times</button>
        </div>
    );
  }

  /**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when 
 * the command is done executing.
 * 
 * The arguments passed in the input (which need not be named "args") should 
 * *NOT* contain the command-name prefix.
 */
export interface REPLFunction {    
  (args: Array<string>): string|string[][]
}
