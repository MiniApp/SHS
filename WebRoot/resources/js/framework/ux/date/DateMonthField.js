Ext.define('ux.date.DateMonthField', {
	extend : 'Ext.form.field.Picker',
	alias : 'widget.dateMonthfield',
	format : "Y-m",

	altFormats : "m/y|m/Y|m-y|m-Y|my|mY|y/m|Y/m|y-m|Y-m|ym|Ym",

	triggerCls : Ext.baseCSSPrefix + 'form-date-trigger',

	matchFieldWidth : false,

	startDay : new Date(),

	initComponent : function() {
		var me = this;

		me.disabledDatesRE = null;
		me.format = this.format, me.callParent();
	},

	initValue : function() {
		var me = this, value = me.value;

		if (Ext.isString(value)) {
			me.value = Ext.Date.parse(value, this.format);
		}
		if (me.value)
			me.startDay = me.value;
		me.callParent();
	},

	rawToValue : function(rawValue) {
		return Ext.Date.parse(rawValue, this.format) || rawValue || null;
	},

	valueToRaw : function(value) {
		return this.formatDate(value);
	},

	formatDate : function(date) {
		return Ext.isDate(date) ? Ext.Date.dateFormat(date, this.format) : date;
	},
	createPicker : function() {
		var me = this, format = Ext.String.format;

		return Ext.create('Ext.picker.Month', {
					// renderTo: me.renderTo,
					pickerField : me,
					ownerCt : me.ownerCt,
					floating : true,
					shadow : false,
					focusOnShow : true,
					listeners : {
						scope : me,
						cancelclick : me.onCancelClick,
						okclick : me.onOkClick,
						yeardblclick : me.onOkClick,
						monthdblclick : me.onOkClick
					}
				});
	},

	onExpand : function() {
		// this.picker.show();
		this.picker.setValue(this.startDay);
		//

	},

	// onCollapse: function () {
	// this.focus(false, 60);
	// },

	onOkClick : function(picker, value) {
		var me = this, month = value[0], year = value[1], date = new Date(year,
				month, 1);
		me.startDay = date;
		me.setValue(date);
		this.picker.hide();
		// this.blur();
	},

	onCancelClick : function() {
		this.picker.hide();
		// this.blur();
	},
	parseDate : function(value) {
		if (!value || Ext.isDate(value)) {
			return value;
		}
		var me = this, val = me.safeParse(value, me.format), altFormats = me.altFormats, altFormatsArray = me.altFormatsArray, i = 0, len;
		if (!val && altFormats) {
			altFormatsArray = altFormatsArray || altFormats.split("|");
			len = altFormatsArray.length;
			for (; i < len && !val; ++i) {
				val = me.safeParse(value, altFormatsArray[i]);
			}
		}
		return val;
	},
	safeParse : function(value, format) {
		var me = this, utilDate = Ext.Date, result = null, strict = me.useStrict, parsedDate;
		result = utilDate.parse(value, format, strict);
//		if (utilDate.formatContainsHourInfo(format)) {
//			result = utilDate.parse(value, format, strict);
//			alert("1--"+format);
//		} else {
//			alert(value + " " + me.initTime);
//							alert(format + " "+ me.initTimeFormat);
//							alert(strict);
//							
//			parsedDate = utilDate.parse(value + " " + me.initTime, format + " "
//							+ me.initTimeFormat, strict);
//			
//			alert("2--"+parsedDate);
//			if (parsedDate) {
//				result = utilDate.clearTime(parsedDate);
//			}
//		}
		return result;
	}
	,
	getErrors : function(value) {
		var me = this, format = Ext.String.format, clearTime = Ext.Date.clearTime, errors = me
				.callParent(arguments), disabledDays = me.disabledDays, disabledDatesRE = me.disabledDatesRE, minValue = me.minValue, maxValue = me.maxValue, len = disabledDays
				? disabledDays.length
				: 0, i = 0, svalue, fvalue, day, time;
		value = me.formatDate(value || me.processRawValue(me.getRawValue()));
		if (value === null || value.length < 1) {
			return errors;
		}
		svalue = value;
		value = me.parseDate(value);
		if (!value) {
	        errors.push(format(me.invalidText, svalue, Ext.Date.unescapeFormat(me.format)));
	        return errors;
	    }
		return errors;
	}

});