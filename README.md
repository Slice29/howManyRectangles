# howManyRectangles

## Project Description

This is a nifty project that identifies all possible rectangles parallel to the axes from a set of given points. It has $O(n^3)$ time complexity.

It has a visual interface built using Canvas API and Bootstrap.

## Implementation details

The rectangle detection is done by sorting the array, parsing it to a matrix, then iterating over its elements and checking for possible opposite corners of rectangles.

If they exist, a search for the other two vertices is triggered.

If all four points exist, they are saved to an array and their coordinates are displayed.

### Note on complexity

While reseaching this project, I've found out that $O(n^3)$ is the best complexity attainable without using either more complex algorithms or more advanced data structures.
Using a sweep line or a specialized data structure such as a segment tree would bring the complexity down to $O(n^2 log(n))$, as the search for the element could be done with a binary search.

## How to use the app

I highly recommend using the app on a desktop PC, as it's not responsive enough to be used on mobile screens.

The project has the following inputs: the size of the grid and the points to check on the grid.

The coordinates are flipped from the classical cartesian ones, as it was easier for me to work with them this way. So X coordinate is really the Y coordinate and the other way around.

After submitting the first form, the grid and the points will be generated on the canvas. 

I took the liberty to provide some input data, but feel free to change it and experiment with different grid sizes and points.

The sizing of the grid, the points and the line size are dynamic so it works for general case use.

After locking in the desired grid size and the points, you can submit the second form to the right of the canvas to trigger the search for the rectangles.

The number of rectangles is then displayed, along with the first identified rectangle and its coordinates.

Using the 'Next' button, you can cycle through the rectangles and the canvas will update accordingly.

### Constraints

Errors aren't handled at this point, so make sure both the size of the grid and the coordinates are positive integers.

Also the first coordinate should be between 0 and the first value in the first text box, and the second coordinate should be between 0 and the second value from the first text box.

## Limitations and plans for the future

The project doesn't support detection of rectangles which aren't parallel to the axes.

Also, I plan on implementing a way to handle the input errors in the future.

The app could also be improved by using a different library to draw the rectangles, as Canvas API requires to draw and redraw the whole grid along with the points for each new rectangle to be displayed.

While the design has some responsive features, it's not nearly responsive enough to be used on mobile devices, so that could definitely be an improvement in the future
