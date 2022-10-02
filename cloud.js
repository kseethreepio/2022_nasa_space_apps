var WORDLIST = [
  "courses",
  "data sets and databases",
  "calendars",
  "APIs",
  "training classes",
  "source code",
  "tutorials",
];

function draw(words) {
  d3.select("body").append("svg")
    .attr("width", layout.size()[0])
    .attr("height", layout.size()[1])
    .append("g")
    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
    .data(words)
    .enter().append("a").attr("href", function(d) { return "./test"; })
    .append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("font-family", "Impact")
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
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

var checkboxes = document.querySelectorAll("input");
for (var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("click", function(event) {
    var filterType = event.target.parentElement.parentElement.className;
    if (event.target.checked) {
      if (window.localStorage.key(filterType) === null) {
        window.localStorage.setItem(filterType, event.target.id);
      } else {
        window.localStorage.setItem(filterType, window.localStorage.getItem(filterType) + "," + event.target.id);
      }
    } else {
      window.localStorage.setItem(filterType, window.localStorage.getItem(filterType).replace(event.target.id, ""));
      localStorage.setItem(filterType, localStorage.getItem(filterType).replace(/,{2,}/, ""));
    }
  });
}
