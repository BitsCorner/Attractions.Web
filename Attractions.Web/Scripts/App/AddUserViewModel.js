/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/knockout/knockout.d.ts" />
/// <reference path="../lib/typings/knockout.mapping/knockout.mapping.d.ts" />
var App;

var AddUserViewModel = (function () {
    function AddUserViewModel() {
    }
    AddUserViewModel.prototype.DataLoaded = function () {
        $('#FirstName').on('blur', function () {
            setTimeout(function () {
                if (!$("#FirstName").is(":focus") && !$("#LastName").is(":focus")) {
                    var suggestionsBox = $(".AutoCompleteResults")[0];
                    $(suggestionsBox).slideUp(100);
                }
            }, 300);
        });

        $('#LastName').on('blur', function () {
            setTimeout(function () {
                if (!$("#FirstName").is(":focus") && !$("#LastName").is(":focus")) {
                    var suggestionsBox = $(".AutoCompleteResults")[0];
                    $(suggestionsBox).slideUp(100);
                }
            }, 300);
        });

        this.Data.UserProfile.CountryName = ko.observable();
        this.Data.UserProfile.LanguageName = ko.observable();
        this.Data.UserProfile.IsExistingUser = ko.observable(false);
        this.Data.UserProfile.UseSameEmails = ko.observable(false);

        var viewModel = portalViewModel.PageData;
        viewModel.Data.FilteredExistingUsers = ko.computed(function () {
            var lastNamefilter = (viewModel.Data.UserProfile.LastName() == null ? "" : viewModel.Data.UserProfile.LastName());
            var firstNamefilter = (viewModel.Data.UserProfile.FirstName() == null ? "" : viewModel.Data.UserProfile.FirstName());
            var userIdfilter = (viewModel.Data.UserProfile.UserId() == null ? "" : viewModel.Data.UserProfile.UserId());
            if (lastNamefilter == "" && firstNamefilter == "" && userIdfilter == "") {
                return viewModel.Data.ExistingUsers();
            } else {
                var filteredList = ko.utils.arrayFilter(JSON.parse(ko.toJSON(viewModel.Data.ExistingUsers)), function (item) {
                    return item.LastName.toLowerCase().indexOf(lastNamefilter.toLowerCase()) !== -1 && item.FirstName.toLowerCase().indexOf(firstNamefilter.toLowerCase()) !== -1 && item.UserId.toLowerCase().indexOf(userIdfilter.toLowerCase()) !== -1;
                });
                return filteredList;
            }
        }, this.Data.FilteredExistingUsers);

        //Checks all the required fields to enable the submit button.
        this.Data.UserProfile.IsValid = ko.computed(function () {
            var userProfile = this;
            if (!userProfile.FirstName())
                return false;
            if (!userProfile.LastName())
                return false;
            if (!userProfile.CountryCode())
                return false;
            if (!userProfile.LanguageCode())
                return false;
            if (!userProfile.EmailAddress())
                return false;
            if (!userProfile.UserId())
                return false;
            return true;
        }, this.Data.UserProfile);
    };

    AddUserViewModel.prototype.addUserClicked = function () {
        var addUserModel = ko.mapping.toJS(portalViewModel.PageData.Data);
        ko.utils.postJson(ActionsURL.AddUserUrl, { addUserModel: addUserModel }, null);
    };

    AddUserViewModel.prototype.updateUserClicked = function () {
        var addUserModel = ko.mapping.toJS(portalViewModel.PageData.Data);
        ko.utils.postJson(ActionsURL.UpdateUserUrl, { addUserModel: addUserModel }, null);
    };

    AddUserViewModel.prototype.cancelAddUserClicked = function () {
        window.location = ActionsURL.ActivationIndexUrl;
    };

    AddUserViewModel.prototype.clearResultsClicked = function () {
        window.location = ActionsURL.AddUserUrl;
    };

    AddUserViewModel.prototype.clearClicked = function () {
        var viewModel = portalViewModel.PageData;
        viewModel.Data.UserProfile.FirstName("");
        viewModel.Data.UserProfile.LastName("");
        viewModel.Data.UserProfile.EmailAddress("");
        viewModel.Data.UserProfile.PassworRecipientEmailAddress("");
        viewModel.Data.UserProfile.SubDomain("");
        viewModel.Data.UserProfile.BaseDomain("");
        viewModel.Data.UserProfile.CountryCode("");
        viewModel.Data.UserProfile.LanguageCode("");
        viewModel.Data.UserProfile.UserId("");
        viewModel.Data.UserProfile.IsExistingUser(false);
    };

    AddUserViewModel.prototype.nameChange = function (data, event) {
        var textbox = event.target;
        var suggestionsBox = $(".AutoCompleteResults")[0];
        var AddUserSearchThreshold = portalViewModel.PageData.Data.AddUserSearchThreshold();
        if ($(textbox).val().length >= AddUserSearchThreshold && portalViewModel.PageData.Data.FilteredExistingUsers().length > 0) {
            textbox.offsetParent.appendChild(suggestionsBox);
            suggestionsBox.style.top = textbox.offsetTop + textbox.offsetHeight + 'px';
            suggestionsBox.style.display = 'block';
            suggestionsBox.style.left = textbox.offsetLeft + 'px';
            if (!$(suggestionsBox).is(":visible"))
                $(suggestionsBox).slideDown(100);
        } else if ($(suggestionsBox).is(":visible"))
            $(suggestionsBox).hide();
    };

    AddUserViewModel.prototype.countryChange = function (data, event) {
        var viewModel = portalViewModel.PageData;
        var match = ko.utils.arrayFirst(viewModel.Data.Countries(), function (country) {
            return country.Code() === data.CountryCode();
        });
        if (match != null)
            viewModel.Data.Languages(match.SupportedLanguage());
        else
            viewModel.Data.Languages(null);
    };

    AddUserViewModel.prototype.autocompleteItemClicked = function (data, event) {
        var viewModel = portalViewModel.PageData;
        viewModel.Data.UserProfile.FirstName(data.FirstName);
        viewModel.Data.UserProfile.LastName(data.LastName);
        viewModel.Data.UserProfile.EmailAddress(data.EmailAddress);
        viewModel.Data.UserProfile.PassworRecipientEmailAddress(data.PassworRecipientEmailAddress);
        viewModel.Data.UserProfile.SubDomain(data.SubDomain);
        viewModel.Data.UserProfile.BaseDomain(data.BaseDomain);
        viewModel.Data.UserProfile.CountryCode(data.CountryCode);
        viewModel.Data.UserProfile.LanguageCode(data.LanguageCode);
        viewModel.Data.UserProfile.UserId(data.UserId);
        viewModel.Data.UserProfile.LanguageName($("#LanguageCode option:selected").text());
        viewModel.Data.UserProfile.CountryName($("#CountryCode option:selected").text());
        viewModel.Data.UserProfile.IsExistingUser(true);

        for (var i = 0; i < data.UserRoles.length; i++) {
            ko.utils.arrayForEach(viewModel.Data.TenantAgreements(), function (existingAgreement) {
                if (data.UserRoles[i].LicensingId == existingAgreement.LicensingId() && data.UserRoles[i].AuthorizationNumber == existingAgreement.AuthorizationNumber()) {
                    existingAgreement.HasAccess(true);
                }
            });
        }

        var suggestionsBox = $(".AutoCompleteResults")[0];
        $(suggestionsBox).slideUp(100);
    };

    AddUserViewModel.prototype.emailaddressChange = function () {
        if ($('#SameAsContact').is(':checked')) {
            var viewModel = portalViewModel.PageData;
            viewModel.Data.UserProfile.PassworRecipientEmailAddress(viewModel.Data.UserProfile.EmailAddress());
        }
    };
    return AddUserViewModel;
})();

portalViewModel.PageData = new AddUserViewModel();
