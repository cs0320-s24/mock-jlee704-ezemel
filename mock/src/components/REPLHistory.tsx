import { table } from 'console';
import '../styles/main.css';

interface REPLHistoryProps{
    // TODO: Fill with some shared state tracking all the pushed commands
    // CHANGED
    history: string[]
}
export function REPLHistory(props : REPLHistoryProps) {
    return (
      <div className="repl-history" aria-label="repl-history">
        {/* This is where command history will go */}
        {/* TODO: To go through all the pushed commands... try the .map() function! */}
        {/* CHANGED */}
        {props.history.map((command, index) => (
          <p>{command}</p>
        ))}
        {/* {props.history.map((result, index) => {
            <table>
                <tbody>
                    {result.map((data, index) => {
                        <p>{data}</p>
                    })}
                </tbody>
            </table>
        })} */}
        <div className="csvData">
          <table>
            <tbody>
              {/* {props.history.map((command, index) => (
                <tr key={index}>
                  {command.map((data, dataIndex) => (
                    <td key={dataIndex}>{data}</td>
                  ))}
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    );
}