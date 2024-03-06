import { useState } from "react";
import { csvDataMap } from "../../mockedJSON";
import { REPLFunction } from "../REPLInput";

/**
 * Switches the mode between brief and verbose using parameterized setIsBrief and isBrief.
 * Returns a message with the result.
 * @param args
 * @param isBrief 
 * @param setIsBrief 
 * @returns 
 */
export const mode: REPLFunction = (
  args: string[],
  isBrief: boolean,
  setIsBrief: (value: boolean) => void
): string | string[][] => {
  var bool = isBrief;
  bool = !bool;

  setIsBrief(!isBrief);

  if (bool == true) {
    return "brief mode!";
  } else {
    return "verbose mode";
  }
};
