'use strict';

angular
    .module('options')
    .component('options', {
        templateUrl: 'options/options.html',
        css: 'options/options.css',
        controller: function OptionsController($scope, $timeout, $location, $http) {
            alert('ye');

            var self = this,
                errHandler = function(response){
                    alert('error');
                    console.error(response);
                };
            ['devices','groups','shares'].forEach((dat) => {
                $http.get(`${global.cfg.server}/api/${dat}`)
                    .then(function(response){
                        self[dat]=response.data[dat];
                        console.log(dat,self[dat]);
                    }, errHandler);
            });

            this.currentDev=localStorage['dev']||"Unknown. Please bind device from list";

            this.addGroup = (name) => {
                $http.post(`${global.cfg.server}/api/groups/${name}`,{
                    
                }).then(function(response){
                    self.groups.push({
                        name:name,
                        members:[]
                    });
                }, errHandler);
            }
            this.delGroup = (name) => {
                $http.delete(`${global.cfg.server}/api/groups/${name}`)
                .then(function(response){
                    self.groups=self.groups.filter(g => g.name!=name);
                }, errHandler);
            }

            this.addGroupShare = (share, group) => {
                $http.post(`${global.cfg.server}/api/groups/${name}/shares/${share}`,{

                }).then(function(response){
                    self.groups.filter(g => g.name==group)[0].shares.push({
                        name:share
                    });
                }, errHandler);
            }
            this.delGroupShare = (share, group) => {
                $http.delete(`${global.cfg.server}/api/groups/${name}/shares/${share}`)
                .then(function(response){
                    var g = self.groups.filter(g => g.name==group)[0];
                    g.shares = g.shares.filter(s => s.name!=share);
                }, errHandler);
            }

            this.addMember = (email, group) => {
                $http.post(`${global.cfg.server}/api/groups/${group}/members/${email}`,{
                    
                }).then(function(response){
                    self.groups.filter(g => g.name==group)[0].members.push({
                        email:email,
                        name:email.replace(/@.*/,'')
                    });
                }, errHandler);
            }
            this.delMember = (email, group) => {
                $http.delete(`${global.cfg.server}/api/groups/${group}/members/${email}`)
                .then(function(response){
                    var g = self.groups.filter(g => g.name==group)[0]
                    g.members=g.members.filter(m => m.email!=email);
                }, errHandler);
            }

            this.addDevice = (name, addr) => {
                $http.post(`${global.cfg.server}/api/devices/${name}`,{
                    address:addr
                }).then(function(response){
                    self.devices.push({
                        name:name,
                        address:addr
                    });
                }, errHandler);
            }
            this.delDevice = (name) => {
                $http.delete(`${global.cfg.server}/api/devices/${name}`)
                .then(function(response){
                    self.devices=self.devices.filter(d => d.name!=name);
                }, errHandler);
            }

            this.addShare = (name, device) => {
                $http.post(`${global.cfg.server}/api/shares/${name}`,{
                    device:device
                }).then(function(response){
                    self.shares.push({
                        name:name,
                        device:device,
                        paths:[]
                    });
                }, errHandler);
            }
            this.delShare = (name) => {
                $http.delete(`${global.cfg.server}/api/shares/${name}`)
                .then(function(response){
                    self.shares=self.shares.filter(s => s.name!=name);
                }, errHandler);
            }
            this.addPath = (name,path,share) => {
                $http.post(`${global.cfg.server}/api/shares/${share}/paths/${name}`,{
                    path:path
                }).then(function(response){
                    self.shares.filter(s => s.name==share)[0].push({
                        name:name,
                        path:path
                    });
                }, errHandler);
            }
            this.delPath = (name, share) => {
                $http.delete(`${global.cfg.server}/api/shares/${share}/paths/${name}`)
                .then(function(response){
                    var s = self.shares.filter(s => s.name==share)[0];
                    s.paths=s.paths.filter(p => p!=name);
                }, errHandler);
            }
        }
    });
