'use strict';

angular
    .module('main.remotes')
    .component('remotes', {
        templateUrl: 'main/remotes/remotes.html',
        css: 'main/remotes/remotes.css',
        controller: function RemotesController(RemotesService) {
            var progBar = $('#ddProgress')[0];
            function extractError(error){
                console.error(error);
                if (typeof error === 'string')
                    return error;
                if (error.data && error.data.msg)
                    return error.data.msg;
                if (error.message || error.msg || error.reason)
                    return error.message || error.msg || error.reason;
                if (error.statusText)
                    return error.statusText;
                return 'Unknown error';
            }
            function putProg(prog,err){
                if (prog){
                    var p = prog.bytesTotal!=0?~~(prog.bytesReceived*100/prog.bytesTotal):100;
                    console.log(`${p}%`);
                    progBar.style.opacity='1';
                    progBar.value=p;
                    progBar.innerHTML=`${p}%`;
                } else {
                    progBar.style.opacity='0.25';
                    progBar.value=0;
                    progBar.innerHTML='';
                    if (err) {
                        var merr = extractError(err);
                        console.error(err);
                        alert(`Error during download occured ${merr}`);
                    }
                }
            }

            this.goto = node => {
                this.loading = true;
                this.node = node;
                if (node.type === 'FILE'){
                    var finp = document.createElement('input');
                    finp.type='file';
                    finp.setAttribute('nwsaveas',node.name);
                    finp.onchange = (ev) => {
                        node.download(ev.target.value).then(
                            response => {
                                response.onprogress=(prog) => putProg(response);
                                response.onend=() => putProg(null,null);
                                response.onerror=(err) => putProg(null,err);
                            }, error => this.error = extractError(error)
                        ).finally(()=>this.loading=false);
                    }
                    finp.click();
                } else {
                    this.breadcrumbs = node.ancestors();
                    this.breadcrumbs.push(node);
                    node.children().then(
                        response => {
                            console.log(response);
                            delete this.error;
                            this.nodes = response;
                        },
                        error => {
                            this.nodes = [];
                            this.error = error;
                        }
                    ).finally(() => this.loading = false);
                }
            }

            RemotesService.getRoot()
                .then(
                    response => this.goto(response),
                    error => this.error = error
                );
        }
    });
