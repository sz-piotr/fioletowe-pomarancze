'use strict';

angular
    .module('main.shares')
    .component('shares', {
        templateUrl: 'main/shares/shares.html',
        css: 'main/shares/shares.css',
        controller: function SharesController(SharesService) {
            var nurl = require('url'),
                cap = s => ((s).toUpperCase().slice(0,1)+(s).slice(1)),
                fpinp = document.getElementById("thisPathInputIdWillNeverEverAppearAgainInThisWholeApp"),
                setDev = (dev,addr) => {
                    if (dev){
                        localStorage.port=nurl.parse(`http://${addr}`).port;
                        localStorage.device=dev;
                        this.currentDevice=dev;
                        global.fileServer.run(Number(localStorage.port)||null);
                    } else {
                        localStorage.removeItem('device');
                        localStorage.removeItem('port');
                        this.currentDevice=null;
                        global.fileServer.stop();
                    }
                }

            this.update = () => SharesService.query()
                .then(
                    response => {
                        this.devices = response;
                        this.shares = [];
                        this.devices.forEach(device => {
                            this.shares = this.shares.concat(device.shares);
                        });
                        if (this.devices.filter(d => d.name==localStorage.device).length==0){
                            setDev(null);
                        }
                    },
                    error => this.error = error
                );

            this.deleteDevice = device => {
                this.item = {
                    name: device.name,
                    type: 'device'
                }
                $('#delete-modal').modal('show');
            };

            this.deleteShare = share => {
                this.item = {
                    name: share.name,
                    type: 'share'
                }
                $('#delete-modal').modal('show');
            };

            this.deletePath = (path,share) => {
                this.item = {
                    name: path.name,
                    share: share,
                    type: 'path'
                }
                $('#delete-modal').modal('show');
            };

            this.srvDelete = () => {
                SharesService['delete'+cap(this.item.type)](this.item.name,this.item.share)
                    .then(res => {
                        $(`#delete-modal`).modal('hide');
                        this.update();
                    }, error => this.error = error); 
            };

            this.srvAdd = (type) => {
                var k = type=='device'?([this.device.name,this.device.address]):
                        type=='share'?([this.share.name,this.share.device.name]):
                        type=='path'?([this.path.name,this.path.share.name,fpinp.value]):
                        (()=>{throw "undefined behavior"})();

                console.log('add'+cap(type));
                SharesService['add'+cap(type)](...k)
                    .then(res => {
                        $(`#add-${type}-modal`).modal('hide');
                        this.update();
                    }, error => this.error = error);
            };

            this.swapDevice = () => {
                var cd;
                if (this.currentDevice && (cd=this.devices.filter(d => d.name==this.currentDevice)).length!=0)
                    setDev(this.currentDevice,cd[0].address);
            }

            if (localStorage.device) this.currentDevice=localStorage.device;
            else this.currentDevice=null;

            this.update();
        }
    });
