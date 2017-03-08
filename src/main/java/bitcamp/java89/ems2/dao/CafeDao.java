package bitcamp.java89.ems2.dao;

import java.util.ArrayList;

import bitcamp.java89.ems2.domain.Cafe;
import bitcamp.java89.ems2.domain.Event;

public interface CafeDao {
  ArrayList<Event> getList() throws Exception;
  int insert(Cafe cafe) throws Exception;
  Cafe getOne(int cafeMemberNo) throws Exception;
  int update(Cafe cafe) throws Exception;
}
