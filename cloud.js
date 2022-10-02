var WORDLIST = [
  "courses",
  "data sets and databases",
  "calendars",
  "APIs",
  "training classes",
  "source code",
  "tutorials",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

function draw(words) {
  d3.select("body").append("svg")
    .attr("width", layout.size()[0])
    .attr("height", layout.size()[1])
    .append("g")
    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("font-family", "Impact")
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + 0 + ")";
        // return "translate(" + [d.x, d.y] + ")";
    })
    .text(function(d) { return d.text; }
  );
}

var layout = d3.layout.cloud()
  .size([500, 500])
  .words(
      WORDLIST.map(function(d) {
      return {text: d, size: 10 + Math.random() * 90, test: "haha"};
  }))
  .padding(3)
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .font("Impact")
  .fontSize(function(d) { return d.size; })
  .on("end", draw)
;

layout.start();
