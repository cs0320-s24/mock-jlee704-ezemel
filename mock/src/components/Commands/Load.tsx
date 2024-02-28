import { useState } from "react";
import { csvDataMap } from "../../mockedJSON";
import { REPLFunction} from "../REPLInput";

export const load: REPLFunction = (args: string[]): string | string[][] => {

  if (csvDataMap[args[0]]) { // if file exists in map
    return "load success!"
  } 
  
  return "file not found"
  
};
