import { useState } from "react";
import { csvDataMap } from "../../mockedJSON";
import { REPLFunction } from "../REPLInput";
import { log } from "console";


export const search: REPLFunction = (
  args: string[],
 isBrief: boolean,

): string | string[][] => {
  const column = args[0] ?? "";
  const value = args[1] ?? "";
  const filepath = args[2] ?? "";
  console.log(args);

  if (filepath == "") {
    return "must load file first";
  }

  if (column == "" || value == "" || filepath == "") {
    return "invaid inputs";
  }

  const mockData = csvDataMap[args[0]] ?? "invalid search";

  return mockData;
};
