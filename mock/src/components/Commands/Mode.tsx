import { useState } from "react";
import { csvDataMap } from "../../mockedJSON";
import { REPLFunction } from "../REPLInput";

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
