package bitcamp.java89.ems2.dao;

import java.util.List;
import java.util.Map;

import bitcamp.java89.ems2.domain.CustomCard;

public interface CustomCardDao {
  List<CustomCard> getStampList(Map<String, Object> paramMap) throws Exception;
  List<CustomCard> getStampListByName(Map<String, Object> paramMap) throws Exception;
  List<CustomCard> getStampListByTel(Map<String, Object> paramMap) throws Exception;
  
  int getStampCount(Map<String, Object> paramMap) throws Exception;
  int getStampCountByKeyword(Map<String, Object> paramMap) throws Exception;
  
  List<CustomCard> getCustomDetail(Map<String, Object> paramMap) throws Exception;
  
  List<CustomCard> getList(Map<String, Object> paramMap) throws Exception;
  List<CustomCard> getListSelect(Map<String, Object> paramMap) throws Exception;
  int countAll(int cafeMemberNo) throws Exception;
  
  List<CustomCard> getCustomCardDetail(Map<String, Object> paramMap) throws Exception;
  List<CustomCard> getCardDetail(Map<String, Object> paramMap) throws Exception;
  int insert(Map<String, Object> paramMap) throws Exception;
  int getStampCafeCardNo(int cafeMemberNo) throws Exception;
  
  int insertStamp(Map<String, Object> paramMap) throws Exception;
  
  void updatePlusMcuse(int currentCustomCardNo) throws Exception;
  void updateMinusMcuse(int usedCustomCardNo) throws Exception;
  
  int getMyCardCount(int customMemberNo) throws Exception;
  int getMyCardNo(int customMemberNo) throws Exception;
  int getCafeNo(int customCardNo) throws Exception;
  
  List<CustomCard> getStampNo(int customCardNo) throws Exception; 
  
}
