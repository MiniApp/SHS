Ext.define('ux.Paging', {
			extend : 'Ext.toolbar.Paging',
			alias : 'widget.uxPagingToolbar',
			initComponent : function() {
				this.callParent();
			},
			/**
			 * Move to the first page, has the same effect as clicking the
			 * 'first' button.
			 */
			moveFirst : function() {
				this.populatePagingState('first',1);
				this.callParent();
			},

			/**
			 * Move to the previous page, has the same effect as clicking the
			 * 'previous' button.
			 */
			movePrevious : function() {
				var prevPage = this.store.currentPage - 1;
				if (prevPage <= 0) {
					prevPage = this.store.currentPage;
				}
				this.populatePagingState('previous', prevPage);
				this.callParent();
			},

			/**
			 * Move to the next page, has the same effect as clicking the 'next'
			 * button.
			 */
			moveNext : function() {
				var total = this.getPageData().pageCount;
				var nextPage = this.store.currentPage + 1;
				if (nextPage > total) {
					nextPage = this.store.currentPage;
				}
				this.populatePagingState('next', nextPage);
				this.callParent();
			},

			/**
			 * Move to the last page, has the same effect as clicking the 'last'
			 * button.
			 */
			moveLast : function() {
				this.populatePagingState('last',this.getPageData().pageCount);
				this.callParent();
			},
			populatePagingState : function(state, currPage) {
				var tempJsonData = Ext
						.decode(this.store.proxy.extraParams.jsonData);
				Ext.apply(tempJsonData, {
							'pageChangeFlag' : state,
							'currPageIndex' : currPage
						});
				this.store.proxy.extraParams.jsonData = Ext
						.encode(tempJsonData);
			}

		});