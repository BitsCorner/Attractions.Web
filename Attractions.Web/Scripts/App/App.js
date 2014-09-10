/// <reference path="../References.js" />
var application = function (a) {
    this._ctor(a);
};
application.prototype = {
    //#region Constructor
    _ctor: function (a) {
        var $s = this;
        //$s.DetectHighContrast();
        $s.InitBrowserCompatibility();
        $s.InitExtentions();
        $().ready(function () {
            $s.AppStart();
            //Want this to fire after document.ready
            $("body").ready(function () {
                $s.DetectHighContrast($s.EnableHighContrastImages);
                $s.InitBlacklistValidation();
            });
        });
    },
    //#endregion
    //#region Action and Root functions
    Root: function () {
        /// <summary>Returns the absolute url of the root for the application.</summary>
        /// <returns type="string">absolute url string to the application root.</returns>
        return $("#appRoot").attr('href');
    },
    Action: function (controller, action, area) {
        /// <summary>Client side JavaScript equivalent of VirtualPathUtility</summary>
        /// <param name="controller" type="String">The controller.</param>
        /// <param name="action" type="String">The action method.</param>
        /// <param name="area" type="String">The area (optional).</param>
        /// <returns type="string">absolute url string to path.</returns>
        var $s = window.App || this;
        if (!action) { action = ""; }
        if (area) {
            return $s.Root().concat(area, "/", controller, "/", (action != "" ? action + "/" : ""));
        }
        else {
            return $s.Root().concat(controller, "/", (action != "" ? action + "/" : ""));
        }
    },
    QueryString: function (key, defaultValue) {
        /// <summary>Get a value from the QueryString</summary>
        /// <param name="key" type="String">The key item on the query string</param>
        /// <param name="defaultValue" type="String">(Optional) the default value if the item is null.</param>
        defaultValue = defaultValue || null;
        key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + key + "=([^&#]*)", "i");
        var queryString = regex.exec(window.location.href);
        return queryString == null ? defaultValue : queryString[1];
    },
    ToAbsolute: function (path) {
        /// <summary>Client side JavaScript equivalent of VirtualPathUtility.ToAbsolute()</summary>
        /// <param name="path" type="String">The virtual path. May use ~/ to denote application root</param>
        if (path.indexOf("~") === 0 || path.indexOf("/") === 0) {

            if (path.indexOf("/") === 0) {
                return this.ToRelative(path);
            }
            path = path.replace("~/", "~");
            return this.Root() + path.substring(1);
        }
        return path;
    },
    ToRelative: function (path) {
        /// <summary>Client side JavaScript equivalent of VirtualPathUtility.ToRelative()</summary>
        /// <param name="path" type="String">The virtual path. May use ~/ to denote application root</param>
        if (path.indexOf("~") === 0) {
            path = path.substring(1);
        }
        var re = new RegExp("^" + window.location.protocol + "//" + window.location.host, "i");
        return path.replace(re, "");
    },
    //#endregion
    //#region Initialization functions
    InitExtentions: function () {
        // Add Date extension
        Date.fromISO = function (s) {
            var day, tz,
			rx = /^(\d{4}\-\d\d\-\d\d([tT ][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/,
			p = rx.exec(s) || [];
            if (p[1]) {
                day = p[1].split(/\D/);
                for (var i = 0, L = day.length; i < L; i++) {
                    day[i] = parseInt(day[i], 10) || 0;
                };
                day[1] -= 1;
                day = new Date(Date.UTC.apply(Date, day));
                if (!day.getDate()) return NaN;
                if (p[5]) {
                    tz = (parseInt(p[5], 10) * 60);
                    if (p[6]) tz += parseInt(p[6], 10);
                    if (p[4] == '+') tz *= -1;
                    if (tz) day.setUTCMinutes(day.getUTCMinutes() + tz);
                }
                return day;
            }
            return NaN;
        }

        // Extensions for getting real x,y coordinates of an element
        if (!Element.prototype.hasOwnProperty('absoluteTop')) {
            window.Object.defineProperty(Element.prototype, 'absoluteTop', {
                get: function () {
                    return this.offsetTop + (this.offsetParent ? this.offsetParent.absoluteTop : 0);
                }
            });
        }
        if (!Element.prototype.hasOwnProperty('absoluteLeft')) {
            window.Object.defineProperty(Element.prototype, 'absoluteLeft', {
                get: function () {
                    return this.offsetLeft + (this.offsetParent ? this.offsetParent.absoluteLeft : 0);
                }
            });
        }

    },
    InitBrowserCompatibility: function () {
        /* Browser compatibility */
        // Required for <IE9
        var ie = (function () {
            var undef, v = 3, div = document.createElement('div');
            while (
				div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
				div.getElementsByTagName('i')[0]
			);

            return v > 4 ? v : undef;
        }());
        if (ie < 9)
        { if (!Array.indexOf) { Array.prototype.indexOf = function (obj) { for (var i = 0; i < this.length; i++) { if (this[i] == obj) { return i; } } } } }

    },
    AppStart: function () {
        //remove input/textarea xss potential
        $('body').on('blur', 'input:text, textarea, input[type="url"], input[type="address"], input[type="search"]', function (e) {
            if (e && e.srcElement) {
                var src = $(e.srcElement);
                src.val(src.val().replace(/&(?!amp;)/ig, '&amp;').replace(/[<>]/ig, ''));
            }
        });
    },
    //#endregion
    //#region Application Utilities
    DetectHighContrast: function (callback) {
        ///	<summary>
        ///	Detects high contrast and invokes supplied function if available.
        ///	</summary>
        /// <param name="callback" type="function">A function that will be called if HighContrast is detected.</param>
        /// <returns  type="Boolean">true if high contrast otherwise false</returns>
        var $s = this;
        var imgObj = $('#hccheck');
        if (imgObj.length == 0) {
            imgObj = $('<div id="hccheck" style="width:0;height:0;"></div>').css('background', 'url(' + this.Action("Content/Images") + 'Icons.png)');
            imgObj.appendTo(document.body);
        }
        if (imgObj.css('background-image') == 'none') {
            var bodyEl = $('body');
            if (!bodyEl.hasClass('accessibility')) {
                bodyEl.addClass('accessibility');
            }
            if (typeof (callback) === 'function') {
                callback.apply(this, [{ data: $s }]);
            }
            return true;
        }
        return false;
    },
    EnableHighContrastImages: function (o) {
        var accessCount = 0;
        var $s = o.data;
        $("body").find("*[data-ux-access]").each(function (i, e) {
            var $e = $(e);
            var attrVal = $e.attr("data-ux-access");
            var span = $("<span data-ux-accessid='ac_" + ++accessCount + "'></span>");
            span.appendTo($e);
            var initialText = $e.attr('alt');
            if (initialText == null) {
                initialText = $e.attr('title');
            }
            span.text(initialText);
            if (attrVal !== "true") {
                try {
                    var stateVals = JSON.parse(attrVal);
                    $e.on("click", { parent: $e, stateVals: stateVals }, function (evt) {
                        var parent = evt.data.parent;
                        var states = evt.data.stateVals;
                        for (prop in states) {
                            if (parent.hasClass(prop)) {
                                var placeHolder = parent.find("span[data-ux-accessid]");
                                if (placeHolder.length > 0) {
                                    placeHolder.text(states[prop]);
                                }
                                if (parent.attr('alt') != null) {
                                    parent.attr('alt', states[prop]);
                                }
                                else if (parent.attr('title') != null) {
                                    parent.attr('title', states[prop]);
                                }
                                break;
                            }
                        }
                    });
                } catch (e) {; }
            }
        });
        $("head").append("<link id='highcontrastcss' href='../../../Content/Css/Lib/HighContrast.css' type='text/css' rel='stylesheet' />");
        $s.ReplaceCommonImages({ data: $s });
    },
    //#endregion

    //#region Utilities
    ReplaceResourceText: function (str, resourceText) {
        /// <summary>Does in string replacement of text from a JSON name:value object.</summary>
        /// <param name="str" type="String">The source string, Searches for {xxxx} where the xxxx is the exact named value of the key in the dictionary.</param>
        /// <param name="resourceText" type="Object">This is a JSON object in the format of {"name1":"value1","name2":"value2", ...}. Name key can only exist of a-zA-Z_0-0-9 and cannot start with a number.</param>
        /// <returns type="string">Modified string or original unmodified string if either parameter is null. </returns>
        if (str == null || resourceText == null) { return str; }
        var reg = /\{([a-zA-Z_]+[a-zA-Z0-9_]+)\}/;
        var match = reg.exec(str);
        while (match != null) {
            str = str.replace(match[0], resourceText[match[1]]);
            match = reg.exec(str);
        }
        return str;
    },

    ReplaceCommonImages: function (o) {
        $(".t-icon.t-arrow-down").addClass("sortingParentTextReplacement");
        $(".t-icon.t-arrow-down").html("<span class='sortingTextReplacement'>˅</span>");

        $(".t-icon.t-maximize").addClass("imageTextReplacement");
        $(".t-icon.t-maximize").html("⊡");

        $(".t-icon.t-Restore").addClass("imageTextReplacement");
        $(".t-icon.t-Restore").html("⊟");

        $(".t-maximize").addClass("dtpickerParentTextReplacement");
        $(".t-maximize").html("■");

        $(".t-add").addClass("PlusImageReplacement");
        $(".t-add").html("+");

        $(".i_PencilSmall.parGridEditAction").addClass("PlusImageReplacement");
        $(".i_PencilSmall.parGridEditAction").html("EDIT");

        $(".t-denied").addClass("sortingParentTextReplacement");
        $(".t-denied").html("▲");
    },

    //#endregion
    //#region Custom Client Validation 
    InitBlacklistValidation: function () {
        if ($ && $.validator) {
            // Required for the ValidateBlackListCharatersAttribute client side validation
            $.validator.addMethod("checkblacklistedcharacter",
			  function (value, element) {
			      if (value != null && value.match("[<>\"%]+") !== null) {
			          return false;
			      }
			      return true;
			  });
        }
    },
    //Special Characters validation
    ValidateSpecialCharacters: function (inputstring) {
        var find = '(\{?)(\}?)(\\[?)(\\]?)(\\&?)(\\#?)(\\%?)(\\*?)(\\$?)(\\)?)(\\(?)(\\<?)(\\>?)(\'?)(\\"?)(\\^?)(\\~?)(\\+?)(\=?)(\\!?)(\\@?)';
        var newtxt = inputstring.replace(new RegExp(find, 'g'), '');
        return newtxt.trim();

    }
    //#endregion
}
// Must load for immediate use but after jQuery has been loaded
App = new application();