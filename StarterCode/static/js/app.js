const the_json = "/Users/josephgeglia/Desktop/GW Data Analytics/Homework/Interactive_Visualizations_and_Dashboard/StarterCode/samples.json";
const url = "https://api.spacexdata.com/v2/launchpads";

d3.json(the_json).then(function(data){
    console.log(data);
});

// const bact_data = d3.json(data);
// console.log("Bacteria Data: ", bact_data);
