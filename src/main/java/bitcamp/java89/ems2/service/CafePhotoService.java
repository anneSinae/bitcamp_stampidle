package bitcamp.java89.ems2.service;

import java.util.List;

import bitcamp.java89.ems2.domain.CafePhoto;

public interface CafePhotoService {
	 int add(CafePhoto cafePhoto) throws Exception;
	 List<CafePhoto> detailCafePhoto(int cafeMemberNo) throws Exception;
	 int update(CafePhoto cafePhoto) throws Exception;
}
















