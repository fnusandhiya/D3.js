// @TODO: YOUR CODE HERE!
d3.csv("./data.csv", function(error, Data) {
    if (error) return console.warn(error);
  
    console.log(Data);
});