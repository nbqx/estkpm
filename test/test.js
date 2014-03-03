var fs = require('fs'),
    fakestk = require('fakestk'),
    should = require('should');

var estkpm = require(__dirname+'/../index');

describe('estkpm test',function(){
  var out = [__dirname,'build.jsx'].join('/');
  var script = [
    '#target indesign-7.0',
    '#include "'+__dirname+'/build.jsx"',
    'alert(_);',
    'alert(moment)'
  ].join("\n");
  
  it('should execute extendscript with `build.jsx`',function(done){
    var conf = [__dirname,'fixtures','package.jsx'].join('/');
    
    estkpm(conf,out,function(){
      fakestk.run(script,function(err,res){
        done();
      });
    });
  });

  after(function(done){
    fs.unlink(out,function(){
      done();
    });                      
  });
});
