import { useState } from "react";
import { csvDataMap } from "../../mockedJSON";
import { REPLFunction } from "../REPLInput";
import { log } from "console";

/**
 * Search function for the REPL. Takes either value or value and column name as args,
 * with filepath as the last arg. Filepath will = "" if no file has been loaded.
 * Mocked version returns the whole csv for every search as long as the filepath is
 * to a real mocked csv.
 * @param args 
 * @param isBrief 
 * @returns string
 */
export const search: REPLFunction = (
  args: string[],
 isBrief: boolean,

): string | string[][] => {
  const value = args[0] ?? "";
  const columnName = args.length == 3 ? args[1] : ""; //args.length == 3 means user inputted a columnName
  const filepath = args.length == 3 ? args[2] : args[1]; //args.length == 2 means user just inputted a value
  // console.log(args);

  if(args.length > 3 || args.length < 2) {
    return "invalid syntax: search <value> <columnName (optional)>";
  }

  if (filepath == "") {
    return "must load file first";
  }

  // if (value == "" || filepath == "") {
  //   return "invalid inputs";
  // }

  const mockData = csvDataMap[filepath] ?? "invalid search";

  return mockData;
};
