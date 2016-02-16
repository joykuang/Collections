@echo off
cd
title Build styling
cls

:: build copyright
php src\php\copyright.php >src\copyright.less
php src\php\copyright.php >src\copyright.sass

if not exist .\dist ( md dist )

lessc src\main.less dist\style.css && lessc --clean-css="advanced" dist\style.css dist\style.min.css
