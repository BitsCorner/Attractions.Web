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
        $.ajax({
            url: "/Home/AutocompleteLocations?location=coquitlam", //App.Action("Home", "AutocompleteLocations"), //ActionsURL.AutocompleteLocationsUrl + "?location=coquitlam",
            success: function (data) {
                alert(data);
            }
        });
    };

    return IndexModel;
})();

portalViewModel.PageData = new IndexModel();
