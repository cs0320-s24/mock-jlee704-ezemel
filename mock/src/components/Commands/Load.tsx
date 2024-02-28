import { useState } from "react";
import { csvDataMap } from "../../mockedJSON";
import { REPLFunction} from "../REPLInput";

export const load: REPLFunction = (
  args: string[],
  isBrief: boolean
): string | string[][] => {

    const bool = isBrief

    console.log(bool);
    console.log(isBrief);

  if (bool) {
    return "isbrief"
  }
  if (csvDataMap[args[0]]) {
    // if file exists in map
    return "load success!";
  }

  return "file not found";
};
