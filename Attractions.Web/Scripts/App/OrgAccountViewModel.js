/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/knockout/knockout.d.ts" />
var App;
var OrgAccountViewModel = (function () {
    function OrgAccountViewModel() {
    }
    OrgAccountViewModel.prototype.DataLoaded = function () {
        document.cookie = "edlicnfo=;";
        document.cookie = "InvitationKey=;";
    };

    OrgAccountViewModel.prototype.newAccountClicked = function () {
        var agreement = portalViewModel.PageData.Data.Agreement;
        var queryString = "?edlicnfo=" + encodeURIComponent(agreement.SerializedAgreementInfo());
        if (agreement.InvitationKey() != null && agreement.InvitationKey() != "") {
            queryString += "&invitationKey=" + agreement.InvitationKey();
            document.cookie = "InvitationKey=" + agreement.InvitationKey();
        } else {
            document.cookie = "InvitationKey=;";
        }
        document.cookie = "edlicnfo=" + encodeURIComponent(agreement.SerializedAgreementInfo());

        window.location.href = ActionsURL.SignUpUrl + queryString;
    };

    OrgAccountViewModel.prototype.existingAccountClicked = function () {
        var agreement = portalViewModel.PageData.Data.Agreement;
        var queryString = "?edlicnfo=" + encodeURIComponent(agreement.SerializedAgreementInfo());
        if (agreement.InvitationKey() != null && agreement.InvitationKey() != "") {
            queryString += "&invitationKey=" + agreement.InvitationKey();
            document.cookie = "InvitationKey=" + agreement.InvitationKey();
        } else {
            document.cookie = "InvitationKey=;";
        }
        document.cookie = "edlicnfo=" + encodeURIComponent(agreement.SerializedAgreementInfo());

        window.location.href = ActionsURL.PortalIndexUrl + queryString;
    };
    return OrgAccountViewModel;
})();

portalViewModel.PageData = new OrgAccountViewModel();
