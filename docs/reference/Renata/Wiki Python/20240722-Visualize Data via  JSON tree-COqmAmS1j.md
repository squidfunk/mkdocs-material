# Visualize Data via  JSON tree

marc

### Folderu Structure
```
project/
│
├── required.txt
├── parse_markdown.py
├── toc.json
└── index.html
```

### 1. `required.txt`
This file will list the required Python libraries.

```
markdown
```

### 2. `parse_markdown.py`
This Python script will parse the markdown file and generate `toc.json`.

```python
import json
import markdown
from markdown.treeprocessors import Treeprocessor
from markdown.extensions import Extension

class TableOfContentsExtractor(Treeprocessor):
    def run(self, root):
        toc = []
        for element in root:
            if element.tag == 'h1':
                toc.append({'title': element.text, 'children': []})
            elif element.tag == 'h2' and toc:
                toc[-1]['children'].append({'title': element.text, 'children': []})
            elif element.tag == 'h3' and toc and toc[-1]['children']:
                toc[-1]['children'][-1]['children'].append({'title': element.text})
        return toc

class TOCExtension(Extension):
    def extendMarkdown(self, md):
        md.treeprocessors.register(TableOfContentsExtractor(md), 'extractor', 10)

def parse_markdown_to_json(md_content):
    md = markdown.Markdown(extensions=[TOCExtension()])
    md.convert(md_content)
    toc = md.treeprocessors['extractor'].run(md.parser.root)
    return toc

# Read the markdown file
with open('your_markdown_file.md', 'r') as file:
    md_content = file.read()

# Parse the markdown content to JSON
toc_json = parse_markdown_to_json(md_content)

# Save the JSON to a file
with open('toc.json', 'w') as json_file:
    json.dump(toc_json, json_file, indent=2)

print("Table of Contents JSON generated successfully.")
```

### 3. `index.html`
This HTML file will visualize the `toc.json` as a tree diagram.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>JSON Tree Visualization</title>
    <style>
        .node {
            cursor: pointer;
        }

        .node circle {
            fill: #fff;
            stroke: steelblue;
            stroke-width: 3px;
        }

        .node text {
            font: 12px sans-serif;
        }

        .link {
            fill: none;
            stroke: #ccc;
            stroke-width: 2px;
        }
    </style>
</head>
<body>
    <div id="tree-container"></div>
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <script>
        var treeData = {};

        // Load the JSON data
        fetch('toc.json')
            .then(response => response.json())
            .then(data => {
                treeData = data[0]; // Assuming the first element as the root
                drawTree(treeData);
            });

        function drawTree(treeData) {
            var margin = {top: 20, right: 90, bottom: 30, left: 90},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var svg = d3.select("body").append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var i = 0,
                duration = 750,
                root;

            var treemap = d3.tree().size([height, width]);

            root = d3.hierarchy(treeData, function(d) { return d.children; });
            root.x0 = height / 2;
            root.y0 = 0;

            update(root);

            function update(source) {
                var treeData = treemap(root);
                var nodes = treeData.descendants(),
                    links = treeData.descendants().slice(1);

                nodes.forEach(function(d){ d.y = d.depth * 180});

                var node = svg.selectAll('g.node')
                    .data(nodes, function(d) { return d.id || (d.id = ++i); });

                var nodeEnter = node.enter().append('g')
                    .attr('class', 'node')
                    .attr("transform", function(d) {
                        return "translate(" + source.y0 + "," + source.x0 + ")";
                    })
                    .on('click', click);

                nodeEnter.append('circle')
                    .attr('class', 'node')
                    .attr('r', 1e-6)
                    .style("fill", function(d) {
                        return d._children ? "lightsteelblue" : "#fff";
                    });

                nodeEnter.append('text')
                    .attr("dy", ".35em")
                    .attr("x", function(d) {
                        return d.children || d._children ? -13 : 13;
                    })
                    .attr("text-anchor", function(d) {
                        return d.children || d._children ? "end" : "start";
                    })
                    .text(function(d) { return d.data.title; });

                var nodeUpdate = nodeEnter.merge(node);

                nodeUpdate.transition()
                    .duration(duration)
                    .attr("transform", function(d) { 
                        return "translate(" + d.y + "," + d.x + ")";
                    });

                nodeUpdate.select('circle.node')
                    .attr('r', 10)
                    .style("fill", function(d) {
                        return d._children ? "lightsteelblue" : "#fff";
                    })
                    .attr('cursor', 'pointer');

                var nodeExit = node.exit().transition()
                    .duration(duration)
                    .attr("transform", function(d) {
                        return "translate(" + source.y + "," + source.x + ")";
                    })
                    .remove();

                nodeExit.select('circle')
                    .attr('r', 1e-6);

                nodeExit.select('text')
                    .style('fill-opacity', 1e-6);

                var link = svg.selectAll('path.link')
                    .data(links, function(d) { return d.id; });

                var linkEnter = link.enter().insert('path', "g")
                    .attr("class", "link")
                    .attr('d', function(d){
                        var o = {x: source.x0, y: source.y0}
                        return diagonal(o, o)
                    });

                var linkUpdate = linkEnter.merge(link);

                linkUpdate.transition()
                    .duration(duration)
                    .attr('d', function(d){ return diagonal(d, d.parent) });

                var linkExit = link.exit().transition()
                    .duration(duration)
                    .attr('d', function(d) {
                        var o = {x: source.x, y: source.y}
                        return diagonal(o, o)
                    })
                    .remove();

                nodes.forEach(function(d){
                    d.x0 = d.x;
                    d.y0 = d.y;
                });

                function diagonal(s, d) {
                    path = `M ${s.y} ${s.x}
                            C ${(s.y + d.y) / 2} ${s.x},
                              ${(s.y + d.y) / 2} ${d.x},
                              ${d.y} ${d.x}`

                    return path
                }

                function click(d) {
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                    } else {
                        d.children = d._children;
                        d._children = null;
                    }
                    update(d);
                }
            }
        }
    </script>
</body>
</html>
```

### How to Run

1. **Set up the environment:**
   - Create the folder structure as shown above.
   - Place your markdown file in the same directory as the scripts.

2. **Install the required library:**
   ```sh
   pip install -r required.txt
   ```

3. **Run the Python script:**
   ```sh
   python parse_markdown.py
   ```

4. **Open the `index.html` file in a web browser:**

# Version 2

### Folder Structure
```
project/
│
├── required.txt
├── parse_markdown.py
├── toc.json
└── index.html
```

### 1. `required.txt`
This file will list the required Python libraries.

```txt
markdown
```

### 2. `parse_markdown.py`
This Python script will parse the markdown file and generate `toc.json`.

```python
import json
import markdown
from markdown.treeprocessors import Treeprocessor
from markdown.extensions import Extension

class TableOfContentsExtractor(Treeprocessor):
    def run(self, root):
        toc = []
        stack = [{'children': toc}]
        for element in root:
            if element.tag == 'h1':
                stack = [stack[0]]
                stack[-1]['children'].append({'title': element.text, 'children': []})
                stack.append(stack[-1]['children'][-1])
            elif element.tag == 'h2' and len(stack) > 1:
                stack = stack[:2]
                stack[-1]['children'].append({'title': element.text, 'children': []})
                stack.append(stack[-1]['children'][-1])
            elif element.tag == 'h3' and len(stack) > 2:
                stack = stack[:3]
                stack[-1]['children'].append({'title': element.text})
        return toc

class TOCExtension(Extension):
    def extendMarkdown(self, md):
        md.treeprocessors.register(TableOfContentsExtractor(md), 'extractor', 10)

def parse_markdown_to_json(md_content):
    md = markdown.Markdown(extensions=[TOCExtension()])
    md.convert(md_content)
    toc = md.treeprocessors['extractor'].run(md.parser.root)
    return toc

# Read the markdown file
with open('your_markdown_file.md', 'r') as file:
    md_content = file.read()

# Parse the markdown content to JSON
toc_json = parse_markdown_to_json(md_content)

# Save the JSON to a file
with open('toc.json', 'w') as json_file:
    json.dump(toc_json, json_file, indent=2)

print("Table of Contents JSON generated successfully.")
```

### 3. `index.html`
This HTML file will visualize the `toc.json` as a tree diagram.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>JSON Tree Visualization</title>
    <style>
        .node {
            cursor: pointer;
        }

        .node circle {
            fill: #fff;
            stroke: steelblue;
            stroke-width: 3px;
        }

        .node text {
            font: 12px sans-serif;
        }

        .link {
            fill: none;
            stroke: #ccc;
            stroke-width: 2px;
        }
    </style>
</head>
<body>
    <div id="tree-container"></div>
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <script>
        var treeData = {};

        // Load the JSON data
        fetch('toc.json')
            .then(response => response.json())
            .then(data => {
                treeData = { title: "Table of Contents", children: data }; // Wrapping the array with a root node
                drawTree(treeData);
            });

        function drawTree(treeData) {
            var margin = {top: 20, right: 90, bottom: 30, left: 90},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var svg = d3.select("body").append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var i = 0,
                duration = 750,
                root;

            var treemap = d3.tree().size([height, width]);

            root = d3.hierarchy(treeData, function(d) { return d.children; });
            root.x0 = height / 2;
            root.y0 = 0;

            update(root);

            function update(source) {
                var treeData = treemap(root);
                var nodes = treeData.descendants(),
                    links = treeData.descendants().slice(1);

                nodes.forEach(function(d){ d.y = d.depth * 180});

                var node = svg.selectAll('g.node')
                    .data(nodes, function(d) { return d.id || (d.id = ++i); });

                var nodeEnter = node.enter().append('g')
                    .attr('class', 'node')
                    .attr("transform", function(d) {
                        return "translate(" + source.y0 + "," + source.x0 + ")";
                    })
                    .on('click', click);

                nodeEnter.append('circle')
                    .attr('class', 'node')
                    .attr('r', 1e-6)
                    .style("fill", function(d) {
                        return d._children ? "lightsteelblue" : "#fff";
                    });

                nodeEnter.append('text')
                    .attr("dy", ".35em")
                    .attr("x", function(d) {
                        return d.children || d._children ? -13 : 13;
                    })
                    .attr("text-anchor", function(d) {
                        return d.children || d._children ? "end" : "start";
                    })
                    .text(function(d) { return d.data.title; });

                var nodeUpdate = nodeEnter.merge(node);

                nodeUpdate.transition()
                    .duration(duration)
                    .attr("transform", function(d) { 
                        return "translate(" + d.y + "," + d.x + ")";
                    });

                nodeUpdate.select('circle.node')
                    .attr('r', 10)
                    .style("fill", function(d) {
                        return d._children ? "lightsteelblue" : "#fff";
                    })
                    .attr('cursor', 'pointer');

                var nodeExit = node.exit().transition()
                    .duration(duration)
                    .attr("transform", function(d) {
                        return "translate(" + source.y + "," + source.x + ")";
                    })
                    .remove();

                nodeExit.select('circle')
                    .attr('r', 1e-6);

                nodeExit.select('text')
                    .style('fill-opacity', 1e-6);

                var link = svg.selectAll('path.link')
                    .data(links, function(d) { return d.id; });

                var linkEnter = link.enter().insert('path', "g")
                    .attr("class", "link")
                    .attr('d', function(d){
                        var o = {x: source.x0, y: source.y0}
                        return diagonal(o, o)
                    });

                var linkUpdate = linkEnter.merge(link);

                linkUpdate.transition()
                    .duration(duration)
                    .attr('d', function(d){ return diagonal(d, d.parent) });

                var linkExit = link.exit().transition()
                    .duration(duration)
                    .attr('d', function(d) {
                        var o = {x: source.x, y: source.y}
                        return diagonal(o, o)
                    })
                    .remove();

                nodes.forEach(function(d){
                    d.x0 = d.x;
                    d.y0 = d.y;
                });

                function diagonal(s, d) {
                    path = `M ${s.y} ${s.x}
                            C ${(s.y + d.y) / 2} ${s.x},
                              ${(s.y + d.y) / 2} ${d.x},
                              ${d.y} ${d.x}`

                    return path
                }

                function click(d) {
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                    } else {
                        d.children = d._children;
                        d._children = null;
                    }
                    update(d);
                }
            }
        }
    </script>
</body>
</html>
```

### How to Run

1. **Set up the environment:**
   - Create the folder structure as shown above.
   - Place your markdown file named `your_markdown_file.md` in the same directory as the scripts.

2. **Install the required library:**
   ```sh
   pip install -r required.txt
   ```

3. **Run the Python script:**
   ```sh
   python parse_markdown.py
   ```

4. **Open the `index.html` file in a web browser:**
   - This will visualize the JSON tree generated from the markdown file.


# Version 3
Monday, July 22, 2024 9:24 PM


### Folder Structure
```
project/
│
├── requirements.txt
├── parse_markdown.py
├── toc.json
└── index.html
```

### 1. `requirements.txt`
This file lists the required Python libraries.

```txt
markdown
```

### 2. `parse_markdown.py`
This Python script will parse the markdown file and generate `toc.json`.

```python
import json
import markdown
from markdown.treeprocessors import Treeprocessor
from markdown.extensions import Extension

class TableOfContentsExtractor(Treeprocessor):
    def run(self, root):
        toc = []
        stack = [{'children': toc}]
        for element in root:
            if element.tag == 'h1':
                stack = [stack[0]]
                stack[-1]['children'].append({'title': element.text, 'children': []})
                stack.append(stack[-1]['children'][-1])
            elif element.tag == 'h2' and len(stack) > 1:
                stack = stack[:2]
                stack[-1]['children'].append({'title': element.text, 'children': []})
                stack.append(stack[-1]['children'][-1])
            elif element.tag == 'h3' and len(stack) > 2:
                stack = stack[:3]
                stack[-1]['children'].append({'title': element.text})
        return toc

class TOCExtension(Extension):
    def extendMarkdown(self, md):
        md.treeprocessors.register(TableOfContentsExtractor(md), 'extractor', 10)

def parse_markdown_to_json(md_content):
    md = markdown.Markdown(extensions=[TOCExtension()])
    md.convert(md_content)
    toc = md.treeprocessors['extractor'].run(md.parser.root)
    return toc

# Read the markdown file
with open('your_markdown_file.md', 'r') as file:
    md_content = file.read()

# Parse the markdown content to JSON
toc_json = parse_markdown_to_json(md_content)

# Save the JSON to a file
with open('toc.json', 'w') as json_file:
    json.dump(toc_json, json_file, indent=2)

print("Table of Contents JSON generated successfully.")
```

### 3. `index.html`
This HTML file will visualize the `toc.json` as a tree diagram.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>JSON Tree Visualization</title>
    <style>
        .node {
            cursor: pointer;
        }

        .node circle {
            fill: #fff;
            stroke: steelblue;
            stroke-width: 3px;
        }

        .node text {
            font: 12px sans-serif;
        }

        .link {
            fill: none;
            stroke: #ccc;
            stroke-width: 2px;
        }
    </style>
</head>
<body>
    <div id="tree-container"></div>
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <script>
        var treeData = {};

        // Load the JSON data
        fetch('toc.json')
            .then(response => response.json())
            .then(data => {
                treeData = { title: "Table of Contents", children: data }; // Wrapping the array with a root node
                drawTree(treeData);
            });

        function drawTree(treeData) {
            var margin = {top: 20, right: 90, bottom: 30, left: 90},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var svg = d3.select("body").append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var i = 0,
                duration = 750,
                root;

            var treemap = d3.tree().size([height, width]);

            root = d3.hierarchy(treeData, function(d) { return d.children; });
            root.x0 = height / 2;
            root.y0 = 0;

            update(root);

            function update(source) {
                var treeData = treemap(root);
                var nodes = treeData.descendants(),
                    links = treeData.descendants().slice(1);

                nodes.forEach(function(d){ d.y = d.depth * 180});

                var node = svg.selectAll('g.node')
                    .data(nodes, function(d) { return d.id || (d.id = ++i); });

                var nodeEnter = node.enter().append('g')
                    .attr('class', 'node')
                    .attr("transform", function(d) {
                        return "translate(" + source.y0 + "," + source.x0 + ")";
                    })
                    .on('click', click);

                nodeEnter.append('circle')
                    .attr('class', 'node')
                    .attr('r', 1e-6)
                    .style("fill", function(d) {
                        return d._children ? "lightsteelblue" : "#fff";
                    });

                nodeEnter.append('text')
                    .attr("dy", ".35em")
                    .attr("x", function(d) {
                        return d.children || d._children ? -13 : 13;
                    })
                    .attr("text-anchor", function(d) {
                        return d.children || d._children ? "end" : "start";
                    })
                    .text(function(d) { return d.data.title; });

                var nodeUpdate = nodeEnter.merge(node);

                nodeUpdate.transition()
                    .duration(duration)
                    .attr("transform", function(d) { 
                        return "translate(" + d.y + "," + d.x + ")";
                    });

                nodeUpdate.select('circle.node')
                    .attr('r', 10)
                    .style("fill", function(d) {
                        return d._children ? "lightsteelblue" : "#fff";
                    })
                    .attr('cursor', 'pointer');

                var nodeExit = node.exit().transition()
                    .duration(duration)
                    .attr("transform", function(d) {
                        return "translate(" + source.y + "," + source.x + ")";
                    })
                    .remove();

                nodeExit.select('circle')
                    .attr('r', 1e-6);

                nodeExit.select('text')
                    .style('fill-opacity', 1e-6);

                var link = svg.selectAll('path.link')
                    .data(links, function(d) { return d.id; });

                var linkEnter = link.enter().insert('path', "g")
                    .attr("class", "link")
                    .attr('d', function(d){
                        var o = {x: source.x0, y: source.y0}
                        return diagonal(o, o)
                    });

                var linkUpdate = linkEnter.merge(link);

                linkUpdate.transition()
                    .duration(duration)
                    .attr('d', function(d){ return diagonal(d, d.parent) });

                var linkExit = link.exit().transition()
                    .duration(duration)
                    .attr('d', function(d) {
                        var o = {x: source.x, y: source.y}
                        return diagonal(o, o)
                    })
                    .remove();

                nodes.forEach(function(d){
                    d.x0 = d.x;
                    d.y0 = d.y;
                });

                function diagonal(s, d) {
                    path = `M ${s.y} ${s.x}
                            C ${(s.y + d.y) / 2} ${s.x},
                              ${(s.y + d.y) / 2} ${d.x},
                              ${d.y} ${d.x}`

                    return path
                }

                function click(d) {
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                    } else {
                        d.children = d._children;
                        d._children = null;
                    }
                    update(d);
                }
            }
        }
    </script>
</body>
</html>
```

### How to Run

1. **Set up the environment:**
   - Create the folder structure as shown above.
   - Place your markdown file named `your_markdown_file.md` in the same directory as the scripts.

2. **Install the required library:**
   ```sh
   pip install -r requirements.txt
   ```

3. **Run the Python script:**
   ```sh
   python parse_markdown.py
   ```

4. **Open the `index.html` file in a web browser:**
   - This will visualize the JSON tree generated from the markdown file.

Setup will parse your markdown file into a JSON structure and display it as a tree diagram work on any device, including an iPad, as it does not rely on any server-side execution and runs entirely in the browser for visualization.

**Robot_Invasion**


# Version 4 
**refactored version of the code:**


### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON Tree Visualization</title>
    <style>
        .node {
            cursor: pointer;
        }

        .node circle {
            fill: #fff;
            stroke: steelblue;
            stroke-width: 3px;
        }

        .node text {
            font: 12px sans-serif;
        }

        .link {
            fill: none;
            stroke: #ccc;
            stroke-width: 2px;
        }
    </style>
</head>
<body>
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <script src="tree-visualization.js"></script>
</body>
</html>
```

### tree-visualization.js

```javascript
document.addEventListener('DOMContentLoaded', function() {
    var data = // Your JSON data here

    var margin = { top: 20, right: 90, bottom: 30, left: 90 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var root = d3.hierarchy(data, function(d) { return d.children; });

    var treeLayout = d3.tree().size([height, width]);
    root.x0 = height / 2;
    root.y0 = 0;

    update(root);

    function update(source) {
        var treeData = treeLayout(root);

        var nodes = treeData.descendants(),
            links = treeData.descendants().slice(1);

        nodes.forEach(function(d) { d.y = d.depth * 180 });

        var node = svg.selectAll('g.node')
            .data(nodes, function(d) { return d.id || (d.id = ++i); });

        var nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", function(d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on('click', click);

        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style("fill", function(d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeEnter.append('text')
            .attr("dy", ".35em")
            .attr("x", function(d) {
                return d.children || d._children ? -13 : 13;
            })
            .attr("text-anchor", function(d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function(d) { return d.data.name; });

        var nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeUpdate.select('circle.node')
            .attr('r', 10)
            .style("fill", function(d) {
                return d._children ? "lightsteelblue" : "#fff";
            })
            .attr('cursor', 'pointer');

        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        nodeExit.select('circle')
            .attr('r', 1e-6);

        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        var link = svg.selectAll('path.link')
            .data(links, function(d) { return d.id; });

        var linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', function(d) {
                var o = { x: source.x0, y: source.y0 }
                return diagonal(o, o)
            });

        var linkUpdate = linkEnter.merge(link);

        linkUpdate.transition()
            .duration(duration)
            .attr('d', function(d) { return diagonal(d, d.parent) });

        var linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', function(d) {
                var o = { x: source.x, y: source.y }
                return diagonal(o, o)
            })
            .remove();

        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

        function diagonal(s, d) {
            var path = `M ${s.y} ${s.x}
                        C ${(s.y + d.y) / 2} ${s.x},
                          ${(s.y + d.y) / 2} ${d.x},
                          ${d.y} ${d.x}`
            return path;
        }

        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }
    }
});
```

### How to Run

1. **Set up the environment:**
   - Create the folder structure as shown above.
   - Place your markdown file named `your_markdown_file.md` in the same directory as the scripts.

2. **Install the required library:**
   ```sh
   pip install -r requirements.txt
   ```

3. **Run the Python script:**
   ```sh
   python parse_markdown.py
   ```

4. **Open the `index.html` file in a web browser:**
   - This will visualize the JSON tree generated from the markdown file.

# Version 5


**Visualization responsive and add touch support for devices like iPads and Surface.**

```
project/
│
├── required.txt
├── parse_markdown.py
├── toc.json
└── index.html
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON Tree Visualization</title>
    <style>
        .node {
            cursor: pointer;
        }

        .node circle {
            fill: #fff;
            stroke: steelblue;
            stroke-width: 3px;
        }

        .node text {
            font: 12px sans-serif;
        }

        .link {
            fill: none;
            stroke: #ccc;
            stroke-width: 2px;
        }
    </style>
</head>
<body>
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <script src="tree-visualization.js"></script>
</body>
</html>
```

### tree-visualization.js

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const data = // Your JSON data here

    const margin = { top: 20, right: 90, bottom: 30, left: 90 },
          width = window.innerWidth - margin.left - margin.right,
          height = window.innerHeight - margin.top - margin.bottom;

    const svg = d3.select("body").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .call(d3.zoom().on("zoom", () => {
            svg.attr("transform", d3.event.transform)
        }))
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const root = d3.hierarchy(data, d => d.children);
    const treeLayout = d3.tree().size([height, width]);

    root.x0 = height / 2;
    root.y0 = 0;

    update(root);

    function update(source) {
        const treeData = treeLayout(root);
        const nodes = treeData.descendants();
        const links = treeData.descendants().slice(1);

        nodes.forEach(d => { d.y = d.depth * 180 });

        const node = svg.selectAll('g.node')
            .data(nodes, d => d.id || (d.id = ++i));

        const nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", () => `translate(${source.y0},${source.x0})`)
            .on('click', click);

        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style("fill", d => d._children ? "lightsteelblue" : "#fff");

        nodeEnter.append('text')
            .attr("dy", ".35em")
            .attr("x", d => d.children || d._children ? -13 : 13)
            .attr("text-anchor", d => d.children || d._children ? "end" : "start")
            .text(d => d.data.name);

        const nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
            .duration(duration)
            .attr("transform", d => `translate(${d.y},${d.x})`);

        nodeUpdate.select('circle.node')
            .attr('r', 10)
            .style("fill", d => d._children ? "lightsteelblue" : "#fff")
            .attr('cursor', 'pointer');

        const nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .remove();

        nodeExit.select('circle')
            .attr('r', 1e-6);

        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        const link = svg.selectAll('path.link')
            .data(links, d => d.id);

        const linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', d => {
                const o = { x: source.x0, y: source.y0 }
                return diagonal(o, o)
            });

        const linkUpdate = linkEnter.merge(link);

        linkUpdate.transition()
            .duration(duration)
            .attr('d', d => diagonal(d, d.parent));

        const linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', d => {
                const o = { x: source.x, y: source.y }
                return diagonal(o, o)
            })
            .remove();

        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });

        function diagonal(s, d) {
            return `M ${s.y} ${s.x}
                    C ${(s.y + d.y) / 2} ${s.x},
                      ${(s.y + d.y) / 2} ${d.x},
                      ${d.y} ${d.x}`;
        }

        function click(d) {
            d.children = d.children ? null : d._children;
            update(d);
        }
    }
});
```

### How to Run

1. **Set up the environment:**
   - Create the folder structure as shown above.
   - Place your markdown file named `your_markdown_file.md` in the same directory as the scripts.

2. **Install the required library:**
   ```sh
   pip install -r requirements.txt
   ```

3. **Run the Python script:**
   ```sh
   python parse_markdown.py
   ```

4. **Open the `index.html` file in a web browser:**
   - This will visualize the JSON tree generated from the markdown file.

END
![90A0F5F4-EB58-4A5C-A798-A28B4547D372](7R9Sl9QSA-90A0F5F4-EB58-4A5C-A798-A28B4547D372.jpg)



