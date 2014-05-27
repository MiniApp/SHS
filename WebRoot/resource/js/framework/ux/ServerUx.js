Ext.override(Ext.data.proxy.Server, {
			buildRequest : function(operation) {
				var me = this, params = Ext.applyIf(operation.params || {},
						me.extraParams || {}), request;

				// copy any sorters, filters etc into the params so they can be
				// sent over the wire
				params = Ext.applyIf(params, me.getParams(operation));

				if (operation.id && !params.id) {
					params.id = operation.id;
				}
				if (params.jsonData) {
					params.jsonData = Ext.encode(Ext.applyIf(Ext
									.decode(params.jsonData), {
								'startIndex' : params.startIndex,
								'pageSize' : params.pageSize
							}));
				} else {
					params.jsonData = Ext.encode({
								'startIndex' : params.startIndex,
								'pageSize' : params.pageSize
							})
				}
				request = new Ext.data.Request({
							params : params,
							action : operation.action,
							records : operation.records,
							operation : operation,
							url : operation.url,

							// this is needed by JsonSimlet in order to properly
							// construct responses for
							// requests from this proxy
							proxy : me
						});

				request.url = me.buildUrl(request);

				/*
				 * Save the request on the Operation. Operations don't usually
				 * care about Request and Response data, but in the ServerProxy
				 * and any of its subclasses we add both request and response as
				 * they may be useful for further processing
				 */
				operation.request = request;

				return request;
			}
		});