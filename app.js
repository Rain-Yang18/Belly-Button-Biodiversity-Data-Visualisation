// Read the JSON file & apend the names into the dropdown
d3.json("samples.json").then(function(data) {

  // console.log(data);

  var names = data.names;
  // console.log(names);

  var dropdownMenu = d3.select("#selDataset");
  names.forEach(function(name) {
    dropdownMenu.append("option").text(name);
  })

  // Run the first chart with the first name & data
  buildBar(names[0]);
  buildBubble(names[0]);
  insertinfo(names[0]);

})

// Build the optionChanged function - run charts with the newname selected
function optionChanged (newname) {

  buildBar(newname);
  buildBubble(newname);
  insertinfo(newname);
  buildGauge(newname);

}

// Bar chart function
function buildBar (id) {

  // Import the JSON file again
  d3.json("samples.json").then(function(data) {
    
    // console.log(data);
    
    // Filter the data when the id is the same in the sample array
    var sample = data.samples.filter(x => x.id == id)[0];
    // console.log(sample);
  
    // Create the variables for x & y & text for plotting
    var values = sample.sample_values.slice(0, 10).reverse();
    var labels = sample.otu_ids.slice(0, 10).reverse();
    var text = sample.otu_labels.slice(0, 10).reverse();

    var updatelabels = [];
    labels.forEach((label) => {
      updatelabels.push("OTU " + label);
    });

    // console.log(values);
    // console.log(labels);
    // console.log(text);

    // Trace
    var trace = {
      x: values,
      y: updatelabels,
      text: text,
      type: "bar",
      orientation: "h"
    };

    // Data
    var data = [trace];

    // Layout
    var layout = {
      yaxis:{
          tickmode:"linear",
      },
      margin: {
          l: 100,
          r: 100,
          t: 20,
          b: 20
      }
  };

    Plotly.newPlot("bar", data, layout);  
  
  })
}


function buildBubble (id) {
  d3.json("samples.json").then(function(data) {
    
    //console.log(data)

    // Filter the data when the id is the same in the sample array
    var sample = data.samples.filter(x => x.id == id)[0];
    // console.log(sample);
  
    // Create the variables for x & y & text for plotting
    var x = sample.otu_ids;
    var y = sample.sample_values;
    var text = sample.otu_labels;

    var trace = {
      x: x,
      y: y,
      text: text,
      mode: 'markers',
      marker: {
        color: x,
        size: y
      }
    };
    
    var data = [trace];
    
    var layout = {
      showlegend: false,
      height: 450,
      width: 1150,
      xaxis: {
        title: "OTU ID"
      }
    };
    
    Plotly.newPlot("bubble", data, layout);

  })
}


function insertinfo (id) {
  d3.json("samples.json").then(function(data) {
    
    // console.log(data)

    // Filter the data when the id is the same at metadata array
    var sample = data.metadata.filter(x => x.id == id)[0];
    // console.log(sample);
  
    var panel = d3.select("#sample-metadata");

    panel.text("");

    Object.entries(sample).forEach(function([key, value]) {
      // console.log(key, value);
      var cell = panel.append("p");
      cell.text(`${key}: ${value}`);
    });

  })
}

// function buildGauge() {
//   d3.json("samples.json").then(function(data) {
    
//     console.log(data)

//     // Filter the data when the id is the same at metadata array
//     var sample = data.metadata.filter(x => x.id == id)[0];
//     // console.log(sample);
  
//     var washingfreq = sample.wfreq;

//     var data = [
//       {
//         domain: { x: [0, 1], y: [0, 1] },
//         value: 270,
//         title: { text: "Speed" },
//         type: "indicator",
//         mode: "gauge+number"
//       }
//     ];
    
//     var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
//     Plotly.newPlot('myDiv', data, layout);

//   })

// }