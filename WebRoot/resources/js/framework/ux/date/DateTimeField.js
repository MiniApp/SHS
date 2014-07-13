Ext.define('ux.date.DateTimeField', {
			extend : 'Ext.form.field.Date',

			// overwrite
			createPicker : function() {

				Ext.picker.Date.prototype.getDayInitial = function(value) {//替换getDayInitial方法以支持ie8
					return value.substring(value.length - 1);
				};
				var me = this, format = Ext.String.format;

				return Ext.create('ux.date.DateTimePicker', {
							ownerCt : me.ownerCt,
							renderTo : document.body,
							floating : true,
							hidden : true,
							focusOnShow : true,
							minDate : me.minValue,
							maxDate : me.maxValue,
							disabledDatesRE : me.disabledDatesRE,
							disabledDatesText : me.disabledDatesText,
							disabledDays : me.disabledDays,
							disabledDaysText : me.disabledDaysText,
							format : me.format,
							showTime : me.showTime,
							showToday : me.showToday,
							startDay : me.startDay,
							minText : format(me.minText, me
											.formatDate(me.minValue)),
							maxText : format(me.maxText, me
											.formatDate(me.maxValue)),
							listeners : {
								scope : me,
								select : me.onSelect
							},
							keyNavConfig : {
								esc : function() {
									me.collapse();
								}
							}
						});
			}
		});