#!/bin/bash

echo "Install developer libraries?"
echo "  WARNING: this will remove the following directories:"
echo "    node_modules"
echo "    bin"
echo "  It will then install the taffydb node libraries"
echo "    and create symbolic links in the bin directory"
echo "    to the utilities used for taffydb development."
echo
echo "  If you do not want this, press CTRL+C NOW!"
echo "  Otherwise, press return."
echo

read LINE;

echo "Removing directories ..."
  rm -rf node_modules bin;

echo "Installing taffydb developer dependencies..."
  node -e '
  var devMap=require("./package.json").devDependencies;
  Object.keys(devMap).map(
    function(key){ console.log( key + "@" + devMap[ key ] ) }
  );' | xargs npm install;

echo "Creating symbolic links ..."
  mkdir bin;
  cd bin
  ln -s ../node_modules/jslint/bin/jslint.js jslint;
  ln -s ../node_modules/nodeunit/bin/nodeunit nodeunit;
  ln -s ../node_modules/uglifyjs/bin/uglifyjs uglifyjs;
  cd ../

echo
echo "Done.  Installed utilities are below:"
  ls -1 bin;
echo
echo "Happy taffydb development!"
echo

exit 0;
