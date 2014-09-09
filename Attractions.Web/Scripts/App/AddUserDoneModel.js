/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/knockout/knockout.d.ts" />
var App;

var AddUserDoneModel = (function () {
    function AddUserDoneModel() {
    }
    AddUserDoneModel.prototype.DataLoaded = function () {
    };

    AddUserDoneModel.prototype.addAnotherUserClicked = function () {
        window.location = ActionsURL.AddUserUrl;
    };

    AddUserDoneModel.prototype.addUserDoneClicked = function () {
        window.location = ActionsURL.ActivationIndexUrl;
    };
    return AddUserDoneModel;
})();

portalViewModel.PageData = new AddUserDoneModel();
