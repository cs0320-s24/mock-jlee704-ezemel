

interface HistoryItemProps {
  command: string | string[][];
}

/**
 * For arrays of strings aka CSVs, returns HTML table. Otherwise normal paragraph.
 * @param param0 
 * @returns 
 */
export function HistoryItem({ command }: HistoryItemProps) {

    console.log(typeof command);

   if(Array.isArray(command) && Array.isArray(command[0])) {
    return (
      <div className="history-item-table">
        <table>
          <tbody>
            {command.map((row: string[], rowIndex: number) => (
              <tr key={rowIndex}>
                {row.map((cell: string, cellIndex: number) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  } else {
    if (typeof command == "string") {
      return (
        <div className="history-item">
          <p>{command}</p>
        </div>
      );
    }
  }


  return (
    <div className="history-item">
       <p>invalid format</p>
    </div>
  );
}
