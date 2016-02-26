@echo off
title Colloctions Server [Running ...]
cd
cls

@browser-sync start --server --files="*.css, *.html, *.js" --port=9981
