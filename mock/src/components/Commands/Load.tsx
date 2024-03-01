import { useState } from "react";
import { csvDataMap } from "../../mockedJSON";
import { REPLFunction} from "../REPLInput";

/**
 * Sets the filepath. Returns a success message if the filepath is valid.
 * Takes in <filepath> and <has column headers? (y/n)> as args.
 * 
 * @param args 
 * @param isBrief 
 * @returns 
 */
export const load: REPLFunction = (
  args: string[],
  isBrief: boolean
): string | string[][] => {

    // const bool = isBrief

    // console.log(bool);
    // console.log(isBrief);
  var res = "";
  
  if(args.length != 3) {
    res = "invalid syntax: load <filepath> <has column headers? (y/n)>";
    return res;
  }

  if (csvDataMap[args[0]]) {
    // if file exists in map
    res =  "load success!";
    return res;
  }

  res =  "file not found";
  return res
};
