Ext.Loader.setConfig({
			enabled : true
		});
Ext.Loader.setPath({
			"crm" : CONTEXT_PATH,
			"base" : CONTEXT_PATH + '/js/framework/base',
			"component" : CONTEXT_PATH + '/js/framework/component',
			"ux" : CONTEXT_PATH + '/js/framework/ux',
			"businessBase" : CONTEXT_PATH + '/js/business'
			//"business" : CONTEXT_PATH + '/pages/ocrm/common/component',
			//"kbs" : CONTEXT_PATH + '/pages/kbs',
			//'Ext.ux.desktop' : CONTEXT_PATH +  '/js/common/thirdpart/desktop/core',
		    //'MyDesktop' : CONTEXT_PATH + '/js/common/thirdpart/desktop'
		});

Ext.tip.QuickTipManager.init();// 标签中添加data-qtitle data-qtip data-qwidth
// 三个属性与以前版本不同
