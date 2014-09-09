/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="localstoragehelper.ts" />
/// <reference path="../lib/typings/knockout/knockout.d.ts" />
var App;

// ReqMAN.JS
var reqMan;

var OrderStatusType;
(function (OrderStatusType) {
    OrderStatusType[OrderStatusType["NotActive"] = 0] = "NotActive";
    OrderStatusType[OrderStatusType["InProgress"] = 1] = "InProgress";
    OrderStatusType[OrderStatusType["Activeted"] = 2] = "Activeted";
    OrderStatusType[OrderStatusType["Failed"] = 3] = "Failed";
})(OrderStatusType || (OrderStatusType = {}));

var ActivationViewModel = (function () {
    function ActivationViewModel() {
        this.OrderCSSStatus = ko.computed(function () {
            return "OrderNotActive";
        }, this);
        this.giftWrap = ko.observable(false);
    }
    ActivationViewModel.prototype.expanderKeyPressed = function (data, event) {
        if (event.charCode == 13)
            $(event.currentTarget).click();
    };

    ActivationViewModel.prototype.manageServiceClicked = function (data, event) {
        window.location.href = ActionsURL.ManageServiceUrl + "?url=" + encodeURIComponent(data.LinkUrl());
        event.stopPropagation();
    };

    ActivationViewModel.prototype.activateServiceClicked = function (data, event) {
        window.location.href = ActionsURL.ActivateServiceUrl + "?url=" + encodeURIComponent(data.LineItemUrl());
        event.stopPropagation();
    };

    ActivationViewModel.prototype.LicensingServiceCenter = function () {
        return ActionsURL.LicensingServiceCenterUrl;
    };

    ActivationViewModel.prototype.AddNewAdminAccount = function () {
        return ActionsURL.AddUserUrl;
    };

    ActivationViewModel.prototype.FlipVisible = function (item) {
        var currentValue = item.IsSectionVisible();
        item.IsSectionVisible(!currentValue);
    };

    ActivationViewModel.prototype.DataLoaded = function () {
        this.UpdateSubscriptionStatus();

        //Manage Service Link Visibility
        ko.utils.arrayForEach(this.Data(), function (item) {
            item.IsServiceActivated = ko.computed(function () {
                var subscriptions = this;
                var isActuve = false;
                ko.utils.arrayForEach(subscriptions(), function (item) {
                    if (item.OrderStatus() == 2 /* Activeted */) {
                        isActuve = true;
                    }
                });
                return isActuve;
            }, item.Subscriptions);
        });

        //Subscription Section Visibility (flip UP/Down)
        ko.utils.arrayForEach(this.Data(), function (item) {
            item.IsSectionVisible = ko.observable(true);
        });
        //$(".inlineBlock").attr("titel", function(i, val){
        //    return val + " -Behrooz";
        //});
    };

    ActivationViewModel.prototype.UpdateSubscriptionStatus = function () {
        ko.utils.arrayForEach(this.Data(), function (subsModel) {
            ko.utils.arrayForEach(subsModel.Subscriptions(), function (item) {
                if (item.OrderStatus() == 0 /* NotActive */) {
                    if (LocalStorageHelper.Get(item.SubscriptionId()) != null) {
                        item.OrderStatus(1 /* InProgress */);
                    }
                } else {
                    LocalStorageHelper.Del(item.SubscriptionId());
                }
            });
        });
    };

    ActivationViewModel.prototype.ManageServiceClicked = function (item) {
        var theUrl = item.LinkUrl();

        //alert("The Url is: " + theUrl);
        window.location = theUrl;
    };

    ActivationViewModel.prototype.SendActivateServiceReq = function (item) {
        var subscriptionId = item.SubscriptionId;
        var theUrl = ActionsURL.RegistrationActivationActivateOrderUrl + "?SubscriptionId=" + subscriptionId;

        $.ajax({
            url: theUrl,
            type: "GET",
            data: null,
            success: function (e) {
                var ret = e;
                item.OrderStatus(1 /* InProgress */);
                LocalStorageHelper.Set(item.SubscriptionId(), "InProgress");
            }
        });
        //TODO: Te ReqMan is not working, mak it to work
        //Ajax call (RequestManager call)
        //reqMan.Exec({
        //    destUrl: theUrl,
        //    objData: null,
        //    spinnerParams: { immediate: true },
        //    returnType: "json",
        //    method: 'GET'
        //})
        //    .done(function (e) {
        //       var ret = e;
        //    });
    };
    return ActivationViewModel;
})();

portalViewModel.PageData = new ActivationViewModel();
