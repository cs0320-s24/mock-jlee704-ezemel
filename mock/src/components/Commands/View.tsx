import { useState } from "react";
import { csvDataMap } from "../../mockedJSON";
import { REPLFunction } from "../REPLInput";

/**
 * Takes in filepath as arg. Returns whole csv if a valid
 * filepath is loaded.
 * @param args 
 * @param isBrief 
 * @returns string
 */
export const view: REPLFunction = (
  args: string[],
  isBrief: boolean
): string | string[][] => {
  const filepath = args[0];

  if (filepath == "") {
    return "file must be loaded before view";
  }

  const mockData = csvDataMap[filepath] ?? "file not found";

  return mockData;
};
