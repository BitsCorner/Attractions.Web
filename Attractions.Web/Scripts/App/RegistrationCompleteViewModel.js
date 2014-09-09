/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/knockout/knockout.d.ts" />
var App;
var RegistrationCompleteViewModel = (function () {
    function RegistrationCompleteViewModel() {
    }
    RegistrationCompleteViewModel.prototype.Continue = function () {
        var agreement = portalViewModel.PageData.Data.Agreement;
        var queryString = "?edlicnfo=" + encodeURIComponent(agreement.SerializedAgreementInfo());
        if (agreement.InvitationKey() != null && agreement.InvitationKey() != "")
            queryString += "&invitationKey=" + agreement.InvitationKey();
        window.location.href = ActionsURL.PortalIndexUrl + queryString;
    };
    return RegistrationCompleteViewModel;
})();

portalViewModel.PageData = new RegistrationCompleteViewModel();
