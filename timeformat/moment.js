(function(e) {
	function O(e, t) {
		return function(n) {
			return j(e.call(this, n), t)
		}
	}
	function M(e) {
		return function(t) {
			return this.lang().ordinal(e.call(this, t))
		}
	}
	function _() {}
	function D(e) {
		H(this, e)
	}
	function P(e) {
		var t = this._data = {},
			n = e.years || e.year || e.y || 0,
			r = e.months || e.month || e.M || 0,
			i = e.weeks || e.week || e.w || 0,
			s = e.days || e.day || e.d || 0,
			o = e.hours || e.hour || e.h || 0,
			u = e.minutes || e.minute || e.m || 0,
			a = e.seconds || e.second || e.s || 0,
			f = e.milliseconds || e.millisecond || e.ms || 0;
		this._milliseconds = f + a * 1e3 + u * 6e4 + o * 36e5, this._days = s + i * 7, this._months = r + n * 12, t.milliseconds = f % 1e3, a += B(f / 1e3), t.seconds = a % 60, u += B(a / 60), t.minutes = u % 60, o += B(u / 60), t.hours = o % 24, s += B(o / 24), s += i * 7, t.days = s % 30, r += B(s / 30), t.months = r % 12, n += B(r / 12), t.years = n
	}
	function H(e, t) {
		for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
		return e
	}
	function B(e) {
		return e < 0 ? Math.ceil(e) : Math.floor(e)
	}
	function j(e, t) {
		var n = e + "";
		while (n.length < t) n = "0" + n;
		return n
	}
	function F(e, t, n) {
		var r = t._milliseconds,
			i = t._days,
			s = t._months,
			o;
		r && e._d.setTime(+e + r * n), i && e.date(e.date() + i * n), s && (o = e.date(), e.date(1).month(e.month() + s * n).date(Math.min(o, e.daysInMonth())))
	}
	function I(e) {
		return Object.prototype.toString.call(e) === "[object Array]"
	}
	function q(e, t) {
		var n = Math.min(e.length, t.length),
			r = Math.abs(e.length - t.length),
			i = 0,
			s;
		for (s = 0; s < n; s++)~~e[s] !== ~~t[s] && i++;
		return i + r
	}
	function R(e, t) {
		return t.abbr = e, s[e] || (s[e] = new _), s[e].set(t), s[e]
	}
	function U(e) {
		return e ? (!s[e] && o && require("./lang/" + e), s[e]) : t.fn._lang
	}
	function z(e) {
		return e.match(/\[.*\]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
	}
	function W(e) {
		var t = e.match(a),
			n, r;
		for (n = 0, r = t.length; n < r; n++) A[t[n]] ? t[n] = A[t[n]] : t[n] = z(t[n]);
		return function(i) {
			var s = "";
			for (n = 0; n < r; n++) s += typeof t[n].call == "function" ? t[n].call(i, e) : t[n];
			return s
		}
	}
	function X(e, t) {
		function r(t) {
			return e.lang().longDateFormat(t) || t
		}
		var n = 5;
		while (n-- && f.test(t)) t = t.replace(f, r);
		return C[t] || (C[t] = W(t)), C[t](e)
	}
	function V(e) {
		switch (e) {
		case "DDDD":
			return p;
		case "YYYY":
			return d;
		case "YYYYY":
			return v;
		case "S":
		case "SS":
		case "SSS":
		case "DDD":
			return h;
		case "MMM":
		case "MMMM":
		case "dd":
		case "ddd":
		case "dddd":
		case "a":
		case "A":
			return m;
		case "X":
			return b;
		case "Z":
		case "ZZ":
			return g;
		case "T":
			return y;
		case "MM":
		case "DD":
		case "YY":
		case "HH":
		case "hh":
		case "mm":
		case "ss":
		case "M":
		case "D":
		case "d":
		case "H":
		case "h":
		case "m":
		case "s":
			return c;
		default:
			return new RegExp(e.replace("\\", ""))
		}
	}
	function $(e, t, n) {
		var r, i, s = n._a;
		switch (e) {
		case "M":
		case "MM":
			s[1] = t == null ? 0 : ~~t - 1;
			break;
		case "MMM":
		case "MMMM":
			r = U(n._l).monthsParse(t), r != null ? s[1] = r : n._isValid = !1;
			break;
		case "D":
		case "DD":
		case "DDD":
		case "DDDD":
			t != null && (s[2] = ~~t);
			break;
		case "YY":
			s[0] = ~~t + (~~t > 68 ? 1900 : 2e3);
			break;
		case "YYYY":
		case "YYYYY":
			s[0] = ~~t;
			break;
		case "a":
		case "A":
			n._isPm = (t + "").toLowerCase() === "pm";
			break;
		case "H":
		case "HH":
		case "h":
		case "hh":
			s[3] = ~~t;
			break;
		case "m":
		case "mm":
			s[4] = ~~t;
			break;
		case "s":
		case "ss":
			s[5] = ~~t;
			break;
		case "S":
		case "SS":
		case "SSS":
			s[6] = ~~ (("0." + t) * 1e3);
			break;
		case "X":
			n._d = new Date(parseFloat(t) * 1e3);
			break;
		case "Z":
		case "ZZ":
			n._useUTC = !0, r = (t + "").match(x), r && r[1] && (n._tzh = ~~r[1]), r && r[2] && (n._tzm = ~~r[2]), r && r[0] === "+" && (n._tzh = -n._tzh, n._tzm = -n._tzm)
		}
		t == null && (n._isValid = !1)
	}
	function J(e) {
		var t, n, r = [];
		if (e._d) return;
		for (t = 0; t < 7; t++) e._a[t] = r[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
		r[3] += e._tzh || 0, r[4] += e._tzm || 0, n = new Date(0), e._useUTC ? (n.setUTCFullYear(r[0], r[1], r[2]), n.setUTCHours(r[3], r[4], r[5], r[6])) : (n.setFullYear(r[0], r[1], r[2]), n.setHours(r[3], r[4], r[5], r[6])), e._d = n
	}
	function K(e) {
		var t = e._f.match(a),
			n = e._i,
			r, i;
		e._a = [];
		for (r = 0; r < t.length; r++) i = (V(t[r]).exec(n) || [])[0], i && (n = n.slice(n.indexOf(i) + i.length)), A[t[r]] && $(t[r], i, e);
		e._isPm && e._a[3] < 12 && (e._a[3] += 12), e._isPm === !1 && e._a[3] === 12 && (e._a[3] = 0), J(e)
	}
	function Q(e) {
		var t, n, r, i = 99,
			s, o, u;
		while (e._f.length) {
			t = H({}, e), t._f = e._f.pop(), K(t), n = new D(t);
			if (n.isValid()) {
				r = n;
				break
			}
			u = q(t._a, n.toArray()), u < i && (i = u, r = n)
		}
		H(e, r)
	}
	function G(e) {
		var t, n = e._i;
		if (w.exec(n)) {
			e._f = "YYYY-MM-DDT";
			for (t = 0; t < 4; t++) if (S[t][1].exec(n)) {
				e._f += S[t][0];
				break
			}
			g.exec(n) && (e._f += " Z"), K(e)
		} else e._d = new Date(n)
	}
	function Y(t) {
		var n = t._i,
			r = u.exec(n);
		n === e ? t._d = new Date : r ? t._d = new Date(+r[1]) : typeof n == "string" ? G(t) : I(n) ? (t._a = n.slice(0), J(t)) : t._d = n instanceof Date ? new Date(+n) : new Date(n)
	}
	function Z(e, t, n, r, i) {
		return i.relativeTime(t || 1, !! n, e, r)
	}
	function et(e, t, n) {
		var i = r(Math.abs(e) / 1e3),
			s = r(i / 60),
			o = r(s / 60),
			u = r(o / 24),
			a = r(u / 365),
			f = i < 45 && ["s", i] || s === 1 && ["m"] || s < 45 && ["mm", s] || o === 1 && ["h"] || o < 22 && ["hh", o] || u === 1 && ["d"] || u <= 25 && ["dd", u] || u <= 45 && ["M"] || u < 345 && ["MM", r(u / 30)] || a === 1 && ["y"] || ["yy", a];
		return f[2] = t, f[3] = e > 0, f[4] = n, Z.apply({}, f)
	}
	function tt(e, n, r) {
		var i = r - n,
			s = r - e.day();
		return s > i && (s -= 7), s < i - 7 && (s += 7), Math.ceil(t(e).add("d", s).dayOfYear() / 7)
	}
	function nt(e) {
		var n = e._i,
			r = e._f;
		return n === null || n === "" ? null : (typeof n == "string" && (e._i = n = U().preparse(n)), t.isMoment(n) ? (e = H({}, n), e._d = new Date(+n._d)) : r ? I(r) ? Q(e) : K(e) : Y(e), new D(e))
	}
	function rt(e, n) {
		t.fn[e] = t.fn[e + "s"] = function(e) {
			var t = this._isUTC ? "UTC" : "";
			return e != null ? (this._d["set" + t + n](e), this) : this._d["get" + t + n]()
		}
	}
	function it(e) {
		t.duration.fn[e] = function() {
			return this._data[e]
		}
	}
	function st(e, n) {
		t.duration.fn["as" + e] = function() {
			return +this / n
		}
	}
	var t, n = "2.0.0",
		r = Math.round,
		i, s = {},
		o = typeof module != "undefined" && module.exports,
		u = /^\/?Date\((\-?\d+)/i,
		a = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,
		f = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,
		l = /([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,
		c = /\d\d?/,
		h = /\d{1,3}/,
		p = /\d{3}/,
		d = /\d{1,4}/,
		v = /[+\-]?\d{1,6}/,
		m = /[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i,
		g = /Z|[\+\-]\d\d:?\d\d/i,
		y = /T/i,
		b = /[\+\-]?\d+(\.\d{1,3})?/,
		w = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,
		E = "YYYY-MM-DDTHH:mm:ssZ",
		S = [
			["HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
			["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
			["HH:mm", /(T| )\d\d:\d\d/],
			["HH", /(T| )\d\d/]
		],
		x = /([\+\-]|\d\d)/gi,
		T = "Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),
		N = {
			Milliseconds: 1,
			Seconds: 1e3,
			Minutes: 6e4,
			Hours: 36e5,
			Days: 864e5,
			Months: 2592e6,
			Years: 31536e6
		},
		C = {},
		k = "DDD w W M D d".split(" "),
		L = "M D H h m s w W".split(" "),
		A = {
			M: function() {
				return this.month() + 1
			},
			MMM: function(e) {
				return this.lang().monthsShort(this, e)
			},
			MMMM: function(e) {
				return this.lang().months(this, e)
			},
			D: function() {
				return this.date()
			},
			DDD: function() {
				return this.dayOfYear()
			},
			d: function() {
				return this.day()
			},
			dd: function(e) {
				return this.lang().weekdaysMin(this, e)
			},
			ddd: function(e) {
				return this.lang().weekdaysShort(this, e)
			},
			dddd: function(e) {
				return this.lang().weekdays(this, e)
			},
			w: function() {
				return this.week()
			},
			W: function() {
				return this.isoWeek()
			},
			YY: function() {
				return j(this.year() % 100, 2)
			},
			YYYY: function() {
				return j(this.year(), 4)
			},
			YYYYY: function() {
				return j(this.year(), 5)
			},
			a: function() {
				return this.lang().meridiem(this.hours(), this.minutes(), !0)
			},
			A: function() {
				return this.lang().meridiem(this.hours(), this.minutes(), !1)
			},
			H: function() {
				return this.hours()
			},
			h: function() {
				return this.hours() % 12 || 12
			},
			m: function() {
				return this.minutes()
			},
			s: function() {
				return this.seconds()
			},
			S: function() {
				return ~~ (this.milliseconds() / 100)
			},
			SS: function() {
				return j(~~ (this.milliseconds() / 10), 2)
			},
			SSS: function() {
				return j(this.milliseconds(), 3)
			},
			Z: function() {
				var e = -this.zone(),
					t = "+";
				return e < 0 && (e = -e, t = "-"), t + j(~~ (e / 60), 2) + ":" + j(~~e % 60, 2)
			},
			ZZ: function() {
				var e = -this.zone(),
					t = "+";
				return e < 0 && (e = -e, t = "-"), t + j(~~ (10 * e / 6), 4)
			},
			X: function() {
				return this.unix()
			}
		};
	while (k.length) i = k.pop(), A[i + "o"] = M(A[i]);
	while (L.length) i = L.pop(), A[i + i] = O(A[i], 2);
	A.DDDD = O(A.DDD, 3), _.prototype = {
		set: function(e) {
			var t, n;
			for (n in e) t = e[n], typeof t == "function" ? this[n] = t : this["_" + n] = t
		},
		_months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
		months: function(e) {
			return this._months[e.month()]
		},
		_monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
		monthsShort: function(e) {
			return this._monthsShort[e.month()]
		},
		monthsParse: function(e) {
			var n, r, i, s;
			this._monthsParse || (this._monthsParse = []);
			for (n = 0; n < 12; n++) {
				this._monthsParse[n] || (r = t([2e3, n]), i = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), this._monthsParse[n] = new RegExp(i.replace(".", ""), "i"));
				if (this._monthsParse[n].test(e)) return n
			}
		},
		_weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
		weekdays: function(e) {
			return this._weekdays[e.day()]
		},
		_weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
		weekdaysShort: function(e) {
			return this._weekdaysShort[e.day()]
		},
		_weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
		weekdaysMin: function(e) {
			return this._weekdaysMin[e.day()]
		},
		_longDateFormat: {
			LT: "h:mm A",
			L: "MM/DD/YYYY",
			LL: "MMMM D YYYY",
			LLL: "MMMM D YYYY LT",
			LLLL: "dddd, MMMM D YYYY LT"
		},
		longDateFormat: function(e) {
			var t = this._longDateFormat[e];
			return !t && this._longDateFormat[e.toUpperCase()] && (t = this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(e) {
				return e.slice(1)
			}), this._longDateFormat[e] = t), t
		},
		meridiem: function(e, t, n) {
			return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
		},
		_calendar: {
			sameDay: "[Today at] LT",
			nextDay: "[Tomorrow at] LT",
			nextWeek: "dddd [at] LT",
			lastDay: "[Yesterday at] LT",
			lastWeek: "[last] dddd [at] LT",
			sameElse: "L"
		},
		calendar: function(e, t) {
			var n = this._calendar[e];
			return typeof n == "function" ? n.apply(t) : n
		},
		_relativeTime: {
			future: "in %s",
			past: "%s ago",
			s: "a few seconds",
			m: "a minute",
			mm: "%d minutes",
			h: "an hour",
			hh: "%d hours",
			d: "a day",
			dd: "%d days",
			M: "a month",
			MM: "%d months",
			y: "a year",
			yy: "%d years"
		},
		relativeTime: function(e, t, n, r) {
			var i = this._relativeTime[n];
			return typeof i == "function" ? i(e, t, n, r) : i.replace(/%d/i, e)
		},
		pastFuture: function(e, t) {
			var n = this._relativeTime[e > 0 ? "future" : "past"];
			return typeof n == "function" ? n(t) : n.replace(/%s/i, t)
		},
		ordinal: function(e) {
			return this._ordinal.replace("%d", e)
		},
		_ordinal: "%d",
		preparse: function(e) {
			return e
		},
		postformat: function(e) {
			return e
		},
		week: function(e) {
			return tt(e, this._week.dow, this._week.doy)
		},
		_week: {
			dow: 0,
			doy: 6
		}
	}, t = function(e, t, n) {
		return nt({
			_i: e,
			_f: t,
			_l: n,
			_isUTC: !1
		})
	}, t.utc = function(e, t, n) {
		return nt({
			_useUTC: !0,
			_isUTC: !0,
			_l: n,
			_i: e,
			_f: t
		})
	}, t.unix = function(e) {
		return t(e * 1e3)
	}, t.duration = function(e, n) {
		var r = t.isDuration(e),
			i = typeof e == "number",
			s = r ? e._data : i ? {} : e,
			o;
		return i && (n ? s[n] = e : s.milliseconds = e), o = new P(s), r && e.hasOwnProperty("_lang") && (o._lang = e._lang), o
	}, t.version = n, t.defaultFormat = E, t.lang = function(e, n) {
		var r;
		if (!e) return t.fn._lang._abbr;
		n ? R(e, n) : s[e] || U(e), t.duration.fn._lang = t.fn._lang = U(e)
	}, t.langData = function(e) {
		return e && e._lang && e._lang._abbr && (e = e._lang._abbr), U(e)
	}, t.isMoment = function(e) {
		return e instanceof D
	}, t.isDuration = function(e) {
		return e instanceof P
	}, t.fn = D.prototype = {
		clone: function() {
			return t(this)
		},
		valueOf: function() {
			return +this._d
		},
		unix: function() {
			return Math.floor(+this._d / 1e3)
		},
		toString: function() {
			return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
		},
		toDate: function() {
			return this._d
		},
		toJSON: function() {
			return t.utc(this).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
		},
		toArray: function() {
			var e = this;
			return [e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds()]
		},
		isValid: function() {
			return this._isValid == null && (this._a ? this._isValid = !q(this._a, (this._isUTC ? t.utc(this._a) : t(this._a)).toArray()) : this._isValid = !isNaN(this._d.getTime())), !! this._isValid
		},
		utc: function() {
			return this._isUTC = !0, this
		},
		local: function() {
			return this._isUTC = !1, this
		},
		format: function(e) {
			var n = X(this, e || t.defaultFormat);
			return this.lang().postformat(n)
		},
		add: function(e, n) {
			var r;
			return typeof e == "string" ? r = t.duration(+n, e) : r = t.duration(e, n), F(this, r, 1), this
		},
		subtract: function(e, n) {
			var r;
			return typeof e == "string" ? r = t.duration(+n, e) : r = t.duration(e, n), F(this, r, -1), this
		},
		diff: function(e, n, r) {
			var i = this._isUTC ? t(e).utc() : t(e).local(),
				s = (this.zone() - i.zone()) * 6e4,
				o, u;
			return n && (n = n.replace(/s$/, "")), n === "year" || n === "month" ? (o = (this.daysInMonth() + i.daysInMonth()) * 432e5, u = (this.year() - i.year()) * 12 + (this.month() - i.month()), u += (this - t(this).startOf("month") - (i - t(i).startOf("month"))) / o, n === "year" && (u /= 12)) : (o = this - i - s, u = n === "second" ? o / 1e3 : n === "minute" ? o / 6e4 : n === "hour" ? o / 36e5 : n === "day" ? o / 864e5 : n === "week" ? o / 6048e5 : o), r ? u : B(u)
		},
		from: function(e, n) {
			return t.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!n)
		},
		fromNow: function(e) {
			return this.from(t(), e)
		},
		calendar: function() {
			var e = this.diff(t().startOf("day"), "days", !0),
				n = e < -6 ? "sameElse" : e < -1 ? "lastWeek" : e < 0 ? "lastDay" : e < 1 ? "sameDay" : e < 2 ? "nextDay" : e < 7 ? "nextWeek" : "sameElse";
			return this.format(this.lang().calendar(n, this))
		},
		isLeapYear: function() {
			var e = this.year();
			return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
		},
		isDST: function() {
			return this.zone() < t([this.year()]).zone() || this.zone() < t([this.year(), 5]).zone()
		},
		day: function(e) {
			var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
			return e == null ? t : this.add({
				d: e - t
			})
		},
		startOf: function(e) {
			e = e.replace(/s$/, "");
			switch (e) {
			case "year":
				this.month(0);
			case "month":
				this.date(1);
			case "week":
			case "day":
				this.hours(0);
			case "hour":
				this.minutes(0);
			case "minute":
				this.seconds(0);
			case "second":
				this.milliseconds(0)
			}
			return e === "week" && this.day(0), this
		},
		endOf: function(e) {
			return this.startOf(e).add(e.replace(/s?$/, "s"), 1).subtract("ms", 1)
		},
		isAfter: function(e, n) {
			return n = typeof n != "undefined" ? n : "millisecond", +this.clone().startOf(n) > +t(e).startOf(n)
		},
		isBefore: function(e, n) {
			return n = typeof n != "undefined" ? n : "millisecond", +this.clone().startOf(n) < +t(e).startOf(n)
		},
		isSame: function(e, n) {
			return n = typeof n != "undefined" ? n : "millisecond", +this.clone().startOf(n) === +t(e).startOf(n)
		},
		zone: function() {
			return this._isUTC ? 0 : this._d.getTimezoneOffset()
		},
		daysInMonth: function() {
			return t.utc([this.year(), this.month() + 1, 0]).date()
		},
		dayOfYear: function(e) {
			var n = r((t(this).startOf("day") - t(this).startOf("year")) / 864e5) + 1;
			return e == null ? n : this.add("d", e - n)
		},
		isoWeek: function(e) {
			var t = tt(this, 1, 4);
			return e == null ? t : this.add("d", (e - t) * 7)
		},
		week: function(e) {
			var t = this.lang().week(this);
			return e == null ? t : this.add("d", (e - t) * 7)
		},
		lang: function(t) {
			return t === e ? this._lang : (this._lang = U(t), this)
		}
	};
	for (i = 0; i < T.length; i++) rt(T[i].toLowerCase().replace(/s$/, ""), T[i]);
	rt("year", "FullYear"), t.fn.days = t.fn.day, t.fn.weeks = t.fn.week, t.fn.isoWeeks = t.fn.isoWeek, t.duration.fn = P.prototype = {
		weeks: function() {
			return B(this.days() / 7)
		},
		valueOf: function() {
			return this._milliseconds + this._days * 864e5 + this._months * 2592e6
		},
		humanize: function(e) {
			var t = +this,
				n = et(t, !e, this.lang());
			return e && (n = this.lang().pastFuture(t, n)), this.lang().postformat(n)
		},
		lang: t.fn.lang
	};
	for (i in N) N.hasOwnProperty(i) && (st(i, N[i]), it(i.toLowerCase()));
	st("Weeks", 6048e5), t.lang("en", {
		ordinal: function(e) {
			var t = e % 10,
				n = ~~ (e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
			return e + n
		}
	}), o && (module.exports = t), typeof ender == "undefined" && (this.moment = t), typeof define == "function" && define.amd && define("moment", [], function() {
		return t
	})
}).call(this);