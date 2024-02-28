import { useState } from "react";
import { csvDataMap } from "../../mockedJSON";
import { REPLFunction } from "../REPLInput";

export const view: REPLFunction = (args: string[]): string | string[][] => {

  const filepath = args[0]

  const mockData = csvDataMap[filepath] ?? "file not found";

  return mockData;
};