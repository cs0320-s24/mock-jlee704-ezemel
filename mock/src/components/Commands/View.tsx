import { useState } from "react";
import { csvDataMap } from "../../mockedJSON";
import { REPLFunction } from "../REPLInput";

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
