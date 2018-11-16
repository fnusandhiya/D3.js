// @TODO: YOUR CODE HERE!
d3.csv("/assets/data/data.csv").then(function(Data, error) {
    if (error) return console.warn(error);
  
    console.log(Data);
});