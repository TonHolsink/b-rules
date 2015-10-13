var TOOLS = TOOLS ? TOOLS : function() {

	/**
	 * Bootbox confirm dialog, where the cancel button is default
	 * @param  {string}   message   The message
	 * @param  {string}   lblOK     The OK label
	 * @param  {string}   lblCANCEL The CANCEL label
	 * @param  {Function} cb        Callback function executed when the OK button is pressed
	 * @memberOf anonymous
	 */
	var confirm = function(message, lblOK, lblCANCEL, cb) {
		if (typeof bootbox !== "undefined") {
			bootbox.dialog({
				message: message,
				// title: "Custom title",
				buttons: {
					OK: {
						label: lblOK,
						// className: "btn-default",
						callback: function() {
							cb(true);
						}
					},
					CANCEL: {
						label: lblCANCEL,
						// className: "btn-primary",
						callback: function() {
							cb(false);
						}
					}
				}
			});
		} else {
			alert('Bootbox library is not loaded!');
		}
	};

	/**
	 * detect IE
	 * returns version of IE or false, if browser is not Internet Explorer
	 * @memberOf anonymous
	 */
	var detectIE = function() {
		var ua = window.navigator.userAgent;

		// test values
		// IE 10
		//ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
		// IE 11
		//ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
		// IE 12 / Spartan
		//ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// IE 12 => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	};

	/**
	 * Formats a file size
	 * @param  {number} bytes The file size
	 * @return {string}       The formatted file size
	 * @memberOf anonymous
	 */
	var formatFileSize = function(bytes) {
		if (typeof bytes !== 'number') {
			return '';
		}
		if (bytes >= 1000000000) {
			return (bytes / 1000000000).toFixed(2) + ' GB';
		}
		if (bytes >= 1000000) {
			return (bytes / 1000000).toFixed(2) + ' MB';
		}
		return (bytes / 1000).toFixed(2) + ' KB';
	};

	/**
	 * Replaces parameterized text with string parameters
	 * @param  {string} msg    The parameterized text sting
	 * @param  {object} params array of sting paramters
	 * @return {string}        The text with replaced parameters
	 * @memberOf anonymous
	 */
	var parameterizeText = function(msg, params) {
		var result = msg;
		for (var i = 0; i < params.length; i++) {
			result = result.replace('{' + i + '}', params[i]);
		};
		return result;
	};

	/**
	 * Scrolls an element into view
	 * @param  {object} $el    jQuery element
	 * @param  {int} offset    Optional standard offset to correct for fixed menubar
	 * @memberOf anonymous
	 */
	var scrollIntoView = function($el, offset) {
		if (typeof jQuery !== "undefined") {
			var ofs = offset || 70;
			$('html, body').animate({
				//Beetje gokken (-70 compenseert voor menubar)
				scrollTop: $el.offset().top - ofs
			}, 1000);
		}
	};

	/**
	 * toastr helper function
	 * @param  {string} type  Toast type (success, info, warning or error)
	 * @param  {string} msg   The message to be displayed
	 * @param  {boolean} fixed if true message is fixed, if false message fades after 5 seconds
	 * @memberOf anonymous
	 */
	var showToast = function(type, msg, fixed) {
		if (typeof toastr !== "undefined") {
			if (fixed) {
				toastr.options = {closeButton: true, timeOut: 0, tapToDismiss: true, extendedTimeOut: 0};
			} else {
				toastr.options = {closeButton: false, timeOut: 5000, tapToDismiss: true, extendedTimeOut: 1000};
			}
			toastr[type](msg);
		} else {
			alert('Toastr library is not loaded!');
		}
	};

	/**
	 * Parse URL Queries
	 * @param {string} query the request param
	 * @memberOf anonymous
	 */
	var url_query = function( query ) {
		query = query.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var expr = "[\\?&]"+query+"=([^&#]*)";
		var regex = new RegExp( expr );
		var results = regex.exec( window.location.href );
		if ( results !== null ) {
			return results[1];
		} else {
			return false;
		}
	};

	/**
	 * XOR function
	 * @param {object} the first argument
	 * @param {object} the second argument
	 * @memberOf anonymous
	 */
	var xor = function(a, b) {
		return ( a || b ) && !( a && b );
	};

	var oPublic =
	{
		confirm: confirm,
		detectIE: detectIE,
		formatFileSize: formatFileSize,
		parameterizeText: parameterizeText,
		scrollIntoView: scrollIntoView,
		showToast: showToast,
		url_query: url_query,
		xor: xor
	};

	return oPublic;
}();