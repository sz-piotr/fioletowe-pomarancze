'use strict'

var FileServer = (function(){
    var fs = require('fs'),
        http = require('http'),
        args = require('minimist')(require('nw.gui').App.argv, {
            number:['port'],
            string:['addr'],
            alias:{
                port:['p'],
                addr:['a']
            },
            default:{
                port:8111,
                addr:'0.0.0.0'
            }
        });

    return class FileServer {
        constructor(){
            this.shares=[];

            this.srv = http.createServer(this.reqHandler.bind(this));
        }

        reqHandler(req,res){
            req.url=req.url.replace(/\?.*$/,'');
            req.url=unescape(req.url);
            
            console.log('Request',req.url);
            var fpath = rules.root+'/'+req.url;

            if (fs.existsSync(fpath)){
                fpath=fs.realpathSync(fpath);
                if (fpath.indexOf(rules.root)==0)
                    fs.createReadStream(fpath).pipe(res);
                else {
                    console.log(403,fpath);
                    res.statusCode=404;
                    res.end();
                }
            } else {
                console.log('404',fpath);
                res.statusCode=404;
                res.end();
            }
        }

        run(){
            this.srv.listen(args.port,args.addr);
            console.log('Server started on addr: ',args.addr,' on port: ',args.port);
        }

        registerPath(share,path){
            if (!fs.existsSync(path)) throw "Invalid path";

            var share = this.shares.filter(s => s==share);
            if (share.length==0) this.shares.push(share={name:share,paths:[]});

            share.paths.push(fs.realpathSync(path));
        }
    }
})();

global.fileServer = new FileServer();
global.fileServer.run();