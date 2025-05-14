#!/bin/bash

echo "Build script"
cd ../frontend && npm install
cd ../backend && npm install && npm run build:ui