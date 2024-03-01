import { useState } from "react";
import { csvDataMap } from "../../mockedJSON";
import { REPLFunction } from "../REPLInput";
import { log } from "console";

/**
 * Search function for the REPL. Takes value and column index as args,
 * with filepath as the last arg. Filepath will = "" if no file has been loaded.
 * Mocked version returns the whole csv for every search as long as the filepath is
 * to a real mocked csv.
 * @param args
 * @param isBrief 
 * @returns 
 */
export const searchColumnIndex: REPLFunction = (
  args: string[],
 isBrief: boolean,

): string | string[][] => {
  const value = args[0] ?? "";
  const columnIndex = parseInt(args[1]) ?? -1;
  const filepath = args[2] ?? "";
  console.log(args);

  if(args.length != 3) {
    return "invalid syntax: searchindex <value> <columnIndex>";
  }

  if (filepath == "") {
    return "must load file first";
  }

  // if (columnIndex == -1 || value == "" || filepath == "") {
  //   return "invaid inputs";
  // }

  const mockData = csvDataMap[args[0]] ?? "invalid search";

  return mockData;
};
