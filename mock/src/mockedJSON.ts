
/**
 * Mocked data of CSVs
 */
export const csvDataMap: { [key: string]: string[][] } = {
  "mock/view.csv": [
    ["view", "view", "view"],
    ["view", "view", "view"],
  ],
  "mock/search.csv": [
    ["search", "search", "search"],
    ["search", "search", "search"],
  ],
  "valid": [
    ["valid", "search", "row"],
  ],
  "one_column": [
    ["one column"],
    ["one column"]
  ],
  "empty": [
    []
  ],
  "malformed": [
    ["1","2"],
    ["1","2","3"]
  ]
};