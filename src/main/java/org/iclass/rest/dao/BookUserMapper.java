package org.iclass.rest.dao;

import org.apache.ibatis.annotations.Mapper;
import org.iclass.rest.dto.BookUser;

import java.util.List;
import java.util.Map;

@Mapper
public interface BookUserMapper {

    BookUser login(Map<String, String> map);
    BookUser selectOne(String id);
    int isExist(String id);
    int insert(BookUser bookUser);
    int changeEmail(Map<String, String> map);

    int delete(String id);
    int changeBirth(Map<String, String> map);
    int changePassword(Map<String, String> map);
    List<BookUser> selectAll();

}
