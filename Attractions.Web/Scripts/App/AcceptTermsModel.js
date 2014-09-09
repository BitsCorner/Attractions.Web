/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/knockout/knockout.d.ts" />
/// <reference path="../lib/typings/knockout.mapping/knockout.mapping.d.ts" />
var App;

var AcceptTermsModel = (function () {
    function AcceptTermsModel() {
    }
    AcceptTermsModel.prototype.DataLoaded = function () {
        this.Data.LicensingTermsAcceptance.IsValid = ko.computed(function () {
            var licensingTermsAcceptance = this;
            if (!licensingTermsAcceptance.FullName())
                return false;
            if (!licensingTermsAcceptance.TCDocId())
                return false;
            return true;
        }, this.Data.LicensingTermsAcceptance);

        this.Data.LicensingTermsAcceptance.IsTCDocValid = ko.computed(function () {
            //var licensingTermsAcceptance = this;
            var viewModel = portalViewModel.PageData;
            if (!viewModel.Data.OpenLicenseType())
                return false;
            if (!viewModel.Data.CountryCode())
                return false;
            if (!viewModel.Data.SelectedTCDocId())
                return false;

            return true;
        }, this.Data.LicensingTermsAcceptance);
    };

    AcceptTermsModel.prototype.openLicenseTypeChange = function (data, event) {
        var url = ActionsURL.GetLicensingAgreementInfoUrl;
        url += "?agreementType=" + data.Data.OpenLicenseType();

        //Ajax call (RequestManager call)
        reqMan.Exec({
            destUrl: url,
            returnType: "html",
            method: 'GET',
            stringify: false,
            spinnerParams: { immediate: true }
        }).done(function (result) {
            var viewModel = portalViewModel.PageData;
            viewModel.Data.LicensingTermsCountries(ko.utils.parseJson(result));
        });
    };

    AcceptTermsModel.prototype.countryChange = function (data, event) {
        var viewModel = portalViewModel.PageData;
        var match = ko.utils.arrayFirst(data.Data.LicensingTermsCountries(), function (country) {
            return country.CountryCode === data.Data.CountryCode();
        });
        if (match != null) {
            viewModel.Data.Languages(match.LicensingTermsFiles);
            if (match.LicensingTermsFiles.length == 1) {
                viewModel.Data.LicensingTermsAcceptance.TCDocId(match.LicensingTermsFiles[0].TcDocId);
                viewModel.Data.SelectedTCDocId(match.LicensingTermsFiles[0].TcDocId);
                $('#Language').prop('disabled', true);
                $('#TcCsDisplay').click();
            } else {
                $('#Language').prop('disabled', false);
            }
        } else
            viewModel.Data.Languages(null);
    };

    AcceptTermsModel.prototype.displayClicked = function (data, event) {
        if (data.Data.SelectedTCDocId() != null) {
            data.Data.LicensingTermsAcceptance.TCDocId(data.Data.SelectedTCDocId());
            var url = ActionsURL.GetLicensingTermsDocUrl;
            url += "?tcDocId=" + data.Data.SelectedTCDocId();
            reqMan.Exec({
                destUrl: url,
                returnType: "html",
                method: 'GET',
                stringify: false,
                spinnerParams: { immediate: true }
            }).done(function (result) {
                $("#TsCsContent").html(result);
                data.Data.LicensingTermsAcceptance.TCDocId();
            });
        }
    };
    return AcceptTermsModel;
})();

portalViewModel.PageData = new AcceptTermsModel();
