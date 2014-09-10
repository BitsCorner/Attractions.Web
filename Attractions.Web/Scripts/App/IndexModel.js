/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/knockout/knockout.d.ts" />
/// <reference path="../lib/typings/knockout.mapping/knockout.mapping.d.ts" />
var App;

var IndexModel = (function () {
    function IndexModel() {
    }
    //IndexModel.prototype.DataLoaded = function () {
        //this.Data.LicensingTermsAcceptance.IsValid = ko.computed(function () {
        //    var licensingTermsAcceptance = this;
        //    if (!licensingTermsAcceptance.FullName())
        //        return false;
        //    if (!licensingTermsAcceptance.TCDocId())
        //        return false;
        //    return true;
        //}, this.Data.LicensingTermsAcceptance);

    //    this.Data.LicensingTermsAcceptance.IsTCDocValid = ko.computed(function () {
    //        //var licensingTermsAcceptance = this;
    //        var viewModel = portalViewModel.PageData;
    //        if (!viewModel.Data.OpenLicenseType())
    //            return false;
    //        if (!viewModel.Data.CountryCode())
    //            return false;
    //        if (!viewModel.Data.SelectedTCDocId())
    //            return false;

    //        return true;
    //    }, this.Data.LicensingTermsAcceptance);
    //};

    IndexModel.prototype.placeChange = function (data, event) {
        alert('text change');
    };

    return IndexModel;
})();

portalViewModel.PageData = new IndexModel();
