package sape.server.crud.event.service;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sape.server.core.criteria.CriteriaFactory;
import sape.server.model.event.EventEntity;

/**
 * Servi�o de consulta de atividades.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class EventQueryService {

    @Autowired
    private CriteriaFactory criteriaFactory;

    @Transactional(readOnly = true)
    public List<EventEntity> getEventByName(String name) {
        Criteria q = criteriaFactory.createCriteria(EventEntity.class);
        q.add(Restrictions.like(EventEntity.DESCRIPTION, name, MatchMode.ANYWHERE));
        return q.list();
    }
}