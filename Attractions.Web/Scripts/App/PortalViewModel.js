/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/knockout/knockout.d.ts" />
var App;
var PortalViewModel = (function () {
    function PortalViewModel() {
    }
    PortalViewModel.prototype.userNameMouseLeave = function () {
        var userMenu = $(".UserMenu")[0];
        if ($(userMenu).is(":visible"))
            $(userMenu).slideUp(150);
    };

    PortalViewModel.prototype.userNameClicked = function () {
        var userMenu = $(".UserMenu")[0];
        if (!$(userMenu).is(":visible"))
            $(userMenu).slideDown(150);
        else
            $(userMenu).slideUp(150);
    };

    PortalViewModel.prototype.signoutIconKeyPressed = function (data, event) {
        if (event.charCode == 13)
            this.userNameClicked();
    };

    PortalViewModel.prototype.signoutKeyPressed = function (data, event) {
        if (event.charCode == 13)
            this.signOutClicked();
    };

    PortalViewModel.prototype.signOutClicked = function () {
        window.location = App.Action("Portal", "Logout");
    };
    return PortalViewModel;
})();

var portalViewModel = new PortalViewModel();
