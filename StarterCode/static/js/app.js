const url = "https://github.com/JMGLIA/Interactive_Visualizations_and_Dashboard/blob/master/data/samples.json";
var globaldata
function renderGraphs(sample) {
    let sample_values = sample.sample_values.slice(0, 10).reverse();
    let otu_ids = sample.otu_ids.slice(0, 10).reverse();
    let otu_labels = sample.otu_labels.slice(0, 10).reverse();
    // console.log(sample_values);
    // console.log(otu_ids);
    // console.log(otu_labels);

    var trace1 = {
        x: sample_values,
        y: otu_ids.map(otu => `OTU ${otu}`),
        orientation: "h",
        type: "bar"
    };
    // console.log(trace1);

    var layout = {
        title: "The Bar Chart",
        margin: {
            // l: 100,
            // r: 100,
            // t: 100,
            // b: 100
        }
    }

    Plotly.newPlot("bar", [trace1], layout);

    var trace2 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels.map(otu => `OTU ${otu}`),
        mode: 'markers',
        marker: {
            color: otu_ids,
            opacity: [1, 0.8, 0.6, 0.4],
            size: sample_values
        }
    };

    var data = [trace2];

    var layout = {
        title: 'What do you have living in your belly button?',
        showlegend: false,
        // height: 600,
        // width: 900
    };

    Plotly.newPlot('bubble', data, layout);
}
function renderMetaData(metadata) {
    var PANEL = document.querySelector("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.innerHTML = "";

    PANEL.append(createP(`id: ${metadata.id}`));
    PANEL.append(createP(`ethnicity: ${metadata.ethnicity}`));
    PANEL.append(createP(`gender: ${metadata.gender}`));
    PANEL.append(createP(`age: ${metadata.age}`));
    PANEL.append(createP(`location: ${metadata.location}`));
    PANEL.append(createP(`bbtype: ${metadata.bbtype}`));
    PANEL.append(createP(`wfreq: ${metadata.wfreq}`));
}
function createP(innertext) {
    var p = document.createElement('p')
    p.innerText = innertext
    return p
}
function optionChanged(id) {
    var sample = globaldata.samples.find(s => s.id === id)
    var metadata = globaldata.metadata.find(s => s.id == id)
    console.log(id)
    console.log(globaldata.metadata[0])
    renderGraphs(sample)
    renderMetaData(metadata)
}
d3.json("https://gist.githubusercontent.com/JMGLIA/44a15de11dc308f935d15661f311dd08/raw/86615921eb05f36de44396f35d4a1412a252f615/jg-sample-json").then(function (data) {
    console.log(data);
    for (let i = 0; i < data.names.length; i++) {
        var option = document.createElement('option')
        option.setAttribute('value', data.names[i])
        option.innerText = data.names[i]
        document.querySelector('#selDataset').append(option);
    }

    globaldata = data;
    optionChanged(data.samples[0].id)

    var inputField = d3.select("#selDataset");
    // inputField.on("change", function () {
    // var user_pic_value = d3.event.target.value;
    // $("#sample-metadata").empty();

 
});


