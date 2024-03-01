import { useState } from "react";
import { csvDataMap } from "../../mockedJSON";
import { REPLFunction} from "../REPLInput";

export const load: REPLFunction = (
  args: string[],
  isBrief: boolean
): string | string[][] => {

    // const bool = isBrief

    // console.log(bool);
    // console.log(isBrief);
  var res = "";
  if(args.length != 2) {
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
