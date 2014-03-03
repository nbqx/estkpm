var fs = require('fs');
var colors = require('colors'),
    async = require('async'),
    _ = require('underscore'),
    request = require('request');

function estkpm(conf,out,done){
  if(_.isUndefined(conf) || !fs.existsSync(conf)){
    console.log('package.jsx not found');
    return false
  }
  
  var build = (_.isUndefined(out))? [process.cwd(),'build.jsx'].join('/') : out;
  var js = eval('('+fs.readFileSync(conf)+')');
  var entry = _.pairs(js);

  async.reduce(entry,[],function(m,o,next){
    var f = o[0],
        url = o[1];
    
    request.get(url,function(err,res,body){
      if(err || res.statusCode!==200){
        if(err){
          return next(err,null);
        }else{
          console.log('Error: '.red+'status code `'+res.statusCode+'` at '+url);
        }
        
      }else{
        console.log('Get: '.green+url+(' ('+res.statusCode+')').green);
        m.push(body);
        next(null,m);
      }
    });
  }, function(err,res){
    if(err){
      console.log(('Error: '+err).red);
    }
    if(!_.isNull(res)){
      var ws = fs.createWriteStream(build);
      ws.end(res.join("\n"));
      if(!_.isUndefined(done)){
        done();
      }
    }
  });
};

module.exports = estkpm;
