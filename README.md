# Sudoku

This started as a hobby project. I did not realize just how complex it would become. 

The current solution will render a completed sudoku solution. The remaining steps to create the puzzle would be to remove diagnolly symmetric cells while maintaining that there is only one solution to the puzzle. Doing this seems to be extremely costly, as a solver requires examining the entire board a multitude of times to determine solutions. I do not believe that the current architecture I have setup would be appropriate for this scenario. For now I am abandoning the project, but may return in the future to redeem myself :) 