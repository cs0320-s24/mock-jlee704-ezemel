import { useState } from "react";
import { csvDataMap } from "../../mockedJSON";
import { REPLFunction } from "../REPLInput";
import { log } from "console";


export const search: REPLFunction = (args: string[]): string | string[][] => {

  const column = args[0] ?? "";
  const value = args[1] ?? "";
  const filepath = args[2] ?? "";
  console.log(args);

  if (column == "" || value == "" || filepath == "") {
    return "invaid inputs";
  }
  console.log(csvDataMap[args[0][1]]);
  
  if (csvDataMap[args[0]][0].includes(value)) //want to do quick check if value in map but not working
    return csvDataMap[args[0]];

  return 'got here' // fix this
 
  const mockData = csvDataMap[args[0]] ?? "file not found";

  return mockData;
};
