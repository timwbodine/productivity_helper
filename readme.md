# README 

A very basic productivity helper.  When invoked, this program will tell you what
to work on and begin tracking the time you spend working.  When invoked again it
will record  time worked and close.  Repeat ad infinitum to ensure an even
distribution of time spent on different tasks.  Future updates will include
options to provide different weights/importance to tasks and will refresh on
a cyclical basis.  

## Requirements
Requires a global installation of node.

## Installation and usage

simply clone this repository and place the output.json file and app.js in
location of choice.  Then edit your .bashrc or .zshrc or whatever with the
following, substituting the the curly brace content with the directory of your
choice:

```alias work="cd {DIRECTORY WITH THE FILES}; node {DIRECTORY WITH THE FILES}/app.js; cd -"```

finally, edit the JSON file replacing the various task names in the "times"
object with whatever you
desire, and add more as needed.  Do not edit the "state" object. 
Then, simply enter ```work``` whenever you wish to start/stop working.
Currently requires absolute adherence to app recommendations. :)


