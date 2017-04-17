#!/bin/sh

# This script builds the SCSS, Typescript, and other static files from source. It should be non-destructive and
# idempotent.

clear

echo "Cutcash build started..."

echo "  Building stylesheets..."

if  [ ! -d static/css/bin ]
then
    mkdir -p static/css/bin
fi
sass src/scss/bulma.scss static/css/bin/bulma.css
sass src/scss/cutcash.scss static/css/bin/cutcash.css

echo "  Building scripts..."

if  [ ! -d static/js/bin ]
then
    mkdir -p static/js/bin
fi
tsc

echo "-----------------------------------------------------------------------------------"
echo "Build complete - run 'python3 cut-cash.py' to start the server."
echo "-----------------------------------------------------------------------------------"
