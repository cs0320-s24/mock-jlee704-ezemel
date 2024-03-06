> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details

Project name: Mock

Team members and contributions (include cs logins): Eitan Zemel (ezemel), Mason Lee (jlee704)

Include the total estimated time it took to complete project: 20

A link to your repo: https://github.com/cs0320-s24/mock-jlee704-ezemel.git

# Design Choices

Explain the relationships between classes/interfaces:

The big interface that we used for the commands was the REPLFunction interface which returns a string to print to history - we edited it to take in an isBrief boolean and setIsBrief function so that we can keep track of the mode (is brief or verbose) across all commands and we can set it with the setIsBrief function within the mode command itself. 

Another interface that we used was to define a Command object which kept track of the command, result, and the mode in order to successfully print out the necessary aspects of verbose mode in each function, we keep track of and set the object before passing it into the REPLHistory. As a result, we had to change our repl history from an array of strings to an array of Commands. 

Discuss any specific data structures you used, why you created it, and other high level explanations:

In order to register and use commands, we utilized a map in our REPLInput component that maps command string to the command function itself. This way, instead of using an if/else statement, we can use the command returned from the map directly. 

Additionally, to mock results results from commands, we utilized another map that mapped queries to mock csvs in order to test the functionality of the front end such as viewing csvs and showing the right results when in both brief and verbose mode. 

Another design decision we made was to create a separate History item component in order to get our REPL history to display the response of a command in either a table if the response is an array of array of strings and just a p if the response is just a singular string. We also check in REPLHistory what mode history is in then display proper items depending on the mode. 


Runtime/ space optimizations you made (if applicable):


# Errors/Bugs

N/A

# Tests
Tests can be found in App.spec.ts in tests/e2e. To run tests, make sure playwright is installed, cd into the mock directory, and run 
npm test. Tests included test the layout of the page, the login and sign out functionality, and all of the preset commands.

# How to
To run locally, cd into the mock directory and run npm start. Then, open http://localhost:8000/ in your browser.

To see available commands, log in and enter+submit 'help'.

Developers can add extra functions and commands (not through the REPL) using the addCommand function in REPLInput. New commands
will not show up in the help command without editing the REPLInput file.

# Collaboration
*(state all of your sources of collaboration past your project partner. Please refer to the course's collaboration policy for any further questions.)*

Utilized ed post #316 for centering the HTML table and inspiration for using the checking style for REPLHistory. 


