///
var App;
var ActionsURL = (function () {
    function ActionsURL() {
    }
    ActionsURL.RegistrationCountryListUrl = App.Action("Registration", "CountryList");
    ActionsURL.RegistrationInviteDetailsUrl = App.Action("Registration", "GetInviteDetails:App.Action");
    ActionsURL.SignUpUrl = App.Action("Registration", "SignUp");
    ActionsURL.RegisterUrl = App.Action("Registration", "Register");
    ActionsURL.PortalIndexUrl = App.Action("Portal", "Index");
    ActionsURL.IsDomainAvailableUrl = App.Action("Registration", "IsDomainAvailable");
    ActionsURL.AddUserUrl = App.Action("UserManagement", "AddUser");
    ActionsURL.UpdateUserUrl = App.Action("UserManagement", "UpdateUser");

    ActionsURL.GetLicensingAgreementInfoUrl = App.Action("Registration", "GetLicensingAgreementInfo");
    ActionsURL.GetLicensingTermsDocUrl = App.Action("Registration", "GetLicensingTermsDoc");

    ActionsURL.RegistrationActivationActivateOrderUrl = App.Action("Activation", "ActivateOrder");
    ActionsURL.ManageServiceUrl = App.Action("Activation", "ManageService");
    ActionsURL.ActivateServiceUrl = App.Action("Activation", "ActivateService");

    ActionsURL.ActivationIndexUrl = App.Action("Activation", "Index");
    ActionsURL.LicensingServiceCenterUrl = "https://www.microsoft.com/Licensing/";
    return ActionsURL;
})();
