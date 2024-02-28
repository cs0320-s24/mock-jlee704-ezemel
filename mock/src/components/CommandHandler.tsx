import { csvDataMap } from "../mockedJSON";
import { REPLFunction } from "./REPLInput";
import { Dispatch, SetStateAction, useState } from "react";


export function CommandHandler() {}

export const view: REPLFunction = (
  args: Array<string>
): string | string[][] => {

  const { fPath } = useFPathState();

  if (fPath == "") {
    return "file not loaded";
  }

  const mockData = csvDataMap[fPath];

  return mockData;
};

export const search: REPLFunction = (
  args: Array<string>
): string | string[][] => {
    const { fPath } = useFPathState();

  if (fPath == "") {
    return "file not loaded";
  }

  const filepath = args[0];

  const file = csvDataMap[filepath];

  return file; 
};

export const load: REPLFunction = (
  args: Array<string>,
  
): string | string[][] => {
  const {fPath, setFPath} = useFPathState();

    const newFPath = args[0];
    setFPath(newFPath);


  const mockData = csvDataMap[fPath] ?? "file not found";

  return mockData;
}
