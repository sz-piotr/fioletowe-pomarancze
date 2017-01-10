'use strict';

angular
    .module('phoneDetail')
    .component('phoneDetail', {
        templateUrl: 'phone-detail/phone-detail.template.html',
        controller: function PhoneDetailController($routeParams, Phone) {

            this.setImage = imageUrl => {
                this.mainImageUrl = imageUrl
            };

            this.phone = Phone.get({
                phoneId: $routeParams.phoneId
            }, phone => this.setImage(phone.images[0]));
        }
    });
