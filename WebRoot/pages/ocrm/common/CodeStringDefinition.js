/**
 * js用到的标准代码定义类，所有在js中需要使用到的标准代码都在该类中定义
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class CodeStringDefinition
 */
ObjectUtil.define("CodeStringDefinition", {
	statics:{

		/***********************************************************************
		 * 公用
		 **********************************************************************/
		/** ************************common_start****************************************************** */
		// 是或否:TrueAndFalseEnum
		TRUE_AND_FALSE_CATEGORY:"TrueAndFalseEnum",
		TRUE_AND_FALSE_NO:"0",// 否//已替换 
		TRUE_AND_FALSE_YES:"1",// 是//已替换 
		
		// 文件类型：FileTypeEnum
		FILR_TYPE_CATEGORY:"FileTypeEnum",
		FILR_TYPE_EXCEL:"173000001",// EXCEL//已替换 
		FILR_TYPE_TXT:"173000002",// TXT//已替换 
		// 用户状态：InvaildAndVaildEnum
		SYSTEM_STATUE_CATEGORY:"InvaildAndVaildEnum",
		SYSTEM_STATUE_INVAILD:"173200001",// 无效
		SYSTEM_STATUE_VAILD:"173200003",// 有效
		
		CUSPERIDTYPE_CATEGORY:'CUSPerIDTEnum',// 证件种类category
		// 机构根节点及描述
		ORGSELECTTREE_ROOTCODE:'0001',
		ORGSELECTTREE_ROOTDESC:'德阳银行',
		
		SYSTEM_USER_STATE_CATEGORY:"UserActiveStatusEnum",
	    SYSTEM_USER_STATE_ACTIVE:"1",// 用户激活//已替换 
	    SYSTEM_USER_STATE_UNACTIVE:"0",// 用户未激活//已替换 
		/** ************************common_end****************************************************** */
		
		MANAGERPort_EMPLOYEE_AUTHORITY:'ManagerPort',//客户经理主管权限
		MANAGERPort_EMPLOYEE_AUTHORITY_TRADEGUARANTEEfLAG:'ManagerTradePort',//客户经理主管权限-担保客户
		RMPort_EMPLOYEE_AUTHORITY:'RMPort',//主办客户经理权限
		RMPort_EMPLOYEE_AUTHORITY_TRADEGUARANTEEfLAG:'RMTradePort',//主办客户经理权限
		AssistRMPort_EMPLOYEE_AUTHORITY:'AssistRMPort',//协办客户经理权限
		AssistRMPort_EMPLOYEE_AUTHORITY_TRADEGUARANTEEfLAG:'AssistTradeRMPort',
		OtherRMPort_EMPLOYEE_AUTHORITY:'OtherRMPort',//其他角色权限权限
		
		MANAGER_EMPLOYEE_TYPE_CODE:'PSNManagerPort',// 客户经理主管角色编码
		RM_EMPLOYEE_TYPE_CODE:'PSNRMPort',// 客户经理角色编码
		CUSDIRECTRPOS_CATEGORY:'EASYDirectrPosEnum',// 主管级别的category
		PERSON_CUSTOMER_TYPE_CODE:'person',// 对私客户类型代码
		COPORATE_CUSTOMER_TYPE_CODE:'corporate',// 对公客户类型代码
		CUSTOMER_LEVEL_CATEGORY:'CustomerLevelEnum',// 客户等级
		SpecCustAppTypEnum:'SpecCustAppTypEnum',//特殊客户申请类型
		ADJUSTMENT_TYPE_ENUM: 'AdjustmentTYPEEnum',//调整类型
		ADJUSTMENT_TYPE_ENUM_FOREVER_CODE:'203500001', //永久调整//已替换 
		ADJUSTMENT_TYPE_ENUM_FORWAIL_CODE:'203500002',//临时调整//已替换 
		ADJUSTMENT_TYPE_ENUM_FOREVER:"永久调整",//调整类型
		ADJUSTMENT_TYPE_ENUM_FORWAIL:"临时调整",//调整类型
		CORPORATE_CUSTOMER_ISIMPORT_CATEGORY:'TrueAndFalseEnum',// 对公是否重点客户category
		CORPORATE_CUSTOMER_SCOPE_CATEGORY:'CusCorpScaleEnum',// 对公客户规模category
		CORPORATE_CUSTOMER_GRADE_CATEGORY:'CorpCustomLevelEnum',// 对公客户等级category
		CORPORATE_CUSTOMER_GRADE_CENTER_IMPORT_CODE:'204100002',// 总行重点//已替换 
		CORPORATE_CUSTOMER_GRADE_CENTER_ZHANLUE_CODE:'204100001',// 总行战略//已替换 
		CORPORATE_CUSTOMER_GRADE_PROVINCE_IMPORT_CODE:'204100003',// 分行重点//已替换 
		CORPORATE_CUSTOMER_GRADE_GENEROL_CODE : '204100004',//分行一般客户，
		CORPORATE_CUSTOMER_GRADE_CHECKOUT_CODE : '204100005',//退出客户
		 CUSTOMER_EXAMAPPRSTATUS_UP:"202900005",//申请上交//已替换 
		 CUSTOMER_EXAMAPPRSTATUS_ASSIGN:"202900001",//申请分配//已替换 
		 CUSTOMER_EXAMAPPRSTATUS_AGREE :"202900004",//申请通过//已替换 
		 CUSTOMER_EXAMAPPRSTATUS_REFUSE:"202900002",//未获批准//已替换 
		 CUSTOMER_EXAMAPPRSTATUS_TRANSFER:"202900003",//申请转移//已替换 
		 CUSTOMER_EXAMAPPRSTATUS_LEVEL:"202900006",//等级变动
		
		// 综合查询执行状态
		EXECUTE_STATUS_SEARCHENGINE_CATEGORY:"ENG_ExecuteStatusEnum",
		PERSON_READY_EXECUTE_STATUS_SEARCHENGINE_MSGCODE:"195100001", // 准备执行//已替换 
		PERSON_FINISHED_EXECUTE_STATUS_SEARCHENGINE_MSGCODE:"195100002", // 执行完毕//已替换 
		PERSON_REQUEST_EXECUTE_STATUS_SEARCHENGINE_MSGCODE:"195100003", // 请求执行//已替换 
		
		// 综合查询状态
		STATUS_SEARCHENGINE_CATEGORY:"PsnschstatusEnum",
		PERSON_DESIGNING_STATUS_SEARCHENGINE_MSGCODE:"181600001", // 设计中//已替换 
		PERSON_ABATE_STATUS_SEARCHENGINE_MSGCODE:"181600002", // 已废止//已替换 
		PERSON_PUBLISHED_STATUS_SEARCHENGINE_MSGCODE:"181600003", // 已发布//已替换 
		
		//业务信息  潘飞    begin
		
		CORP_OTHER_BANK_ASSETSTYP :"CorpOtherBankAssetsTypeEnum",//他行资产类型
	    EXCHANGE_SETTLEMENT_SALE :"1",//客户结售汇
	    EXCHANGE_SETTLEMENT_ACCOUNT :"2", //客户结算量
	    //edit by ganhua start
	   CURRENT_DESPOSIT_FLAG :"142900016", //普通活期存款
	   FIX_DESPOSIT_FLAG :"175400002", //定期存款标示符//已替换 
	   NOTICE_DESPOSIT_FLAG:"175400003",  //通知存款标示符//已替换 
	   THREE_DESPOSIT_FLAG:"175400004",//三方存款//已替换 
	   CURRENT_DESPOSIT_BAIL_FLAG:"175400005",//活期保证金存款//已替换 
	   FIX_DESPOSIT_BAIL_FLAG :"175400006", //定期保证金存款标示符//已替换 
	   CONVENTION_DESPOSIT_FLAG :"175400007", //协定存款标示符//已替换 
	   EDUCATION_DESPOSIT_FLAG: "175400008",  //教育存款标示符
	   PROTOCOL_DESPOSIT_FLAG :"175400009", //协议存款标示符//已替换 
	   //edit by ganhua end
	   NORMAL_LOAN_TYLE:"102810001" ,//一般贷款标识符//已替换 
	   BUILDING_LOAN_TYLE:"102800006" ,//住房贷款标识符//已替换 
	   CAR_LOAN_TYLE:"102800005" ,//汽车贷款标识符//已替换 
	   CAUSE_LOAN_TYLE:"102820047" ,//经营性贷款标识符//已替换 
		//业务信息  潘飞   end
		
		//客户状态
		EVALSTATUS_CUSPERSON_CATEGORY:"EasyEvalStatusEnum",

		PERSON_NORMAL_EVALSTATUS_CUSPERSON_MSGCODE:"173800001", // 正常//已替换 

		PERSON_INVALID_EVALSTATUS_CUSPERSON_MSGCODE:"173800002", // 无效//已替换 

		PERSON_NOTALLOCATED_EVALSTATUS_CUSPERSON_MSGCODE:"173800002", // 未分配//已替换 
		PERSON_ALREADY_EVALSTATUS_CUSPERSON_MSGCODE:"173800001",//已分配//已替换 
		//对私客户经理类型
		PERSON_EMPLOYEETYPEENUM_CATEGORY:"EmployeeTypeEnum",
		PERSON_EMPLOYEETYPEENUM_PERSON:"199700001", //个人客户经理//已替换 
		PERSON_EMPLOYEETYPEENUM_LOBBY:"199700002", //大堂客户经理//已替换 
		USER_LEVEL_CATEGOGY:"CustomerManagerLevelEnum",//客户经理等级
		PERSON_EMPLOYEELEVEL6:"202800001",//	一级客户经理//已替换 
		PERSON_EMPLOYEELEVEL5:"202800002",//	二级客户经理//已替换 
		PERSON_EMPLOYEELEVEL4:"202800003",//	三级客户经理//已替换 
		PERSON_EMPLOYEELEVEL3:"202800004",//	四级客户经理//已替换 
		PERSON_EMPLOYEELEVEL2:"202800005",//	五级客户经理//已替换 
		PERSON_EMPLOYEELEVEL1:"202800006",//	六级客户经理//已替换 
		PERSON_EMPLOYEELEVEL10:"202800007",//	助理大堂经理//已替换 
		PERSON_EMPLOYEELEVEL9:"202800008",//	低级大堂经理//已替换 
		PERSON_EMPLOYEELEVEL8:"202800009",//	中级大堂经理//已替换 
		PERSON_EMPLOYEELEVEL7:"202800010",//	高级大堂经理//已替换 

	
		/** 财富管理模块 Begin* */
		/** 10月29日还原财富管理标准数据代码 begin*/
		// 财富管理经理角色code create by 刘强
		WEALTH_EMPLOYEE_TYPE_CODE : "WTHCUSRM",// 财富管理客户经理角色编码
		// 状态
		WEALTH_STATUS_CATEGORY : "WthStatusEnum",// 状态category
		WEALTH_STATUS_MAKING_MSGCODE : "2000580001",// 订制中：可以修改和删除。
		WEALTH_STATUS_FIRSTDECIDE_MSGCODE : "2000580002",// 初定：能修改，不能删除。
		WEALTH_STATUS_FINISH_MSGCODE : "2000580003", // 完成：不能修改，不能删除。
		WEALTH_STATUS_ABOLISH_MSGCODE : "2000580004",// 废弃：不能修改，能删除。

		// 资产项目类型
		DEBTS_ASSETSTYPE : "AssetsTypeEnum",
		DEBTS_ASSETS_01 : "2000410001", // 现金及现金等价物
		DEBTS_ASSETS_02 : "2000410002", // 定期存款
		DEBTS_ASSETS_03 : "2000410003", // 投资资产
		DEBTS_ASSETS_04 : "2000410004", // 家居资产
		DEBTS_ASSETS_05 : "2000410005", // 限定性资产
		DEBTS_ASSETS_06 : "2000410006", // 保险
		DEBTS_ASSETS_07 : "2000410007", // 债权
		DEBTS_ASSETS_08 : "2000410008", // 贷款
		DEBTS_ASSETS_09 : "2000410009", // 债务
		// 资产负债二级分类
		// 现金及现金等价物
		DEBTS_ASSETSCODE_CASH : "AssetsTypeCashEnum",
		DEBTS_ASSETSCODE_101 : "2000420001", // 现金
		DEBTS_ASSETSCODE_102 : "2000420002", // 活期
		DEBTS_ASSETSCODE_103 : "2000420003", // 通知存款
		DEBTS_ASSETSCODE_104 : "2000420004", // 货币基金
		// 定期存款
		DEBTS_ASSETSCODE_DEPOSIT : "AssetsTypeDepositEnum",
		DEBTS_ASSETSCODE_201 : "2000430001", // 整存整取
		DEBTS_ASSETSCODE_202 : "2000430002", // 零存整取
		DEBTS_ASSETSCODE_203 : "2000430003", // 整存零取
		DEBTS_ASSETSCODE_204 : "2000430004", // 存本取息
		DEBTS_ASSETSCODE_205 : "2000430005", // 教育储蓄
		DEBTS_ASSETSCODE_206 : "2000430006", // 定活两便
		// 投资资产
		DEBTS_ASSETSCODE_INVESTMENT : "AssetsTypeInvestmentEnum",
		DEBTS_ASSETSCODE_301 : "2000440001", // 基金
		DEBTS_ASSETSCODE_302 : "2000440002", // 信托
		DEBTS_ASSETSCODE_303 : "2000440003", // 股票
		DEBTS_ASSETSCODE_304 : "2000440004", // 凭证式国债
		DEBTS_ASSETSCODE_305 : "2000440005", // 记账式国债
		DEBTS_ASSETSCODE_306 : "2000440006", // 企业债券
		DEBTS_ASSETSCODE_307 : "2000440007", // 期货
		DEBTS_ASSETSCODE_308 : "2000440008", // 黄金
		DEBTS_ASSETSCODE_309 : "2000440009", // 人民币理财产品
		DEBTS_ASSETSCODE_310 : "2000440010", // 外币理财产品
		DEBTS_ASSETSCODE_311 : "2000440011", // 企业投资
		DEBTS_ASSETSCODE_312 : "2000440012", // 其他投资资产
		// 家居资产
		DEBTS_ASSETSCODE_HOUSEHOLE : "AssetsTypeHouseHoldEnum",
		DEBTS_ASSETSCODE_401 : "2000450001", // 房屋
		DEBTS_ASSETSCODE_402 : "2000450002", // 车辆
		DEBTS_ASSETSCODE_403 : "2000450003", // 其他家具资产
		// 限定性资产
		DEBTS_ASSETSCODE_RESTRICT : "AssetsTypeRestrictEnum",
		DEBTS_ASSETSCODE_501 : "2000460001", // 公积金
		DEBTS_ASSETSCODE_502 : "2000460002", // 社会统筹养老保险
		DEBTS_ASSETSCODE_503 : "2000460003", // 社会统筹医疗保险
		// 保险
		DEBTS_ASSETSCODE_INSURANCE : "AssetsTypeInsuranceEnum",
		DEBTS_ASSETSCODE_601 : "2000470001", // 人寿保险
		DEBTS_ASSETSCODE_602 : "2000470002", // 财产保险
		DEBTS_ASSETSCODE_603 : "2000470003", // 责任保险
		DEBTS_ASSETSCODE_604 : "2000470004", // 健康保险
		// 债权
		DEBTS_ASSETSCODE_CLAIM : "AssetsTypeClaimEnum",
		DEBTS_ASSETSCODE_701 : "2000480001", // 债权
		// 贷款
		DEBTS_ASSETCODE_LOAN : "AssetsTypeLoanEnum",
		DEBTS_ASSETSCODE_801 : "2000490001", // 个人住房贷款
		DEBTS_ASSETSCODE_802 : "2000490002", // 商业住房贷款
		DEBTS_ASSETSCODE_803 : "2000490003", // 公积金贷款
		DEBTS_ASSETSCODE_804 : "2000490004", // 助学贷款
		DEBTS_ASSETSCODE_805 : "2000490005", // 汽车消费贷款
		DEBTS_ASSETSCODE_806 : "2000490006", // 质押贷款
		DEBTS_ASSETSCODE_807 : "2000490007", // 短期贷款
		DEBTS_ASSETSCODE_808 : "2000490008", // 个人消费额度贷款
		DEBTS_ASSETSCODE_809 : "2000490009", // 个人助业贷款
		// 债务
		DEBTS_ASSETSCODE_DEBT : "AssetsTypeDebtEnum",
		DEBTS_ASSETSCODE_901 : "2000500001", // 债务
		/** 收入支出类型 收入类型 * */
		ASSETSINOUT_INCATEGORY : "IncomeEnum",
		// 日常收入
		ASSETSINOUT_INOUTCODE_11 : "2000520001", // 工资
		ASSETSINOUT_INOUTCODE_12 : "2000520002", // 个体经营收入
		ASSETSINOUT_INOUTCODE_13 : "2000520003", // 企事业经营收入
		ASSETSINOUT_INOUTCODE_14 : "2000520004", // 劳务报酬
		ASSETSINOUT_INOUTCODE_15 : "2000520005", // 稿酬
		ASSETSINOUT_INOUTCODE_16 : "2000520006", // 特许权收入
		ASSETSINOUT_INOUTCODE_17 : "2000520007", // 奖金收入
		ASSETSINOUT_INOUTCODE_18 : "2000520008", // 其他日常收入
		ASSETSINOUT_INOUTCODE_32 : "2000520009", // 偶然收入
		// 财富收入
		ASSETSINOUT_INOUTCODE_41 : "2000520010", // 利息收入
		ASSETSINOUT_INOUTCODE_42 : "2000520011", // 租金收入
		ASSETSINOUT_INOUTCODE_43 : "2000520012", // 保险收入
		ASSETSINOUT_INOUTCODE_44 : "2000520013", // 投资收入
		// 日常支出
		ASSETSINOUT_INOUTCODE_30 : "2000520014", // 自定义
		/** 收入支出类型 支出类型 * */
		ASSETSINOUT_OUTCATEGORY : "ExpenditureEnum",
		ASSETSINOUT_INOUTCODE_21 : "2000530001", // 基本生活支出
		ASSETSINOUT_INOUTCODE_22 : "2000530002", // 交通支出
		ASSETSINOUT_INOUTCODE_23 : "2000530003", // 租金支出
		ASSETSINOUT_INOUTCODE_24 : "2000530004", // 休闲支出
		ASSETSINOUT_INOUTCODE_25 : "2000530005", // 通讯支出
		ASSETSINOUT_INOUTCODE_26 : "2000530006", // 其他支出
		// 财富支出
		ASSETSINOUT_INOUTCODE_51 : "2000530007", // 投资支出
		ASSETSINOUT_INOUTCODE_52 : "2000530008", // 保险支出
		ASSETSINOUT_INOUTCODE_53 : "2000530009", // 还款支出

		/** 收入支出分类 * */
		ASSETSINOUT_INOUTFLAG : "InoutFlagEnum",

		ASSETSINOUT_INOUTFLAG_01 : "2000540001", // 日常收入
		ASSETSINOUT_INOUTFLAG_02 : "2000540002", // 日常支出
		ASSETSINOUT_INOUTFLAG_03 : "2000540003", // 财富收入
		ASSETSINOUT_INOUTFLAG_04 : "2000540004", // 财富支出

		/** 收支频率 * */
		ASSETSINOUT_INCOMECYCLE : "IncomecycleEnum",

		ASSETSINOUT_INCOMECYCLE_01 : "2000550001", // 月
		ASSETSINOUT_INCOMECYCLE_02 : "2000550002", // 季
		ASSETSINOUT_INCOMECYCLE_03 : "2000550003", // 半年
		ASSETSINOUT_INCOMECYCLE_04 : "2000550004", // 年
		// 是否免税
		ASSETSINOUT_ISPAYTAX : "IsPayTaxEnum", //
		ASSETSINOUT_ISPAYTAX_YES : "2000570001", // yes
		ASSETSINOUT_ISPAYTAX_NO : "2000570002", // no
		// 财务健康诊断问卷编号
		WEALTHFINANCEREFSORTNO : "RSN1010110001",
		// 定期存款存期
		WEALTH_DESPPERIOD : "DespPeriodEnum",
		WEALTH_EDUCATION : "EduDepTermEnum",

		// 财富工具----个税 收入类型
		WEALTH_PERSONTAXES : "TaxesIncomeWay",
		WEALTH_TAXESINCOMEWAY_1 : "2000660001",// 工资，薪金
		WEALTH_TAXESINCOMEWAY_2 : "2000660002",// 全年一次性奖金
		WEALTH_TAXESINCOMEWAY_3 : "2000660003",// 个体工商户的生产、经营所得
		WEALTH_TAXESINCOMEWAY_4 : "2000660004",// 对企事业单位承包经营、承租经营所得
		WEALTH_TAXESINCOMEWAY_5 : "2000660005",// 劳务报酬所得
		WEALTH_TAXESINCOMEWAY_6 : "2000660006",// 稿酬所得
		WEALTH_TAXESINCOMEWAY_7 : "2000660007",// 特许权使用费所得
		WEALTH_TAXESINCOMEWAY_8 : "2000660008",// 利息、股息、红利所得
		WEALTH_TAXESINCOMEWAY_9 : "2000660009",// 财产租凭所得
		WEALTH_TAXESINCOMEWAY_10 : "2000660010",// 财产转让所得
		WEALTH_TAXESINCOMEWAY_11 : "2000660011",// 偶然所得及其他所得
		/** 10月29日还原财富管理标准数据代码 end*/
		/** 财富管理（create by 刘强） End * */

		/** 利率查询(杨民凡)* */
		RATETYPE_CATEGORY:"RateTypeCategoryEnum", // 利率类型category
		RATE_TYPE_DEPOSIT:"2000740001", // 存款
		RATE_TYPE_LOAN:"2000740002", // 贷款
		RATE_TYPE_FIXED_INTEREST:"156900002", // 固定利率//已替换 
		RATE_TYPE_FLOATING_INTEREST:"156900001", // 浮点利率//已替换 
		/** 利率查询(杨民凡)(end)* */
		
		/** (杨民凡) **/
		CONTACTPLAN_CREATETYPE_CATEGORY:"ContactPlanCreateTypeEnum", //联系计划创建类型
		CONTACTPLAN_CREATETYPE_BYSELF:"187500001",//自己创建//已替换 
		CONTACTPLAN_CREATETYPE_BYOTHER:"187500002",//主管创建//已替换 
		/** 联系计划(杨民凡)(end) **/

		/** *****************账务信息(苏晓亮)******************** */
		TYPE_PAYMETHOD:"PaymethodEnum",// 缴费方式
		TYPE_INSURANCE:"EASYinsurefeeEnum",// 保险类型
		CUSGUARANTMTD_CATEGORY:"CUSGuarantMtdEnum",// 担保方式
		LOANTYPE_CATEGORY:"EASYLoanTypeEnum",// 贷款种类
		CURRENCY_CATEGORY:"CUSCurrencyEnum",// 币种
		CUSRTNMTD_CATEGORY:"CUSRtnMtdEnum",// 还款方式
		LOANACCTSTATE_CATEGORY:"EasyEcpStatEnum",// 账户状态
		YESNOFLAG_CATEGORY:"TrueAndFalseEnum",// 是否
		EASYCUSLN_STATE_CATEGORY:"CorpFiveGradeEnum",// 五级分类状态
		/** *****************账务信息(苏晓亮)end******************** */
		
		/** *****************客户统一视图 suhao start******************** */
		FAM_RELATION_ENUM:"FamRelationEnum",
		CUS_GENDER_ENUM:"GenderEnum",
		CUS_SALARY_ENUM:"SalaryEnum",
		CUS_PROVINCE_ENUM:"CUSProvinceEnum",
		PHYSADDRTYPE_ENUM:"PhysAddrTypeEnum",
		PHYSADDRTYPE_INTEGRATE_MSGCODE:"118800047",
		PHONETYPE_ENUM:"PhoneTypeEnum",
		AFFILIATIONRESULT_ENUM:"AffiliationResultEnum",
		LATENTREQUIREMENT_ENUM:"LatentRequirementEnum",
		PRODUCT_CONVENTION_STATE_ENUM:"ProductConventionStateEnum",
		PRODUCT_CONVENTION_STATE_ORDER_ENUM:"188600001",//已替换 
		PRODUCT_CONVENTION_STATE_WORK_ENUM:"188600002",//已替换 
		PRODUCT_CONVENTION_STATE_BOLISH_ENUM:"188600003",//已替换 
		/** *****************客户统一视图 suhao end******************** */
		
		/** ************ 综合积分（吴宇） Begin ************************* */

		// 活动审批状态:ActiveApprovalStatusEnum
		ACTIVE_APPROVAL_STATUS_CATEGORY:"ActiveApprovalStatusEnum",
		ACTIVE_APPROVAL_STATUS_INIT:"196300001",// 初始化//已替换 
		ACTIVE_APPROVAL_STATUS_APPROVING:"196300002",// 审批中//已替换 
		ACTIVE_APPROVAL_STATUS_APPROVED:"196300003",// 审批通过//已替换 
		ACTIVE_APPROVAL_STATUS_FAIL:"196300004",// 审批未通过//已替换 

		// 活动执行状态:ActiveRunStatusEnum
		ACTIVE_RUN_STATUS_CATEGORY:"ActiveRunStatusEnum",
		ACTIVE_RUN_STATUS_INIT:"182000001",// 初始化//已替换 
		ACTIVE_RUN_STATUS_APPROVING:"182000002",// 审批中//已替换 
		ACTIVE_RUN_STATUS_RUNNING:"182000003",// 执行中//已替换 
		ACTIVE_RUN_STATUS_END:"182000004",// 执行结束//已替换 

		// 活动状态:ActiveStatusEnum
		ACTIVE_STATUS_CATEGORY:"ActiveStatusEnum",
		ACTIVE_STATUS_NOMAL:"197000001",// 有效//已替换 
		ACTIVE_STATUS_INVALID:"197000002",// 无效//已替换 

		// 积分审批状态:ApprovalStatusEnum
		APPROVAL_STATUS_CATEGORY:"ApprovalStatusEnum",
		APPROVAL_STATUS_COMPLETE:"182100001",// 已审批//已替换 
		APPROVAL_STATUS_UNFINISHED:"182100002",// 未审批//已替换 

		// 审批结果状态:ApproveStatEnum
		APPROVAL_RESULT_STATUS_CATEGORY:"ApproveStatEnum",
		APPROVAL_RESULT_STATUS_APPROVING:"190500001",// 等待审批//已替换 
		APPROVAL_RESULT_STATUS_APPROVING_STR:"等待审批",// 等待审批
		APPROVAL_RESULT_STATUS_APPROVED:"190500002",// 审批通过//已替换 
		APPROVAL_RESULT_STATUS_FAIL:"190500003",// 审批拒绝//已替换 
		APPROVAL_RESULT_STATUS_DO_APPROVING:"190500004",// 正在审批//已替换 
		APPROVAL_RESULT_STATUS_DO_APPROVING_STR:"正在审批",// 正在审批

		// 活动标志：ActiveFlagEnum
		ACTIVE_FLAG_CATEGORY:"ActiveFlagEnum",
		ACTIVE_FLAG_YES:"1", // 活动//已替换 
		ACTIVE_FLAG_NO:"0", // 非活动//已替换 

		// 综合积分审批类型:ApprovalTypeEnum
		APPROVAL_TYPE_CATEGORY:"ApprovalTypeEnum",
		APPROVAL_TYPE_ACTIVE:"182200001",// 积分活动//已替换 
		APPROVAL_TYPE_TRANSFER:"182200002",// 积分转移//已替换 
		APPROVAL_TYPE_ADJUST:"182200003",// 积分调整//已替换 
		APPROVAL_TYPE_FREEZE:"182200004",// 积分冻结//已替换 
		APPROVAL_TYPE_UNFREEZE:"182200005",// 积分解冻//已替换 
		APPROVAL_TYPE_EXPENSE:"182200006",// 积分消费//已替换 
		APPROVAL_TYPE_ACTIVE_SPEC:"182200007",// 特殊活动申请人员//已替换 
		APPROVAL_TYPE_BLACK:"182200008",// 黑名单//已替换 

		// 计算方式:CountWayEnum
		COUNT_WAY_CATEGORY:"CountWayEnum",
		BASE_PRODUCT:"1002000001",// 基于产品
		BASE_AMOUNT:"1002000002",// 基于发生额

		// 字段值操作符(逻辑表达式):OperatorEnum
		LOGIC_EXP_CATEGORY:"OperatorEnum",
		LOGIC_EXP_GT_AND_GE:"195200001",// 大于等于//已替换 
		LOGIC_EXP_LT_AND_GT:"195200002",// 小于等于//已替换 
		LOGIC_EXP_GE:"195200003",// 等于//已替换 
		LOGIC_EXP_NOT_GE:"195200004",// 不等于//已替换 
		LOGIC_EXP_LT:"195200005",// 小于//已替换 
		LOGIC_EXP_GT:"195200006",// 大于//已替换 

		// 积分状态:IntegralStatusEnum
		INTEGRAL_STATUS_CATEGORY:"IntegralStatusEnum",
		INTEGRAL_STATUS_NOMAL:"182300001",// 正常//已替换 
		INTEGRAL_STATUS_FREEZE:"182300002",// 冻结//已替换 

		// 积分操作动作:IntegralOperActEnum
		INTEGRAL_OPER_ACT_CATEGORY:"IntegralOperActEnum",
		INTEGRAL_OPER_ACT_ADD:"1013000001",// 增加
		INTEGRAL_OPER_ACT_REDUCE:"1013000002",// 减少
		INTEGRAL_OPER_ACT_OTHER:"196500003",// 其他//已替换 
		
		// 批量执行状态：BatchRunStatusEnum
		BATCH_RUN_STATUS_CATEGORY:"BatchRunStatusEnum",
		BATCH_RUN_STATUS_APPROVING:"1009000001", // 审批中
		BATCH_RUN_STATUS_WAITRUN:"1009000002", // 准备执行
		BATCH_RUN_STATUS_YESRUN:"1009000003", // 执行成功
		BATCH_RUN_STATUS_NORUN:"1009000004", // 执行失败
		BATCH_RUN_STATUS_INIT:"1009000005", // 初始化

		// 到期参数类型：ExpendParaTypeEnum
		EXPEND_PARA_TYPE_CATEGORY:"ExpendParaTypeEnum",
		EXPEND_PARA_TYPE_INTEGRAL:"195400001",// 积分到期参数//已替换 

		/** ************ 综合积分（吴宇） end ************************* */
		
		// 外呼状态
		OUTBOUNDSTATUS_CATEGORY:'OutBoundStatusEnum',
		OUTBOUNDSTATUS_PLAN_MSGCODE:'9004400001', // 计划中
		OUTBOUNDSTATUS_WORK_MSGCODE:'9004400002', // 执行中
		OUTBOUNDSTATUS_OVER_MSGCODE:'9004400003',// 已生成
		
			/** --------------------------------------------------------------------------------------------------------------------------- */
		/** 对公投资人标准码 黎龙* */
		CORPORATE_CUSTOMER_INVESTWAYENUM:"FundedMannerEnum", // 出资方式
		CORPORATE_CUSTOMER_CSRCURRTYPEENUM:"CUSCurrencyEnum",// 币种
		CORPORATE_CUSTOMER_INVESTWAY:"CorpOtherRelationEnumTree",
		/** 对公投资人标准码end* */
		/** 对公资质信息标准码* */
		CORPORATE_CUSTOMER_CORPAPTGRADEENUMS:"CorpAptGradeEnum", // 资质级别
		CORPORATE_CUSTOMER_CORPAPTTYPE:"CorpAptType", // 资质类别
		/** 对公资质信息标准码* */
		/** 对公我的客户列表 黎龙* */
		CORPORATE_CUSTOMER_CORPBASEAPPSTATUS:"ApproveTypeEnum",// 审批状态
		CORPORATE_CUSTOMER_CORPBASEISIMPOR:"TrueAndFalseEnum",// 是否有效客户
		CORPORATE_CUSTOMER_CORPBASEISLOAN:"TrueAndFalseEnum",// 是否现有贷户
		CORP_SURE_IMPT_CUS_FLAG:"183600002", // 是//已替换 
		CORP_NONE_IMPT_CUS_FLAG:"183600001",// 否//已替换 
		CORPORATE_CUSTOMER_CORPENTERPRISESCOP:"CusCorpScaleEnum",// 企业规模
		CORPORATE_CUSTOMER_CORPBASEINFOGRADE:"CustomerLevelEnum",// 级别
		CORPORATE_CUSTOMER_CORPENTERLEVEL:"CorpEnterLevelEnum",// 企业等级
		/** 对公我的客户列表end* */
		/** 商圈总行级主管判定标准码 */
		POSITION_CENTER_MSGCODE:"168300001",// 总行级主管//已替换 
		/** 对公审批状态 黎龙 */
		CORPORATE_CUSTOMER_APPROVESTAT:"ApproveStatEnum",// 审批状态
		CORPORATE_CUSTOMER_APPROVESTAT1:"190500001",// 等待审批//已替换 
		/** end */
		//对公客户调整提醒类型
		CORP_CUS_CHANGE_TYPE_ASSIGN:"185200001",//主管分配//已替换 
		CORP_CUS_CHANGE_TYPE_HANDUP:"185200002",//主管上收//已替换 
		CORP_CUS_CHANGE_TYPE_TRANSFER:"185200003",//主管转移//已替换 
		CORP_CUS_CHANGE_TYPE_ASSIGN_APPLY:"185200004",//客户申领//已替换 
		CORP_CUS_CHANGE_TYPE_HANDUP_APPLY:"185200005",//申请上交//已替换 
		CORP_CUS_CHANGE_TYPE_TRANSFER_APPLY:"185200006",//申请转移//已替换 
		
		CORPORATE_CUSTOMERSERVICE_CORPVIPAPPROVETYPE:"ApproveTypeEnum",// 审批类型
		CORP_APPROVE_TYPE:"CorpApproveTypeEnum",// 对公审批类型
		CORP_VIP2_VIPAPPROVETYPE_SPCVIP:"2001020001",// 重点客户申请
		CORP_VIP2_VIPAPPROVETYPE_TRANSFER:"190400001",// 客户转移申请//已替换 
		CORP_VIP2_VIPAPPROVETYPE_UP:"190400002",// 客户上交申请//已替换 
		CORP_VIP2_VIPAPPROVETYPE_ASSIGN:"190400003",// 客户分配申请//已替换 
		VIP2_VipApproveType_LEVEL:"190400004",//客户等级变动申请//已替换 
		VIP2_VipApproveType_MSG:"190400005",//短信审批//已替换 
		VIP2_VipApproveType_VIPCARD:"190400006",//vip卡申请//已替换 
		CORP_ApproveType_LEVEL:"202400004",//已替换 
		CORP_ApproveType_TRANSFER:"202400001",//已替换 
		CORP_ApproveType_UP:"202400002",//已替换 
		CORP_ApproveType_ASSIGN:"202400003",//已替换 
		CORP_ApproveType_COMBIN:"202400009",//已替换 
		CORP_ApproveType_RESERV:"202400008",//已替换 
		CORP_ApproveType_HANDIN:"202400002",// 客户上交申请//已替换 
		CORP_ApproveType_TRANSFER:"202400001",// 客户转移申请//已替换 
		CORP_ApproveType_APPLY:"202400003",// 客户申领申请//已替换 
		/** 对公服务管理* */
		/** 对公服务管理end* */
		/** 对公关键人信息 黎龙* */
		CORPORATE_CUSTOMER_CORPCONTAPERSTYPE:"CorpContaPersTypeEnum",// 联系人类型
		CORPORATE_CUSTOMER_CUSPERIDT:"CUSPerIDTEnum",// 证件类型
		CORPORATE_CUSTOMER_CORP_CUSPERIDT:"CORPIDTEnum",// 证件类型
		CORPORATE_CUSTOMER_CUSPERIDT_PER:"111300004",// 居民身份证
		CORPORATE_CUSTOMER_CUSPERRACE:"CUSPerRACEEnum",// 民族
		CORPORATE_CUSTOMER_CUSPERRELI:"CUSPerRELIEnum",// 宗教信仰
		CORPORATE_CUSTOMER_CUSEMPEDU:"CUSEmpEduEnum",// 最高学历
		CORPORATE_CUSTOMER_TECHNICALTITLE:"TechnicalTitleEnum",// 职称
		CORPORATE_CUSTOMER_TRUEANDFALSEENUM:"TrueAndFalseEnum",// 是否接受短信
		CORPORATE_CUSTOMER_MARITALSTATUSENUM:"MaritalStatusEnum",// 婚姻状况
		CORPORATE_CUSTOMER_EASYNATIONALITY:"EASYNationEnum",// 国籍
		CORPORATE_CUSTOMER_GENDERENUM:"GenderEnum",// 性别
		CORPORATE_CUSTOMER_EASYWORKQUALIF:"EASYWorkQualifEnum",// 职业资格
		CORPORATE_CUSTOMER_CONTACTPOSENUMS:"CUSRmPosEnum",// 职务
		CORPORATE_CUSTOMER_POLICITALSTAENUMS:"PolicitalStaEnum",// 政治面貌
		CORPORATE_CUSTOMER_INCUS:"185500002",// 同业客户//已替换 
		CORPORATE_CUSTOMER_AVOUCH:"185500003",// 担保客户//已替换 
		CORPORATE_CUSTOMER_INVEST:"2002750004",// 投行客户
		CORPORATE_CUSTOMER_CORPCUST:"101600002",// 普通客户//已替换 

		/** 对公关键人信息end* */
	/** --------------------------------------------------------------------------------------------------------------------------- */

		// 问卷任务状态
		QUESTASKSTATUS_CATEGORY:'questaskstatusEnum',
		QUESTASKSTATUS_UNDO_MSGCODE:'9020100001', // 未完成
		QUESTASKSTATUS_FINISHED_MSGCODE:'9020100002', // 已完成

		// 客户情绪
		STATUS_ACTIVITE_CATEGORY:"CusMoodEnum",

		// 问卷状态
		QUESNAIRSTATUS_CATEGORY:'qnairestatusEnum',
		QUESNAIRSTATUS_DESIGN_MSGCODE:'9020800001', // 设计中
		QUESNAIRSTATUS_ABATE_MSGCODE:'9020800002', // 作废
		QUESNAIRSTATUS_PUBLISH_MSGCODE:'9020800003', // 已发布

		// 问卷类型
		QUESNATYPE_CATEGORY:'questnaireEnum',
		QUESNATYPE_PRODUCT_MSGCODE:'9009700001', // 产品销售类
		QUESNATYPE_MARKETSURVEY_MSGCODE:'9009700002', // 市场调查类
		QUESNATYPE_CUSSURVEY_MSGCODE:'9009700003', // 客户调查类

		// 问卷搜索引擎状态
		QUESSEARCH_CATEGORY:'questsearchEnum',
		QUESSEARCH_UNPUB_MSGCODE:'9009800001', // 未发布
		QUESSEARCH_PUBLISH_MSGCODE:'9009800002', // 已发布
		QUESSEARCH_ABATE_MSGCODE:'9009800003', // 已废止

		// 问卷发出渠道
		QUESCHANNEL_CATEGORY:'ChannelEnum',
		QUESCHANNEL_FACE_MSGCODE:'9009900001', // 面对面
		QUESCHANNEL_EMAIL_MSGCODE:'9009900002', // EMAIL
		QUESCHANNEL_LETTER_MSGCODE:'9009900003', // 信函
		QUESCHANNEL_NETBANK_MSGCODE:'9009900004', // 网银
		QUESCHANNEL_CALL_MSGCODE:'9009900005', // CallCenter


		/** ***** 李涛start***** */

		// 主题活动联系计划类型
		SUBJECT_PLANTYPE:"178700005",//已替换 
		// 系统标志
		SYSTM_CATEGORY:"CrmSystmEnum",
		CORPOR_SYSTM_MSGCODE:"114000001",// 对公系统//已替换 
		PERSONAL_SYSTM_MSGCODE:"114000002",// 对私系统//已替换 
		// 审批
		AUDIT_CATEGORY:"ApproveTypeEnum",// 审批类型
		AUDIT_ZHONGDIAN:'2001020001', // 重点客户审批
		
		// 审批状态
		VIP2_ApproveStat_CATEGORY:'ApproveStatEnum',
		
		ACCOUNT_TYPE:'EASYaccttypeEnum',
		
		OCRM_SMSMSGAPPLYSEND_CATEGORY:"MSG_ExecuteStatusEnum", // 短信执行状态

		OCRM_SMSMSGAPPLYSEND_DSP_MSGCODE:"193000001",// 待审批//已替换 
		SHORTMSG_STATUS_APPROVE_AGREE_CODE:"193000002", // 同意//已替换 
		SHORTMSG_STATUS_APPROVE_REFUSE_CODE:"193000003", // 拒绝//已替换 
		// 问卷类型
		QUESTIONNAIRTYPE_CATEGORY:"QuestionnaireTypeEnum",

		QUESTIONNAIRTYPE_SALON_MSGCODE:"179600001", // 主题活动//已替换 
		QUESTIONNAIRTYPE_WEALTH_CAPACITY_MSGCODE:"179600002",// 风险承受能力//已替换 
		QUESTIONNAIRTYPE_WEALTH_LIKE_MSGCODE:"179600003", // 投资偏好//已替换 
		QUESTIONNAIRTYPE_DISTRICT_MSGCODE:"179600004", // 商圈//已替换 
		QUESTIONNAIRTYPE_COMMON_MSGCODE:"179600005",// 一般问卷//已替换 
		// 总行主管
		POSITION_CENTER_MSGCODE:"168300001",//已替换 
		
		// 发布状态
		VIP2_SubjectSalonStat_CATEGORY:"PublishStatusEnum",

		// 客户参加意愿
		VIP2_SubjectSalonAtt_CATEGORY:"SubjectSalonAttEnum",
		
		// 事件类型CSRIncident 事件类型 incType
		TYPE_AFFAIR_CATEGORY:"IncTypeEnum",
		CAST_TYPE_AFFAIR_MSGCODE:"196900001", // 投诉//已替换 
		SUGGEST_TYPE_AFFAIR_MSGCODE:"196900002", // 建议//已替换 
		PRAISE_TYPE_AFFAIR_MSGCODE:"196900003", // 表扬//已替换 
		NEED_TYPE_AFFAIR_MSGCODE:"196900004", // 需求//已替换 
		
		// 事件严重度 CSRIncident INCSEVERITY
		INCIDENT_INCSEVERITY_CATEGORY:"IncSeverityEnum",
		
		// 事件紧急度 CSRIncident INCCUSTSEV
		INCIDENT_EVENTCRASH_CATEGORY:"EventCrashEnum",
		
		// 接收方式 RECEIMETH
		RECEIMETHN_CATEGORY:"ReceiveModeEnum",
		
		//事件来源渠道
		SOURCE_AFFAIR_CATEGORY:"AttendanceEnum",
		
		// 业务类型 busiType1Enum
		INCIDENT_BUSITYPE1_CATEGORY:"BusinessTypeEnum",
		
		//投诉类型
		INCIDENT_COMPLAINTYPE_CATEGORY: "CorpTroubleShootComplainTypeEnum",
		
		// 事件状态 CSRIncident 事件状态 incStatus
		STATUS_AFFAIR_CATEGORY:'IncStatusEnum',
		RECEIVED_STATUS_AFFAIR_MSGCODE: '193200001', // 接收
		REFUSE_STATUS_AFFAIR_MSGCODE: '193200002', // 拒绝
		FINISHED_STATUS_AFFAIR_MSGCODE: '193200003', // 已解决
		UNFINISHED_STATUS_AFFAIR_MSGCODE:'193200004', // 未解决//已替换 
		PENDINGAPPROVAL_STATUS_AFFAIR_MSGCODE:'193200005',//待审批//已替换 
		CANCEL_STATUS_AFFAIR_MSGCODE:'193200006',//作废//已替换 
		FEEDBACK_STATUS_AFFAIR_MSGCODE:'193200007',//待反馈//已替换 
		REVIEV_STATUS_AFFAIR_MSGCODE:'193200008',//待复核//已替换 
		TOBECLOSED_STATUS_AFFAIR_MSGCODE:'193200009',//待结案//已替换 
		PENDING_STATUS_AFFAIR_MSGCODE:'193200010',//待处理//已替换 
		CLOSED_STATUS_AFFAIR_MSGCODE:'193200011',//结案//已替换 
		PENDINGRETURN_STATUS_AFFAIR_MSGCODE:'193200012',//待回访//已替换 
		PENDINGACCEPT_STATUS_AFFAIR_MSGCODE:'193200013',//待接收//已替换 
		PENDINGAUDITING_STATUS_AFFAIR_MSGCODE:'193200014',//待审核//已替换 
		REFUSERETURN_STATUS_AFFAIR_MSGCODE:'193200015',//拒绝回访//已替换 
		
		
		// 事件类型:投诉 add by yangguo
		CAST_TYPE_AFFAIR_MSGCODE:"196900001",//已替换 

		// 事件紧急度 CSRIncident INCCUSTSEV
		INCIDENT_INCCUSTSEV_CATEGORY:"LevelTypeEnum",

		// 客户情绪 CUSTEMOTION
		STATUS_ACTIVITE_CATEGORY:"CusMoodEnum",
		
		//主题活动状态
		 STATE_SUBJECTSALON_CATEGER:"SalonSateEnum",
		 STATE_SUBJECTSALON_MSGCODE_MADING:"199800001",//定制中//已替换 
		 STATE_SUBJECTSALON_MSGCODE_NOTRELEASED :"199800002",//未发布//已替换 
		 STATE_SUBJECTSALON_MSGCODE_RELEASED :"199800003",//已发布//已替换 
		 STATE_SUBJECTSALON_MSGCODE_COMPLETE :"199800004",//完成//已替换 

		// 判断条件
		CUSTOMER_BEIZHU:'客户备注',
		AUDIT_REFUSE:'审批拒绝',
		AUDIT_WAIT:'等待审批',
		AUDIT_DAISHENP:'待审批',
		SMG_REFUSE:'拒绝',
		PUBLISH_YIFABU:'已发布',
		PUBLISH_WEIFABU:'未发布',
		INCIDENT_FINISHED: '已解决',
		INCIDENT_NEED:'需求',
		INCIDENT_REFUSE:'拒绝',
		INCIDENT_CLOSE:'结案',
		INCIDENT_CANCEL:'作废',
		CUSTOMER_VIP:'特殊VIP',
		/** ***** 李涛end***** */

		// >>>>>>>>>>>>>>>>>>>>>>>营销管理相关-yangtao>>>>>>>>>>>>>>>>开始处
		// 营销类型
		CAMTYPE_CATEGORY:'CampaignTypeEnum',
		CAMTYPE_PRODUCT_MSGCODE:'191000001', // 产品类//已替换 
		CAMTYPE_CUSTOM_MSGCODE:'191000002', //  刷卡类//已替换 
		CAMTYPE_QUES_MSGCODE:'2001080003', // 其他；类
		// 销售数量单位
		AMOUNTUNIT_CATEGORY:'AmountUnitEnum',
		//商机来源
		LEADSSOURCE_CATEGORY:'CRMLeadSourceEnum',
		LEADSSOURCE_SETSELF_MSGCODE:'191800001',//自建//已替换 
		LEADSSOURCE_MANAGERASSIGN_MSGCODE:'191800002',//系统分配//已替换 
		
		// 商机状态
		LEADSTATUS_CATEGORY:'LeadStatusEnum',
		LEADSTATUS_PLAN_MSGCODE:'191900001',// 计划中//已替换 
		LEADSTATUS_SUCCESS_MSGCODE:'191900002',// 成功//已替换 
		LEADSTATUS_FAIL_MSGCODE:'191900004',// 失败//已替换 
		LEADSTATUS_QCS_MSGCODE:"191900003",//部分成果//已替换 
		// 商机预计结束时间
		SALESOPPTUNITYENDMONTHS_CATEGORY:'OppuortunityEndMonthEnum',
		// 本月初
		OCRM_SALESOPPTUNITY_ENDMONTHS_MSGCODE:'191200001',//已替换 
		// 次月初
		OCRM_SALESOPPTUNITY_ENDNEXTMONTHS_MSGCODE:'191200002',//已替换 

		// 销售概率
		CRMPROBOFSALE_CATEGORY:'CRMProbOfSaleEnum',
		// 商机取消原因
		LEADREASONCANCEL_CATEGORY:'CRMReasonCnclEnum',
		// 商机失败原因
		CRMREASONLOST_CATEGORY:'CRMReasonLostEnum',
		// 营销状态
		CAMSTATUS_CATEGORY:'CampaignstatusEnum',
		CAMSTATUS_CUSTOMIZE_MSGCODE:'191100001', // 定制中//已替换 
		CAMSTATUS_PUBLISH_MSGCODE:'191100002', // 已发布//已替换 
		CAMSTATUS_EXCUTE_MSGCODE:'191100003', // 执行中//已替换 
		CAMSTATUS_FINISHED_MSGCODE:'191100004', // 完成//已替换 
		CAMSTATUS_END_MSGCODE:'191100005', // 结束//已替换 
		CAMSTATUS_FAIL_MSGCODE:'191100006', // 发布失败//已替换 

		// 营销任务阶段活动状态 campActTaskstatus
		OCRM_CAMPACTTASKSTATUS_PLANNING_MSGCODE:'191600001', // 执行中//已替换 
		OCRM_CAMPACTTASKSTATUS_SUCCESS_MSGCODE:'191600002', // 成功//已替换 
		OCRM_CAMPACTTASKSTATUS_GIVEUP_MSGCODE:'191600003', // 放弃//已替换 
		OCRM_CAMPACTTASKSTATUS_OVERTIME_MSGCODE:'191600004', // 逾期//已替换 
		// 营销任务状态
		CAMPTASK_STATUS_CATAGORY:'CampTaskstatus',
		STATUSENUM_EXECUTE_MSGCODE:'191700001',//已替换 
		STATUSENUM_FINISHED_MSGCODE:'191700002',//已替换 
		STATUSENUM_END_MSGCODE:"191700003", // 结束//已替换 

		// 优先级
		PRIORITY_CATEGORY:'LevelTypeEnum',
		PRIORITY_HIGH_MSGCODE:'108200001', // 高//已替换 
		PRIORITY_MIDD_MSGCODE:'108200002', // 中//已替换 
		PRIORITY_LOW_MSGCODE:'108200003', // 低//已替换 

		// 目标客户获取方式
		CUSTOMERSOURCE_CATEGORY:'ApurposeEnum',
		CUSTOMERSOURCE_QUESTIONARE_MSGCODE:'173900001', // 客户群组//已替换 
		CUSTOMERSOURCE_SEARCHENGIEN_MSGCODE:'173900003', // 通过综合查询获取客户//已替换 
		CUSTOMERSOURCE_AWOKECOUNT_MSGCODE:'173900005',//大额变动//已替换 
		CUSTOMERSOURCE_ACRM_MSGCODE:'173900002', // 管辖客户列表//已替换 
		CUSTOMERSOURCE_BYHAND_MSGCODE:'173900004',//手工导入//已替换 

		// >>>>>>>>>>>>>>>>>>>>>>>营销管理相关-yangtao>>>>>>>>>>>>>>>>结束处
		// 问卷布局
		ARRAYWAY_CATEGORY:'arraywayEnum',
		ARRAYWAY_HORI_MSGCODE:'9020500001', // 横排
		ARRAYWAY_ERECT_MSGCODE:'9020500002', // 竖排

		// 颜色
		COLOR_CATEGORY:'colourEnum',
		COLOR_BLUE_MSGCODE:'9020600001', // 蓝 colourEnum
		COLOR_YELLOW_MSGCODE:'9020600002', // 黄 colourEnum
		COLOR_RED_MSGCODE:'9020600003', // 红 colourEnum
		COLOR_BLACK_MSGCODE:'9020600004', // 黑 colourEnum
		COLOR_WHITE_MSGCODE:'9020600005', // 白 colourEnum
		COLOR_GREEN_MSGCODE:'9020600006', // 绿 colourEnum



      	/** 潘飞 begin * */
		/** 信贷核准 * */
		SANCTION_STATUS_CATEGORY:"SanctionStatusEnum",// 核准状态
		SANCTION_LEVEl_CATEGORY:"SanctionLevelEnum",// 核准层级
		CREDIT_GRADED_CATEGORY:"CreditGradedEnum",// 信用评级
		FIVE_CLASSIFICATION_CATEGORY:"CorpFiveGradeEnum",// 信贷资产风险分类
		QUALIFICATION_LEVEL_CATEGORY:"QualificationLevelEnum",// 资质等级
		PRODUCE_DIMENSIONS_CATEGORY:"CusCorpScaleEnum",// 生产规模
		FUNDED_MANNER_CATEGORY:"FundedMannerEnum",// 出资方式
		GUARANTY_TYPE_CATEGORY:"CorpGuarantyTypeEnum",// 担保方式
		CUSTOMER_TYPE_CATEGORY:"CustomerTypeEnum",// 客户类型
		CUSTOMER_DIMENSION_CATEGORY:"CusCorpScaleEnum",// 客户规模
		PROJECT_TYPE_CATEGORY:"CorpProjectTypeEnum",// 项目类别
		INDUSTRY_TYPE_CATEGORY:"IndustryTypeBigCdEnum",// 所属行业
		INDUSTRY_TYPE_CD_CATEGORY:"IndustryTypeCdEnumTree",// 所属行业
		LOAN_APPROVAL_STATUS_CATEGORY:"CorpApprovalStatusEnum",// 审批状态
		YES_NO_CATEGORY:"TrueAndFalseEnum",// 是/不是
		LOAN_OPPRAVAL_NODEIND:"CorpNodeIndEnum",// 已审核/未审核
		/** 信贷核准 * */

		/** 信贷核准变量* */
		SANCTION_LEVLE_BRANCH_CN:"分行级", // 申请层级--分行级(中文)
		SANCTION_LEVLE_HEAD_CN:"总行级", // 申请层级--总行级(中文)

		SANCTION_LEVLE_BRANCH:"172200001", // 申请层级--分行级(代码)//已替换 
		SANCTION_LEVLE_HEAD:"172200002", // 申请层级--总行级(代码)//已替换 

	    EMPLOYEE_ROLEID_MANAGER :9003010301 ,// 对公客户经理roleid
		EMPLOYEE_ROLEID_SUPERVISOR:9003010302, // 对公客户经理主管role
		EMPLOYEE_ROLEID_MAINER:9003010303, // 对公客户经理总管roleid

		EMPLOYEE_POSITION_HEAD:"168300001",// 总行级	//已替换 
		EMPLOYEE_POSITION_PROVINCE:"168300002",// 分行级		//已替换 
		EMPLOYEE_POSITION_CITY:"168300004",//一级支行级//已替换 
		EMPLOYEE_POSITION_BRANCH:"1003500003", // 二级支行级
		EMPLOYEE_POSITION_NODE:"1003500004",//网点级 

		LOAN_APPROVAL_APPLY_CN:"待申请",// 待申请
		LOAN_APPROVAL_APPROVALING_CN:"申请中",// 申请中
		LOAN_APPROVAL_PASS_CN:"已核准",// 已核准
		LOAN_APPROVAL_FORBIDDEN_CN:"已否决",// 已否决

		LOAN_APPROVAL_DO:"已审核",// 已审核
		LOAN_APPROVAL_UNDO:"未审核",// 未审核
		/** 信贷核准变量* */
      /** 潘飞 end * */
		
		/** *******************郭强start******************************* */
		/** 事件类型* */
		CORP_CUS_COMPANYINFO_EVENTTYPE:"CorpEventTypeEnum",// 事件类型
		CORP_CUS_COMPANYINFO_RELATIONSHIP:"CorpOtherRelationEnumTree",// 关联关系
		CORP_CUS_COMPANYINFO_SIGNTYPE:"CusSignTypeEnum",// 签约类别
		CORP_CUS_COMPANYINFO_CUSINDUSTYPE:"CorpCusIndusType", 
		CORP_CUS_COMPANYINFO_CREDITTYPE:"EASYCreditTypeEnum",			// 授信类型
		CORP_CUS_COMPANYINFO_PRODUCTTYPE:"EASYProductTypeEnum",// 产品类型
		CORP_CUS_COMPANYINFO_CUSCURRENCY:"CUSCurrency",// 币种
		CORP_CUS_COMPANYINFO_INDUSTRYSUBQUOTA:"CorpIndustrySubQuotaEnum",// 分享额度信息
		CORP_CUS_COMPANYRATINGINFO_BALANCE:"LocalForeignCurrencyEnum",//本外币类型
		CORP_CUS_COMPANYRATINGINFO_RMB_BALANCE:"0531000000",// 人民币
		CORP_CUS_COMPANYRATINGINFO_TOTAL_BALANCE:"0531000001",// 本外币一体
		EMPPERSONTYPE_MAIN_MSGCODE:"195300001",// 主客户经理//已替换 
		EMPPERSONTYPE_RELA_MSGCODE:"195300002", // 相关客户经理//已替换 
		EMPPERSONTYPE_ASSIST_MSGCODE:"195300004", // 协办客户经理//已替换 
		CORP_CUS_MANAGER_TYPE_MAIN:'主客户经理',
		CORP_CUS_MANAGER_TYPE_ASSETS:'协办客户经理',
		
		CORP_CUS_MANAGER_TYPE_MAIN_INT:'195300001',//已替换 
		CORP_CUS_MANAGER_TYPE_ASSETS_INT:'195300004',//已替换 
		
		//下载类型
		 DOWNTYPE_RMBRATING:"rmbrating",//客户人民币存款余额排名
		 DOWNTYPE_TOTALRATING:"totalrating",//客户本外币存款余额排名
		 DOENTYPE_RMB_AUMRATING:"rmbAUMrating",//客户人民币存款年日均排名
		 DONWTYPE_TOTAL_AUMRATING:"totalAUMrating",//客户本外币存款年日均排名
		 DOWNTYPE_ASSETS_BALANCERATING:"assetsbalancerating",//客户资产余额排名
		 DOWNTYPE_ASSETS_AMTRATING:"assetsamt",//客户资产年日均排名
		 DOWNTYPE_LOAN_RMB_BALANCERATING:"loanrmbrating",//客户人民币一般贷款余额排名
		 DOWNTYPE_LOANBALANCERATING:"loanbalancerating",//客户本外币一般贷款余额
		 DOWNTYPE_BALANCERATING:"balancerating",//客户融资余额排名
		 DOWNTYPE_BIGCHANGERATING:"bigchangerating",//客户大额变动排名
		/** *******************郭强end******************************** */

		/** 系统管理 tangyingzhen* */
		AUTHORITY_TYPE_CODE_SYSMANAGER:"9003010201",// 系统管理员角色类别编码
		AUTHORITY_TYPE_CODE_RM:"9003010301",// 客户经理角色类别编码
		AUTHORITY_TYPE_CODE_MANAGER:"9003010302",// 客户经理主管角色类别编码
		AUTHORITY_TYPE_CODE_EXPLORER:"9003010303",// 客户经理总管角色类别编码
		RESOURCETYPE_CATEGORY:"ResourceTypeEnum",// 资源类型
		FLAG_CATEGORY:"TrueAndFalseEnum",// 是否
		ROLETYPE_CATEGORY:"PostEnum", // 角色类别代码
		INIT_RESOURCE_CONTROL:"InitResourceControl",// 菜单自定义树参数
		PROD_STATE_CATEGORY:"PublishStatusEnum",// 是否已发布
		UPIDENUM_GATEGORY:"upIdEnum",// 角色类别编码
		UPID_STIRNG:"upidMenuLavel",// 角色类别分配权限
		ROLEID_STRING:"roleidMenuLavel",// 角色分配权限
		CORPERSONKY_STRING:"corpersonkyMenuLavel",// 用户分配权限
		PARATYPE_CATEGORY:"ParaTypeEnum",// 参数类型
	 	PARASTATUS_CATEGORY:"ParaStatusEnum",// 参数状态
		PARAREGION_CATEGORY:"ParaRegionEnum",// 参数值域
		SPLIT_STRING:"-",// 分隔符
		/** 系统管理 * */

		/** 产品库-产品识别 tangyingzhen* */
		PRODUCTMANDEPT_CATEGORY:'ProdManDeptEnum',// 产品管理部门
		PRODUCTRUNDEPT_CATEGORY:'ProdRunDeptEnum',// 营运管理部门
		PRODUCTBRAND_CATEGORY:'ProdBrandEnum',// 产品品牌
		PRODUCT_PUBLISH_STATE_IS_PUBLISH:'172400001',// 已发布//已替换 
		PRODUCT_NOT_TEMPLATE:'0017000001',// 不是模板产品
		PRODUCT_IS_TEMPLATE:'0017000000',// 是模板产品
		PERSON_FINANCE:'172800001',// 个人金融部//已替换 
		COMPANY_FINANCE:'172800002',// 公司金融部//已替换 
		TRADE_FINANCE:'172800003',// 贸易金融部//已替换 
		SMALL_CORP_FINANCE_DEP:'172800004',// 小微企业金融部//已替换 
		FINANCIAL_MARKETS_DEP:'172800005',// 金融市场部//已替换 

		/** 产品库-基本信息 tangyingzhen* */
		PRODUCTMODE_CATEGORY:'ProdModeEnum',// 产品模式
		PRODUCTTERM_CATEGORY:'ProdTermEnum',// 产品期限
		PRODUCTSTATE_CATEGORY:'ProdStatusEnum',// 产品状态
	    PRODUCTTYPE_CATEGORY:'EASYProductTypeEnum',// 产品类型
        PRODUCTTYPE_DEPOSIT:'185000001',//存款//已替换 
        PRODUCTTYPE_AGENCY:'185000003',//代理//已替换 
        PRODUCTTYPE_LOAN:'185000002',//贷款//已替换 
        PRODUCTTYPE_ELECHANEL:'185000006',//电子渠道//已替换 
        PRODUCTTYPE_THRIDPAY:'185000005',//第三方支付平台//已替换 
        PRODUCTTYPE_INVEST:'185000004',//投资理财产品//已替换 
        PRODUCTTYPE_CREDITCARD:'185000008',//信用卡//已替换 
        PRODUCTTYPE_BORROWCARD:'185000007',//借记卡//已替换 
		CURRENCY_CATEGORY:'CUSCurrencyEnum',// 币种
		PRODUCTCORCASH_CATEGORY:'ProdCashModeEnum',// 产品本金兑付方式
		PRODUCTINCASH_CATEGORY:'ProdCashModeEnum',// 产品收益兑付方式
		PRODUCTINCOUNT_CATEGORY:'ProdInCountEnum',// 收益计算模式
		PRODUCTINTRAIT_CATEGORY:'ProdInTraitEnum',// 收益特点
		PRODUCTINPAY_CATEGORY:'ProdInPayEnum',// 收益支付形式
		PRODUCTINPO_CATEGORY:'ProdInPoEnum',// 产品投资策略
		PRODUCTINTAR_CATEGORY:'ProdInTarEnum',// 产品投资标的
		PRODUCTINWAY_CATEGORY:'ProdInWayEnum',// 产品投资行业
		PRODUCTINAREA_CATEGORY:'ProdInAndSaleAreaEnum',// 产品投资区域
		PRODUCTRISKLEVL_CATEGORY:'LevelTypeEnum',// 产品风险等级
		PRODUCTOWNERORG_CATEGORY:'ProdHavAndAppOrgEnum',// 所有者
		PRODUCTTAXRATE_CATEGORY:'ProdTaxRateEnum',// 税率方案
		PRODUCTFLUIDTY_CATEGORY:'ProdFluidityEnum',// 产品流动性
		PRODUCTCYCLEFLAG_CATEGORY:'ProdCycleFlagEnum',// 产品循环标志
		CASH_DIVIDEND:'0109000000',// 现金分红
		DIVIDEND_REINVESTMENT:'0109000001',// 红利再投资
		BANK_SIDE:'193800001',// 银行方//已替换 
		CLIENT_SIDE:'193800002',// 客户方//已替换 
		BOTH_SIDES:'193800003',// 双方//已替换 
		DOES_NOT_ALLOW:'193800004',// 不允许//已替换 

		/** 产品库-销售范围 tangyingzhen* */
		PRODUCTSALEAREA_CATEGORY:'ProdInAndSaleAreaEnum',// 产品销售区域
		PRODUCTSALECHAN_CATEGORY:'ProdSaleChanEnum',// 销售渠道
		PRODUCTSALEOBJ_CATEGORY:'ProdSaleObjEnum',// 产品发售对象

		/** 产品库-周期信息 tangyingzhen* */
		PRODUCTCYCLETYPE_CATEGORY:'ProdPerTypeEnum',// 周期类型
		PRODUCTCIRTYPE_CATEGORY:'ProdCirTypeEnum',// 循环类型
		PRODUCTCIRUNIT_CATEGORY:'ProdCirUnitEnum',// 循环单位

		/** 产品库-交易限制 tangyingzhen* */
		PRODUCTCREDITMAN_CATEGORY:'ProdForManEnum',// 额度管理模式
		PRODUCTOPENTYPE_CATEGORY:'ProdOpenModEnum',// 产品开放类型
		PRODUCTAPPCON_CATEGORY:'ProdAppConEnum',// 申购控制方式
		RESERVATION:'194700001',// 预约//已替换 
		SUBSCRIBE:'194700002',// 认购//已替换 
		PURCHASE:'194700003',// 申购//已替换 
		REDEMPTION:'194700004',// 赎回//已替换 
		PENDING_ORDER:'194700005',// 挂单//已替换 
		REVOCATION:'194700006',// 撤销//已替换 
		PLEDGE:'194700007',// 质押//已替换 
		NON_TRADING_TRANSFER:'194700008',// 非交易过户//已替换 

		/** 产品库-费率信息 tangyingzhen* */
		PRODUCTCHARGETYPE_CATEGORY:'ProdCharTypeEnum',// 收费类型
		PRODUCTCHARGEMODE_CATEGORY:'ProdCharModeEnum',// 收费方式
		PRODUCTCOUNTWAY_CATEGORY:'ProdCouMetEnum',// 计算方法
		PRODUCTDIFMODE_CATEGORY:'ProdDifModEnum',// 差别模式,(收益信息-收益差别模式)
		PRODUCTCOSTMODE_CATEGORY:'ProdMonModEnum',// 费用模式
		PRODUCTPROSTAND_CATEGORY:'ProdScaBasEnum',// 比例基准
		PRODUCTBUSSTYPE_CATEGORY:'ProdBusiTyEnum',// 业务类型
		PRODUCTAPPORG_CATEGORY:'ProdHavAndAppOrgEnum',// 适用机构

		/** 产品库-收益信息 tangyingzhen* */
		PRODUCTINALL_CATEGORY:'ProdInAllEnum',// 收益分配方式
		PRODUCTINRACO_CATEGORY:'ProdInRaCoEnum',// 收益率计算基准

		/** 产品库-核算信息 tangyingzhen* */
		PRODUCTACCOUNTTYPE_CATEGORY:'ProdCoTyEnum',// 核算类型
		PRODUCTOPENLEVEL_CATEGORY:'ProdAcOpLeEnum',// 账户开立层次
		// ,借方账户开立层次,贷方账户开立层次
		PRODUCTOPENFLAG_CATEGORY:'ProdAcOpFlgEnum',// 账户开立标志,借方账户标志,贷方账户标志'
		PRODUCTCAPTRANWAY_CATEGORY:'ProdMonTranEnum',// 资金划拨方式
		PRODUCTDELWAY_CATEGORY:'ProdExchModEnum',// 交割方式
		PRODUCTCAPTRANMODE_CATEGORY:'ProdMoTrMoEnum',// 资金划拨模式
		PRODUCTCAPTRANTYPE_CATEGORY:'ProdMoTrTyEnum',// 资金划拨类型

		/** 同业客户相关--朱涛 */
		GY_BUSINESSTYPE:"Gy_BusinessTypeEnum", // 业务类别
		GY_FUNDBUSINESSTYPE:"Gy_FundBusinessTypeEnum",// 基金业务种类
		GY_TRADEDEPOSITCATEGORYENUM:"TradeDepositCategoryEnum",// 同业存款类别
		GY_ACCOUNTCATEGORYENUM:"AccountCategoryEnum",// 账户类别
		GY_LIMITTYPE:"Gy_LimitTypeEnum",// 期限品种
		GY_REDISCOUNTTYPE:"Gy_RediscountTypeEnum",// 转贴现类型
		GY_GUARANTEETYPE:"GuarantTypeEnum",// 担保类型
		GY_TRANSFERMETHOD:"Gy_TransferMethodEnum",// 转让方式
		GY_TRANSFERTYPE:"Gy_TransferTypeEnum",// 转让类型
		GY_FINAINSTYPE:"Gy_FinaInsTypeEnum",// 金融机构类别
		CORPENTERLEVEL:"CorpEnterLevelEnum",// 等级
		/** 行外客户相关--朱涛 */
		CORPCUSECOTYPE:"CorpCusEcoTypeEnum",// 经济类型
		CORPASSESSLEVEL :"CorpAssessLevelEnum",// 中小企业等级
		CORPCUSUNIKIND:"CorpCusUniKindEnum",// 单位性质
		/** **李庆东******************************************************* */
		/**总行级主管角色代码*/
		PROVICE_CATEGORY:"NODEMARK_CENTER_MSGCODE",//总行级主管代码
		/** 对公投行业务 */
		INVBANKCUS_PROJECTSTATE_CATEGORY:"Gy_projectStateEnum",// 项目状态
		INVBANKCUS_PROJECTTYPE_CATEGORY:"Gy_projectTypeEnum", // 项目类别
		INVBANKCUS_DEPT_CATEGORY:"GY_detailOfDep",// 所属部门
		INVBANKCUS_PAYGETTYPE_CATEGORY:"Gy_payGetTypeEnum",// 收/付款类型
		INVBANKCUS_CONTACTSTATE_CATEGORY:"Gy_ContactStateEnum",// 合约状态
		INVBANKCUS_CONTACTTYPE_CATEGORY:"Gy_ContactTypeEnum",// 类别
		INVBANKCUS_CONTDULSTATE_CATEGORY:"Gy_ContDulStateEnum",// 履行状态
		INVBANKCUS_HIVEPROJECTTYPE_CATEGORY:"GY_hiveProjectTypeEnum",// 储备项目，项目状态
		INVBANKCUS_HIVEPROJECTTYPE_CATEGORY_REVIEW:"183700001",// 通过评审立项//已替换 
		INVBANKCUS_AGREEMENTTYPE_CATEGORY:"Gy_protocolTypeEnum",// 协议类别
		INVBANKCUS_DEBT_MAIN:"debt_m",// 主承销
		INVBANKCUS_DEBT_SEQ:"debt_se",// 副主承销
		INVBANKCUS_DEBT_SUB:"debt_su",// 分承销
		/** 提醒管理 */
		REMIND_CORPPROAWOKE_CATEGORY:"Gy_ProAwokeTypeEnum",// 对公产品到期提醒--提醒类型
		REMIND_CORPCUSCHANGE_CATEGORY:"AlterreasonEnum",// 对公客户变动提醒--提醒类型
		REMIND_CORPACCOUNTCHANGE_CATEGORY:"AccountChangeAwokeEnum",// 对公账户变动提醒--提醒类型//已替换 
		REMIND_CORPACCOUNTCHANGE_DEAL_CATEGORY:"CorpTradingModeEnum",//对公账户变动提醒--交易类型
		REMIND_CORPIMPDATEAWOKE_CATEGORY:"CorpImpDateAwokeEnum",// 重要日期提醒--提醒类型
		REMIND_CORPCUSCHANGE_ENUM:"CorpClientAdjustRemindEnum",// 对公客户调整提醒--提醒类型
		/** 李庆东end********************************************************** */
		/** 业务类型 */
		BUSINESSTYPE_CATEGORY:"ComBusinessTypeEnum",// 业务类型
		BUSINESS_TYPE_COMMON_PRODUCT:"184900001",// 产品库//已替换 
		BUSINESS_TYPE_PERSON_INVEST_TEST:"184900002",// 对私投资偏好评估//已替换 
		BUSINESS_TYPE_PERSON_SERMANAGE_INQ:"184900003",// 对私服务管理问卷调查//已替换 
		BUSINESS_TYPE_CORPORATE_BUSGROUP_REPORT_TEMPLATE:"184900004",// 对公商圈分析报告模板//已替换 
		BUSINESS_TYPE_CORPORATE_BUSGROUP_REPORT:"184900005",// 对公商圈分析报告//已替换 
		BUSINESS_TYPE_CORPORATE_TICK_CHECK:"184900006",// 对公信贷核准//已替换 
		BUSINESS_TYPE_PERSON_SERMANAGE_THEME:"184900007",// 对私服务管理问卷调查主题活动//已替换 
		BUSINESS_TYPE_PERSON_SERMANAGE_WEALTH:"184900008",// 对私服务管理问卷调查财富//已替换 
		BUSINESS_TYPE_PERSON_SERMANAGE_BUSGROUP:"184900009",// 对私服务管理问卷调查商圈//已替换 
		BUSINESS_TYPE_PERSON_SCORE_BATCH:"184900010",// 对私综合积分管理批量处理//已替换 
		BUSINESS_TYPE_CORPORATE_TEAM_RESOURCE:"184900011",// 对公团队资料//已替换 
		BUSINESS_TYPE_OTHER_LOAN:"184900012",// 他行贷款信息维护//已替换 
		BUSINESS_TYPE_CORPORATE_DOCMANAGE:"184900013",// 功能业务类型--对公文档记录//已替换 
		BUSINESS_TYPE_COM_FEEDBACK:"184900014",// 功能业务类型--对公文档记录//已替换 
		BUSINESS_TYPE_COM_EXTCUSTOMER_DOC:"2002560015",// 功能业务类型--对公潜在客户文档信息
		BUSINESS_TYPE_CORP_AUTIDAPPLAY_DOC:"2002560016",// 功能业务类型--对公客户审批申请文档信息
		BUSINESS_TYPE_COM_ACTIVITY:"2002560017",//主题活动
		/** 用户管理(朱凯) */
		GENDER_CATEGORY:"GenderEnum",// 性别
		STATUS_CUSEmpEdu_CATEGORY:"CUSEmpEduEnum",// 最高学历
		STATUS_NATION_CATEGORY:"CUSPerRACEEnum",// 民族
		CUSPERIDTYPE_ID_MSGCODE:"111300004",// 身份证0002000000
		CUSPERIDTYPE_TEMPORARYID_MSGCODE:"111300011",//临时身份证
		TECHNICAL_TITLE_CATEGORY:"TechnicalTitleEnum",// 职称
		PROFESSINAL_LEVEL_CATEGORY:"BussnegopermEnum",// 专业技术职务等级
		CONTRACT_CATEGORY:"ContractEnum",// 合同情况
		SKILLPOSITION_CATEGORY:"SkillpositionEnum",// 专业技术职务类别
		FULLTIME_CATEGORY:"TrueAndFalseEnum",// 是否专职客户经理
		POLICITAL_CATEGORY:"PolicitalStaEnum",// 政治面貌
		EASYEVALSTATUS_CATEGORY:"EmpStatusEnum",// 雇员状态
		DEPTBELONG_CATEGORY:"EmpDeptBelongEnum",// 工作区域
		POSITION_CATEGORY:"EASYDirectrPosEnum",// 主管级别
		
		PERSON_SPECIAL_VIP_CUSTOM_CATEGORY:"TrueAndFalseEnum",// 1.20
		POLICITAL_CATEGORY:"PolicitalStaEnum",// 政治面貌
		EASYEVALSTATUS_CATEGORY:"EmpStatusEnum",// 雇员状态
		DEPTBELONG_CATEGORY:"EmpDeptBelongEnum",// 工作区域
		POSITION_CATEGORY:"EASYDirectrPosEnum",// 主管级别
		POSITION_CATEGORY_SECEND:"168300002",// 一级分行//已替换 
		POSITION_CATEGORY_MSGCODE:"1003500004",// 网点级//已替换 
		// 客户等级
		CUSTOMERLEVEL_CATEGORY:"CustomerLevelEnum",
		CUSTOMERLEVEL_PLATINUM_MSGCODE:"174100001", // 大众客户//已替换 
		CUSTOMERLEVEL_WGD_MSGCODE:"174100002", // 黄金级//已替换 
		CUSTOMERLEVEL_DIAMOND_MSGCODE:"174100003", // 白金级//已替换 
		CUSTOMERLEVEL_PB_MSGCODE:"174100004", // 钻石级//已替换 
		CUSTOMERLEVEL_ONE_MSGCODE:"普通级",
		CUSTOMERLEVEL_THREE_MSGCODE:"黄金级", //黄金级
		CUSTOMERLEVEL_FOUR_MSGCODE:"铂金级", // 白金级
		CUSTOMERLEVEL_FIVE_MSGCODE:"钻石级", // 钻石级
		PERSON_SPECIAL_VIP_CUSTOM_CATEGORY:"TrueAndFalseEnum",// 1.20
		//拟申请VIP卡等级
		CUSTOMER_VIPCARD_LEVEL:"VIPCardTypeEnum",
		CUSTOMER_VIPCARD_BAIJIN:"201700003",//白金卡//已替换 
		CUSTOMER_VIPCARD_ZHUANSHI:"201700004",//钻石卡//已替换 
		CUSTOMER_VIPCARD_GOLD:"201700002",//黄金卡//已替换 
		CUSTOMER_VIPCARD_ONE:"白金",
		CUSTOMER_VIPCARD_TWO:"钻石",
		CUSTOMER_VIPCARD_THREE:"黄金",
		// 特殊VIP标志
		APPROVTYPE_PERSON_CATEGORY:"ApproveStatEnum",// 1.23
		// 客户审批状态
		PERSON_PUTUP_APPROVTYPE_PERSON_MSGCODE:"5000600506",// 申请上交

		/** 综合查询 */

		EXECUTE_STATUS_SEARCHENGINE_CATEGORY:"ENG_ExecuteStatusEnum",// 综合查询执行状态
		STATUS_SEARCHENGINE_CATEGORY:"PsnschstatusEnum",// 综合查询状态
		PERSON_TYPE_CONDITION_SEARCHENGINE_CATEGORY:"ConditionTypeEnum",// 综合查询--条件类型
		PERSON_OPERATOR_SEARCHENGINE_CATEGORY:"OperatorEnum",// 综合查询--字段值操作符
		PERSON_RELATION_OPERATOR_CONDITION_SEARCHENGINE_CATEGORY:"RelationOperEnum",// 综合查询--条件联接操作符

		/** 提醒类型 */
		ACCUNTABUND_AWOKE_TRANSACTIONTYPE:"RemindBigTypeEnum",//大额交易类型
		
		VIP2_AwokeParent_CATEGORY:"AwokeTypeEnum", // 提醒类型
		VIP2_AccChgAwoke_CATEGORY:"AccountChangeAwokeEnum",// 帐户变动类型提醒//已替换 
		VIP2_SaleAwoke_CATEGORY:"MarketingTypeAwokeEnum",// 营销类提醒//已替换 
		VIP2_SaleAwoke_CODE:"170600002",//营销类提醒
		VIP2_ImpDateAwoke_CATEGORY:"ImportantDateAwokeEnum",// 重要纪念日类提醒//已替换 
		VIP2_REMIND_CYCLE_CATEGORY:"RemindCycleEnum",//提醒周期
		
		VIP2_BIRTHDATE_CATEGORY:"170900001",//生日类提醒//已替换 
		
		VIP2_ProDateAwoke_CATEGORY:"ProductMaturityAwokeEnum",// 产品到期类提醒//已替换 
		VIP2_UnAssCusAwoke_CATEGORY:"170600005",// 未分配客户提醒//已替换 
		VIP2_CUSCOMPLNTAwoke_CATEGORY:"170600006",// 客户投诉提醒//已替换 
		VIP2_UndoTaskAwoke_CATEGORY:"170600007",//未完成任务//已替换 
		VIP2_RiskWarnManangement_CATEGORY:"170600008",//风险提示管理//已替换 
		VIP2_CustomerTransfer_CATEGORY:"170600009",//客户转移提醒//已替换 
		VIP2_OtherProductAwoke_CATEGORY:"170600010",//他行产品到期提醒//已替换 
		VIP2_PsnAbundWarnAwoke_CATEGORY:"170600011",//账户大额变动提醒//已替换 
		VIP2_CustAbundWARN_CATEGORY:"170600012",//客户大额变动提醒//已替换 
		
		VIP2_INSURANCE_DUE:"171000007",//保险到期提醒//已替换 
		VIP2_MATURITY:"171000006",//基金到期提醒//已替换 
		VIP2_INDIVIDUAL_CUSTOMERS:"171000003",//个人客户国债到期提醒//已替换 
		
		
		/** 联系计划 */
		VIP2_VipContactWay_CATEGORY:"EASYPrefectWayEnum",// 联系方式
		VIP2_VipContactStatus_CATEGORY:"ContactStatus", // 联系计划状态
		VIP2_VipContactType_CATEGORY:"ContactTypeEnum", // 联系计划类型
		VIP2_VipContactType_PROCODE:"197900002",//产品到期联系计划//已替换 
		VIP2_VipContactType_BIRTHCODE :"197900003",//客户生日联系计划//已替换 
		
		
		
		/**对公联系方式CorpContactWayEnum*/
	VIP2_CorpContactWay_CATEGORY:"CORPPrefectWayEnum",// 联系方式
	VIP2_CorpContactWay_ACTIVEPHONE:"188200001", // 主动电话	//已替换 
	VIP2_CorpContactWay_CUSPHONE: "2003460002", // 客户来电
	VIP2_CorpContactWay_GOVISIT :"188200003", // 上门拜访//已替换 
	VIP2_CorpContactWay_COMEVISIT:"188200004", // 客户来访//已替换 
	VIP2_CorpContactWay_MAIL:"2003460005", // 邮件

	//营销服务联系计划
	CORP_CUSTOMER_CORPSALECONTANTPLAN:"SaleCorpContactTypeEnum",
	
		/**
		 * ********************added by ganhua start
		 * *****************************
		 */
		CORP_TEAMSTATUS:"CorpTeamStatusEnum", // 团队状态
		CORP_TEAMSTATUSNORMAL:"192700001",// 正常//已替换 
		CORP_TEAMSTATUSDISBAND:"192700002",// 解散//已替换 
		CORP_TEAMMEMSTATUS:"CorpTeamMemStatusEnum",// 成员状态
		CORP_TEAMMEMSTATUSNOR:"192800001",// 正式//已替换 
		// CORP_TEAMMEMSTATUSAPRING:"1204000002",// 审批中
		CORP_TEAMMEMSTATUSINVALID:"192800002",// 无效//已替换 
		CORP_CORPTASKDOSTATUS:"CorpTaskDoStatusEnum",// 任务状态
		CORP_CORPTASKDOSTATUSUNDO:"192900002",// 未完成//已替换 
		CORP_CORPTASKDOSTATUSDONE:"192900001",// 已完成//已替换 
		CORP_CORPTASKDOSTATUSBUILD:"192900003",// 定制中//已替换 
		CORP_CORPTASKPRIORITY:"LevelTypeEnum",// 任务优先级
		/**
		 * ********************added by ganhua end *****************************
		 */
		/** ***** 蒋敏start***** */
		RLATIONA_CODE:"181800001",//条件连接符AND已替换
		RLATIONB_CODE:"181800002",//条件连接符OR
		PAYWAY_CODE:"PayWayEnum",// 偿还方式
		SECURITYMODE_CODE:"CUSGuarantMtdEnum",// 担保方式
		STOCKTYPE_CODE:"CorpStockTypeEnum",// 股票种类
		UPMARADDR_CODE:"CorpUpmarAddrEnum",// 上市地
		CORP_CONTACTTYPE:"CorpContactTypeEnum",// 对公联系计划类型
		CORP_CONTACTLEVELTYPE:"ContactPlanLevelEnum",// 联系计划级别
		/** ***** 蒋敏end***** */
		/**
		 * ********************added by liuzhongzhao start
		 * *****************************
		 */
		CORP_AVOUCHTYPE:"GY_AvouchTypeEnum",// 担保类别枚举
		CORP_AVOUCHTYPE_CREDITTYPE:"2001240001",// 贷款担保
		CORP_AVOUCHTYPE_ACCEPTTYPE:"2001240002",// 承兑担保
		CORP_AVOUCHTYPE_LETTERTYPE:"2001240003",// 信用证担保
		CORP_AVOUCHTYPE_GUARANTEETYPE:"2001240004",// 保函担保
		CORP_TAXSIGNTYPE:"CorpTaxSignEnum",// 税务标志
		CORP_TAXSITUATION:"CorpTaxSituationEnum",// 缴税情况
		CORP_PAYMETHODENUM:"PaymethodEnum",// 缴费方式
		CORP_INSURANCE_INSURETYPE:"EASYinsurefeeEnum",// 保险类型
		CORP_HEAD_CUSMANAGER:"9000500000",// 总行级主管标志
		CORP_INSURPREF_CATEGORY:"InsurprefEnum",// 保险险种
		CORP_OTHERBANKASSETS_CATEGORY:"CorpOtherBankAssetsTypeEnum",//类别－－他行资产
		/**
		 * ********************added by liuzhongzhao end
		 * *****************************
		 */
		INDUSTRY_TYPE_TREE_ROOT_CODE:'IndustryTypeBigCdEnum',// 行业类型树根节点代码

		/**
		 * ********************added by DuanYong start
		 * *****************************
		 */
		// 系统主题-蓝色
		SYSTEM_THEME_CODE_DEFAULT:'default',// 蓝色理想
		SYSTEM_THEME_NAME_DEFAULT:'蓝色理想',// 蓝色理想
		SYSTEM_THEME_PANEL_BODY_STYLE_DEFAULT:"background:#DFE9F6|",// 蓝色背景:注意样式中;号用|代替
		SYSTEM_THEME_HEADER_STYLE_DEFAULT:"index-head-bg-default",// header背景样式
		SYSTEM_THEME_MENU_STYLE_DEFAULT:"ocrm-toolbar",// 主菜单背景样式
		SYSTEM_THEME_CALENDAR_STYLE_DEFAULT:"calendar_header_small",// 日历控件背景样式
		// 系统主题-灰色
		SYSTEM_THEME_CODE_GRAY:'gray',// 灰色轨迹
		SYSTEM_THEME_NAME_GRAY:'灰色轨迹',// 灰色轨迹
		SYSTEM_THEME_PANEL_BODY_STYLE_GRAY:"background:#EBEBEB|",// 灰色背景
		SYSTEM_THEME_HEADER_STYLE_GRAY:"index-head-bg-gray",// header背景样式
		SYSTEM_THEME_MENU_STYLE_GRAY:"ocrm-toolbar-gray",// 主菜单背景样式
		SYSTEM_THEME_CALENDAR_STYLE_GRAY:"calendar_header_small_gray",// 日历控件背景样式
		// 系统主题-黑色
		SYSTEM_THEME_CODE_ACCESS:'access',// 黑色世界
		SYSTEM_THEME_NAME_ACCESS:'黑色世界',// 黑色世界
		SYSTEM_THEME_PANEL_BODY_STYLE_ACCESS:"background:#3C4052|",// 黑色背景
		SYSTEM_THEME_HEADER_STYLE_ACCESS:"index-head-bg-access",// header背景样式
		SYSTEM_THEME_CALENDAR_STYLE_ACCESS:"calendar_header_small_access",// 日历控件背景样式

		SYSTEM_UNLOCK_TRY_COUNT:3,
		NODE_MARKCENTER_MSGCODE:"168300001",// 机构级别[总行]//已替换 
		NODE_MARK_NODE_MSGCODE:"168300004",//机构级别[网点]//已替换 
		// 解锁重试次数
		/**
		 * ********************added by DuanYong end
		 * *****************************
		 */
		/******************* 周艳花  start ******************************/
	    CORP_TAX_TYPE:"CorpTaxTypeEnum",// 税种
	    CORP_RELATION_TYPE:"CorpRelationTypeEnum",//关系类型
	    CORP_ATTENDANCE:"CorpAttendanceEnum",//出勤情况
	    // 客户经理等级
	 	ACCOUNTMANAGERLEVEL_CATEGORY:"CorpCustomerManagerLevelEnum",
		/******************* 周艳花  end ******************************/
	    /******************* 联系状态 start ******************************/
	    VIP2_VipContactStatus_CATEGORY:"ContactStatus", // 联系计划状态
	 VIP2_VipContactStatus_NOTCLOSE:"171400001", // 联系中//已替换 
	 VIP2_VipContactStatus_CLOSE:"171400002", // 已完成//已替换 
	 /******************* 联系状态  end ******************************/
        /**对公中间业务start**/
	    //投行产品类型
	    TYPE_INVESTBANK_CATEGORY:"CorpInvestBankProductTypeEnum",
        //投行产品细分类型
		TYPE_INVESTBANK_1:"198700001",//198700001	银行理财产品//已替换 
		TYPE_INVESTBANK_2:"198700002",//198700002	信托公司产品//已替换 
		TYPE_INVESTBANK_3:"198700003",//198700003	股权基金//已替换 
		TYPE_INVESTBANK_4:"198700004",//198700004	信托融资顾问//已替换 
		TYPE_INVESTBANK_5:"198700005",//198700005	股权融资顾问//已替换 
		TYPE_INVESTBANK_6:"198700006",//198700006	并购重组顾问//已替换 
		//产品性质
		INVESTBANK_PRODUCTPROPERTY_CATEGORY:"CorpFinanceProductPropertyEnum",
		//支付方式
		INVESTBANK_PAYMOD_CATEGORY:"CorpInvestBankPayTypeEnum",
		//产品状态
		INVESTBANK_STATUS_GATEGORY:"CorpInvestBankStatusEnum",
	  /**对公中间业务end**/
	    /**对公客户融资信息 start**/
	   FINANCEOTHER_NAME_CATEGORY:"CorpFinanceOtherNameEnum",//其他融资名称
       /**对公客户融资信息 end**/
	   
	   /***龙川**/
		   /*对私客户经理类型*/
		   EMPPERSONTYPE_CODE_1:"195300001",//已替换 
		   EMPPERSONTYPE_CODE_2:"195300002",//已替换 
		   CUSTOMERBELONGORGAN_CODE_1:"187300001",//已替换 
		   CUSTOMERBELONGORGAN_CODE_2:"187300002",//已替换 
		   VIP2_VipApproveType_UP:"190400002",//已替换 
		   BELONGTYPE_CATEGORY:"EmpPersonTypeEnum",
		   BelongStatus_CODE_1:"1006100000",//主办
		   BelongStatus_CODE_2:"1006100001",//协办
		   BelongStatus_CODE_3:"1006100002",//代理
		   ORGANSCOPEENUM_CATEGORY:"OrganScopeEnum",
		   AUMTYPEENUM_CATEGORY:"AUMTypeEnum",
		   MANAGERNAME_CODE_1:"主办客户经理",
		   MANAGERNAME_CODE_2:"协办客户经理",
		/*   CUSTOMERPROENUM_CATEGORY:"CUSTOMERPROENUM",
		   CUSTOMERPROENUM_CODE_1:"",
		   CUSTOMERPROENUM_CODE_2:"",
		   CUSTOMERPROENUM_CODE_3:"",
		   CUSTOMERPROENUM_CODE_4:"",
		   CUSTOMERPROENUM_CODE_5:"",*/
		   
		   //去掉他行资产类型类型的多余标准数据 
		   OTHER_BANK_DEPOSIT:'185600001',  //他行资产--存款//已替换 
		   OTHER_BANK_FINANCING:'185600002',//他行资产--融资//已替换 
		   OTHER_BANK_MIDDLE :'185600003',//他行资产--中间业务//已替换 
		   
		     	   	   //用户角色代码
	   USER_ROLE_CUS_MANAGER:'PSNRMPort',//客户经理
	   USER_ROLE_ACCOUNT_MANAGER:'PSNManagerPort', //客户经理主管
	   USER_ROLE_SYSTEM_MANAGER:'SYSManagerPort', //系统管理员
	   
	   //对私他行资产类型
	   OTHER_BANK_ASSETS_PERSON:'CorpOtherBankAssetsTypeEnum', //他行资产类型（对私）category
	   HOLD_STATUS_HOLD:'199400001',//理财产品持有状态--持有//已替换 
	   HOLD_STATUS_NOHOLD:'199400002',//理财产品持有状态--已兑付//已替换 
	   /***end龙川end**/
	   SYSTEM_CURRENT_STYLE_DESKTOP:'desktop',//桌面风格

	   //小数右对齐
	   SYSTEM_COMMON_GRID_MUST_ALIGN_RIGHT_HEADER_KEY:'AUM,存款,余额,金额,比例,利率,币,支出,收入,资本,基金,理财产品',//需要右对齐的标题关键字
	//系统小角色标准码 add by 冉辉
	   ROLE_TYPE_PERSON_SYS_MANAGER_CODE:'9001010100',//对私系统管理员
	   ROLE_TYPE_PERSON_BEST_CUST_MANAGER_CODE:'9001010200',//对私高级主管
	   ROLE_TYPE_PERSON_CUST_BUSSINS_MANAGER_CODE:'9001010201',//对私业务主管
	   ROLE_TYPE_PERSON_CUST_MANAGER_CODE:'9001010300',//对私客户经理
	   ROLE_TYPE_CORPORATE_SYS_MANAGER_CODE:'9001020100',//对公系统管理员
	   ROLE_TYPE_CORPORATE_BEST_CUST_MANAGER_CODE:'9001020200',//对公高级主管
	   ROLE_TYPE_CORPORATE_CUST_BUSSINS_MANAGER_CODE:'9001020201',//对公业务主管
	   ROLE_TYPE_CORPORATE_CUST_MANAGER_CODE:'9001020300',// 对公客户经理
	   CORP_EXT_CUS_TYPE_CATEGORY:'CorpExtCusTypeEnum',// 对公潜在客户类型category
	   CORP_CAMP_TAK_CATEGORY:'CorpCampTaskstatus',// 对公营销任务状态category
	   CORP_CAMP_TASK_COMPLETE:"203100004",//已替换 
	   //性别标准码
		SYS_USER_SEX_MAN:'107200002',
		SYS_USER_SEX_MEN:'107200003',
		//短信提醒模板
		MSG_TYPE_REMIND_PUBLIC :'203400001',	//通用提醒短信模板//已替换 
		MSG_TYPE_REMIND_LARGE_CHANGE:'203400002',	//大额变动短信模板//已替换 
		MSG_TYPE_REMIND_SHIFT:'203400003',	//客户转移短信模板//已替换 
		MSG_TYPE_REMIND_RISK:'203400004',	//风险提醒短信模板//已替换 
		MSG_TYPE_REMIND_END_PRODUCT:'203400005',	//产品到期短信模板//已替换 
		MSG_TYPE_REMIND_IMPORT_DATE:'203400006',	//重要日期短信模板//已替换 
		MSG_TYPE_REMIND_MARKETING:'203400007',	//营销提醒短信模板//已替换 
		MSG_TYPE_REMIND_LEVEL_CHANGE:'203400008',	//等级变化短信模板//已替换 
		MSG_TYPE_REMIND_THEMED_EVENTS:'203400009',	//主题活动短信模板//已替换 
		MSG_TYPE_REMIND_LARGE_MSGDATA:'203400010',//大批量短信模板//已替换 
		VIP_VIPCONTACTWAY_OTHER:'106700017',//其他2//已替换 
		VIP_VIPCONTACTWAY_FIX:'118800029',//传真信息//已替换 
		VIP_VIPCONTACTWAY_MOVECONTACT1:'118800030',//移动联系信息1//已替换 
		VIP_VIPCONTACTWAY_WORKADDREE:'118800021',//办公地址//已替换 
		VIP_VIPCONTACTWAY_POST:'106700020',//邮寄//已替换 
		VIP_VIPCONTACTWAY_OTHER3:'106700021',//其他3//已替换 
		VIP_VIPCONTACTWAY_MOBILITY:'118800023',//营业地址//已替换 
		VIP_VIPCONTACTWAY_MOVECONTACT2:'118800030',//移动联系信息2//已替换 
		VIP_VIPCONTACTWAY_MAIL:'118800033',//电子邮箱信息//已替换 
		VIP_VIPCONTACTWAY_UNITADDREE:'118800019',//单位联系地址//已替换 
		VIP_VIPCONTACTWAY_HOMEADRE:'118800006',//家庭联系地址//已替换 
		CUS_PSNSOURE_CODE_1:"184700003",//客户来源（对私），公私联动//已替换 
		
		CORP_MENBER_LOAN:"184700003",//对公客户成员会员制贷款//已替换 
		// ***************add by zhaoyz for score**begin***********
		//积分计算方式
		EASYSCORE_COMPUTER_WAY_CATEGORY :'EASYCOMPUTERWAY',//计算方式
		EASYSCORE_COMPUTER_WAY_CODE_FSE:'203700001',//发生额//已替换 
		EASYSCORE_COMPUTER_WAY_CODE_YRJ:'203700002',//月日均//已替换 
		EASYSCORE_COMPUTER_WAY_CODE_JRJ:'203700003',//季日均//已替换 
		EASYSCORE_COMPUTER_WAY_CODE_NRJ:'203700004',//年日均//已替换 
		//计算周期
		EASYSCORE_COMPUTER_CYCLE_CATEGORY :'EASYCOMPUTERCYCLE',//计算周期
		EASYSCORE_COMPUTER_CYCLE_CODE_FSE:'204000001',//实时//已替换 
		EASYSCORE_COMPUTER_CYCLE_CODE_YRJ:'104400003',//月//已替换 
		EASYSCORE_COMPUTER_CYCLE_CODE_JRJ:'104400004',//季//已替换 
		////积分规则状态,礼品状态
		EASYSCORE_STATUS_CATEGORY:"EASYSCORESTATUS",
		EASYSCORE_STATUS_CODE_YX:"109800001",//有效//已替换 
		EASYSCORE_STATUS_CODE_WX:"109800002",//无效//已替换 
		//积分规则类型
		EASYSCORE_RULES_CATEGORY:"EASYSCORERULESTYPE",// 规则类型
		EASYSCORE_RULES_CODE_EXCHANGE:"203600008",// 兑换规则//已替换 
		EASYSCORE_RULES_CODE_COMPUTER:"203600009",// 计算规则//已替换 
		//对公客户归属关系
		CORP_CUSTOMER_RELATION_ZKHJL:"195300001",//主客户经理
		CORP_CUSTOMER_RELATION_XDKHJL:"195300002",//小贷客户经理
		CORP_CUSTOMER_RELATION_DLKHJL:"195300003",//代理客户经理
		CORP_CUSTOMER_RELATION_XBKHJL:"195300004",//协办客户经理
		// ***************add by zhaoyz for score**end***********
		HOLDSTATUS_FINCAL:"199400001",//理财产品，持有
		MENU_SOUCE_TYPE_CODE:"172700003"// 选项卡式菜单资源
	}

});
