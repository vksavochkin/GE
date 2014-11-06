var Check = {
	username: function (o) {
		regex = /^[a-zA-Z0-9_-]{3,15}$/;
		if (o.match(regex))
			return true;
		else
			return false;
	},
	tag: function (o) {
		regex = /^[a-zA-Z0-9_-]{3,8}$/;
		if (o.match(regex))
			return true;
		else
			return false;
	},
	password: function (o) {
		regex = /^[a-zA-Z0-9_-]{6,18}$/ ;
		if (o.match(regex))
			return true;
		else
			return false;
	},
	email: function (o) {
		return true;
		regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		if (o.match(regex))
			return true;
		else
			return false;
	},
	digit: function (o) {
		regex = /^[0-9]$/;
		if (o.match(regex))
			return true;
		else
			return false;
	},
	ip: function (o) {
		regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ ;
		if (o.match(regex))
			return true;
		else
			return false;
	},
	hex: function (o) {
		regex = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/;
		if (o.match(regex))
			return true;
		else
			return false;
	},
	url: function (o) {
		regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
		if (o.match(regex))
			return true;
		else
			return false;
	},
	isEmpty: function (o) {
		if (typeof o == 'undefined' || o === null || o === '') return true;
		if (typeof o == 'number' && isNaN(o)) return true;
		if (o instanceof Date && isNaN(Number(o))) return true;
		return false;
	},
	isRetina: function (o) {
		if (window.devicePixelRatio > 1) 
			return true;
		else
			return false;
	}
};