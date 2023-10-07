package org.iclass.rest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import lombok.RequiredArgsConstructor;
import org.iclass.rest.dao.BookUserMapper;
import org.iclass.rest.dto.BookUser;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

import javax.validation.Valid;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api")
public class BookUserApiController {

	private final BookUserMapper bookUserMapper;

	@GetMapping("/admin")
	public List<BookUser> members() {
		List<BookUser> list = bookUserMapper.selectAll();
		
		return list;
	}
	
	@GetMapping("/bookuser/{id}")
	public BookUser bookuser(@PathVariable String id) {
		BookUser bookUser = bookUserMapper.selectOne(id);
		if (bookUser==null) throw new NoSuchElementException();
		return bookUser;
	}

	@GetMapping("/bookuser/is/{id}")
	public Map<String, Boolean> isExist(@PathVariable String id) {
		int count = bookUserMapper.isExist(id);
		Map<String, Boolean> resultMap = new HashMap<>();
		resultMap.put("isExist", (count==1));

		return resultMap;
	}

	@PostMapping("/bookuser")
	public Map<String,Integer> save(@RequestBody @Valid BookUser bookUser)  {
		log.info(">>>>>>> request body : {}",bookUser);
		bookUser.setSubjectStr();
		int count = bookUserMapper.insert(bookUser);
		Map<String, Integer> resultMap = new HashMap<>();
		resultMap.put("count", count);

		return resultMap;
	}

	@PatchMapping("/email/{id}")
	public Map<String,Integer> chageEmail(@PathVariable String id,@RequestBody Map<String,String> map) {
		map.put("id",id);		//경로 변수값 id 를 Map 의 id 와 일치시키기
		int count = bookUserMapper.changeEmail(map);
		if(count==0) throw new NoSuchElementException();
		log.info("id count :{}",count);
		Map<String, Integer> resultMap = new HashMap<>();
		resultMap.put("count", count);

		return resultMap;
	}

	@DeleteMapping("/bookuser/{id}")
	public Map<String,Integer> delete(@PathVariable String id) {
		int count = bookUserMapper.delete(id);
		Map<String, Integer> resultMap = new HashMap<>();
		resultMap.put("count", count);

		return resultMap;
	}
	
	
	
	
	
}
