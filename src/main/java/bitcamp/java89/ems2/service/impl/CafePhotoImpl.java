package bitcamp.java89.ems2.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java89.ems2.dao.CafePhotoDao;
import bitcamp.java89.ems2.domain.CafePhoto;
import bitcamp.java89.ems2.service.CafePhotoService;

@Service
public class CafePhotoImpl implements CafePhotoService {
  @Autowired CafePhotoDao cafePhotoDao;

  @Override
  public int add(CafePhoto cafePhoto) throws Exception {
    return cafePhotoDao.insert(cafePhoto);
  }
  
  public CafePhoto detailCafePhoto(int cafeNo) throws Exception {
  	return cafePhotoDao.getOne(cafeNo);
  }
}
















