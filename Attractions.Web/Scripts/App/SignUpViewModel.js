/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/knockout/knockout.d.ts" />
/// <reference path="../lib/typings/jqueryui/jqueryui.d.ts" />
/// <reference path="PortalViewModel.ts" />
var SignUpRegistaration = window.$Controller || {};

//ReqMan.js
var reqMan;

var SignUpViewModel = (function () {
    function SignUpViewModel() {
    }
    SignUpViewModel.prototype.submitClicked = function () {
        var element = $('#dialog');
        element.dialog({ modal: true, autoOpen: false, closeOnEscape: true, draggable: false, resizable: false, height: 200, width: 460 });
        element.dialog('open');
        $('a.ui-dialog-titlebar-close').hide();
        $('div.ui-dialog-titlebar').hide();

        var signUpModel = ko.mapping.toJS(portalViewModel.PageData.Data);
        ko.utils.postJson(ActionsURL.RegisterUrl, { signUpModel: signUpModel }, null);
    };
    SignUpViewModel.prototype.CheckAvailability = function (userProfile) {
        if (userProfile.SubDomain()) {
            var domainReg = /^[a-zA-Z0-9]+$/;
            if (!domainReg.test(userProfile.SubDomain())) {
                userProfile.IsDomainAvailable('invalid');
                return;
            }

            //var spinnerObj = { parent: $('#domainCheckSpinnerParent'), className: "spinnerContain" }
            var url = ActionsURL.IsDomainAvailableUrl;
            url += "?domainName=" + userProfile.SubDomain() + userProfile.BaseDomain();
            reqMan.Exec({
                destUrl: url,
                returnType: "html",
                method: 'GET',
                stringify: false,
                spinnerParams: { immediate: true }
            }).done(function (result) {
                userProfile.IsDomainAvailable(result.toLowerCase());
            });
        } else {
            userProfile.IsDomainAvailable("_blank");
        }
    };

    SignUpViewModel.prototype.DataLoaded = function () {
        this.Data.UserProfile.IsDomainAvailable = ko.observable("_blank");

        //Concatenates Base and Sub Domain to display in a label
        this.Data.UserProfile.FullDomain = ko.computed(function () {
            var result = '';
            var viewModel = portalViewModel.PageData;
            if (viewModel.Data.UserProfile.SubDomain() != null)
                result += viewModel.Data.UserProfile.SubDomain();
            result += viewModel.Data.UserProfile.BaseDomain();

            var domainReg = /^[a-zA-Z0-9]+$/;
            if (!domainReg.test(viewModel.Data.UserProfile.SubDomain())) {
                viewModel.Data.UserProfile.IsDomainAvailable('invalid');
            } else {
                viewModel.Data.UserProfile.IsDomainAvailable('_blank');
            }

            //Check if domain is available
            //viewModel.CheckAvailability(viewModel.Data.UserProfile);
            return result;
        }, this.Data.UserProfile.SubDomain);

        //Validates Password Strengh
        this.Data.UserProfile.IsPasswordValid = ko.computed(function () {
            var userProfile = this;
            var password = userProfile.Password();

            //If password is empty don't need to show the message
            if (!password)
                return true;

            var characterReg = /^(?=(.*\d){1})(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/;
            if (characterReg.test(password)) {
                return true;
            }

            return false;
        }, this.Data.UserProfile);

        //Makes sure the password confirmation matches the password
        this.Data.UserProfile.PasswordMatchesConfirmation = ko.computed(function () {
            var userProfile = this;

            //If password is not valid we don't need to check for confirmation
            if (!userProfile.IsPasswordValid())
                return true;
            if (userProfile.ConfirmPassword() == userProfile.Password())
                return true;

            return false;
        }, this.Data.UserProfile);

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
            if (!userProfile.SubDomain())
                return false;
            if (!userProfile.UserId())
                return false;
            if (!userProfile.Password())
                return false;
            if (!userProfile.IsPasswordValid())
                return false;
            if (!userProfile.PasswordMatchesConfirmation())
                return false;
            if (userProfile.IsDomainAvailable() != 'true')
                return false;
            return true;
        }, this.Data.UserProfile);
    };

    SignUpViewModel.prototype.countryChange = function (data, event) {
        var viewModel = portalViewModel.PageData;
        var match = ko.utils.arrayFirst(viewModel.Data.CountryList(), function (country) {
            return country.Code() === data.CountryCode();
        });
        if (match != null)
            viewModel.Data.LanguageList(match.SupportedLanguage());
        else
            viewModel.Data.LanguageList(null);
    };
    return SignUpViewModel;
})();

portalViewModel.PageData = new SignUpViewModel();
