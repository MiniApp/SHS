package im.shs.base.security.util;

import java.util.ArrayList;
import java.util.List;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

public class QueryParse<T> {

    private Criterion getCondition(ConditionType condition) {

        if (condition != null) {
            int oper = condition.getIoperator();

            if (ConditionType.IOPER_EQ == oper) {
                return Restrictions.eq(condition.getName(), condition.getValue());

            } else if (ConditionType.IOPER_NE == oper) {
                return Restrictions.ne(condition.getName(), condition.getValue());

            } else if (ConditionType.IOPER_GE == oper) {
                return Restrictions.ge(condition.getName(), condition.getValue());

            } else if (ConditionType.IOPER_GT == oper) {
                return Restrictions.gt(condition.getName(), condition.getValue());

            } else if (ConditionType.IOPER_LE == oper) {
                return Restrictions.le(condition.getName(), condition.getValue());

            } else if (ConditionType.IOPER_LT == oper) {
                return Restrictions.lt(condition.getName(), condition.getValue());

            } else if (ConditionType.IOPER_NULL == oper) {
                return Restrictions.isNull(condition.getName());

            } else if (ConditionType.IOPER_NONULL == oper) {
                return Restrictions.isNotNull(condition.getName());

            } else if (ConditionType.IOPER_LIKE == oper) {
                return Restrictions.like(condition.getName(), condition.getValue().toString(), MatchMode.START);

            } else if (ConditionType.IOPER_IN == oper) {
                return Restrictions.in(condition.getName(), condition.getValues());

            }
        }
        return null;
    }

    List<ConditionType> conditions = new ArrayList<ConditionType>();

    public List<Criterion> criterion() {

        List<Criterion> criterions = new ArrayList<Criterion>();
        int length = this.conditions.size();
        for (int i = 0; i < length; i++) {
            ConditionType cond = this.conditions.get(i);
            if (cond.getLinkType() != ConditionType.LINK_OR) {

                criterions.add(getCondition(cond));
            } else {

                Criterion tCriterion = null;
                Disjunction dj = Restrictions.disjunction();
                List<ConditionType> ors = cond.getConditions();
                for (int j = 0; j < ors.size(); j++) {
                    tCriterion = dj.add(getCondition(ors.get(j)));
                }
                if (tCriterion != null) {
                    criterions.add(tCriterion);
                }
            }
        }

        return criterions;
    }

    public QueryParse add(ConditionType condition) {
        this.conditions.add(condition);
        return this;
    }

    private OrderObj order;

    public QueryParse addOrder(OrderObj order) {
        this.order = order;
        return this;
    }

    public OrderObj getOrder() {
        return order;
    }

    public void setOrder(OrderObj order) {
        this.order = order;
    }

    private PageModel<T> pageModel;

    public PageModel<T> getPageModel() {
        return pageModel;
    }

    public void setPageModel(PageModel<T> pageModel) {
        this.pageModel = pageModel;
    }

    @SuppressWarnings("unchecked")
    public QueryParse addFetch(int pageNo, int pageSize) {
        this.pageModel = new PageModel(pageNo, pageSize);
        return this;
    }

}
