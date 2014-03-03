#!/usr/bin/env node
var fs = require('fs');
var argv = require('yargs').argv;
var estkpm = require('./index');

var conf = [process.cwd(),'package.jsx'].join('/');
var out = [process.cwd(),'build.jsx'].join('/');

if(argv.c || argv.config){
  conf = argv.c || argv.config;
}

if(argv.o || argv.out){
  out = argv.o || argv.out;
}

if(argv.h || argv.help){
  return fs.createReadStream(__dirname+'/usage.txt').pipe(process.stdout);
}

estkpm(conf,out,function(){
  console.log('creating `'+out+'` done.');
});
