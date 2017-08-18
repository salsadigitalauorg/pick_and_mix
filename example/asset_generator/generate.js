/**
 * Generate Icons for Pick and Mix.
 */
fs = require('fs');
var swig  = require('swig');
var path = require('path');

// Get theme file
var theme_name = process.argv.splice(2);
var output_dir = path.normalize('../src/images/svg/optimise');

function generate(template, filename, colour) {
  var template = swig.compileFile('templates' + path.sep + template);
  var template_output = template({
    colour: colour
  });
  fs.writeFile(output_dir + path.sep + filename, template_output, function(err) {
    if (err) {
      throw err;
    }
  });
}

if (theme_name !== undefined) {
  // Get theme variables.
  console.log("Generating: " + theme_name);
  var sprites = JSON.parse(fs.readFileSync('.' + path.sep + theme_name, 'utf8'));

  // Create output folder.
  if (!fs.existsSync(output_dir)) {
    fs.mkdirSync(output_dir);
  }

  // Generate SVGs.
  for (var i = 0; i < sprites.length; i++) {
    var options = sprites[i];
    generate(options.template, options.default, options.colour_default);
    if (options.colour_secondary !== null) {
      generate(options.template, options.secondary, options.colour_secondary);
    }
  }
  console.log("Icons Generated to " + output_dir);
}
else {
  console.log("Missing theme filename argument: Try \"node generate.json theme.json\"");
}
