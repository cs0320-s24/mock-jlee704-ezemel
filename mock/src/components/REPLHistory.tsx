import { table } from 'console';
import '../styles/main.css';
import { HistoryItem } from './HistoryItem';
import { Command } from './REPLInput';

interface REPLHistoryProps{
    // TODO: Fill with some shared state tracking all the pushed commands
    // CHANGED
    history: Command[]
}
export function REPLHistory(props : REPLHistoryProps) {
    return (
      <div className="repl-history" aria-label="repl-history">
        {/* This is where command history will go */}
        {/* TODO: To go through all the pushed commands... try the .map() function! */}
        {/* CHANGED */}
        {/* {props.history.map((command, index) => (
          //<p>{command}</p>
          <HistoryItem key={index} command={command} />
        ))} */}
        <div className="repl-history">
          {props.history.map((command, index) =>
            command.isBrief ? (
              <HistoryItem command={command.result} />
            ) : (
              <div>
                <p>Command: {command.command}</p>
                <p>Ouput:</p>
                <HistoryItem command={command.result} />
                {/* <p>{command.result}</p> */}
              </div>
            )
          )}
        </div>
      </div>
    );
}