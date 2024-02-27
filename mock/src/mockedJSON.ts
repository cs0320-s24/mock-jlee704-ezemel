
// csvData.ts
export const csvDataMap: { [key: string]: string[][] } = {
  "mock/view.csv": [
    ["view", "view", "view"],
    ["view", "view", "view"],
  ],
  "mock/search.csv": [
    ["search", "search", "search"],
    ["search", "search", "search"],
  ],
  "mock/load.csv": [
    ["load", "load", "load"],
    ["load", "load", "load"],
  ],
};


// For example, in your mocked CSV, one idea is to have 
// the data but also have another variable that is the query.
//  Then, you can decide if that mocked search is valid or not.
//   For example, if I make the query something that does not exist 
//   in the CSV data, then I am mocking a failed search and give a 
//   "failed search" response back to the user. 