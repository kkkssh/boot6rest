package org.iclass.rest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.iclass.rest.dao.BookUserMapper;
import org.iclass.rest.dto.BookUser;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;

import javax.validation.Valid;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api")
public class BookUserApiController {

	private final BookUserMapper bookUserMapper;

	@GetMapping("/admin/bookusers")
	public List<BookUser> members() {
		List<BookUser> list = bookUserMapper.selectAll();

		return list;
	}

	// 요청에는 헤더와 바디가 있습니다. @RequestBody는 bookUser 가 요청의 바디라고 알려줍니다.
	// -> 클라이언트가 보낸 json 문자열을 자바 객체로 자동 변환 (역직렬화)
	@PostMapping("/bookuser")
	public Map<String,Integer> save(@RequestBody @Valid BookUser bookUser){
		log.info(">>>>>>> request body : {}", bookUser);

		int count = bookUserMapper.insert(bookUser);
		Map<String,Integer> resultMap = new HashMap<>();   // 처리 결과를 응답하기 위한 Map
		resultMap.put("count",count);

		return resultMap;
	}

	@GetMapping("/bookuser/{id}")
	public BookUser selectOne(@PathVariable String id){
		BookUser bookUser = bookUserMapper.selectOne(id);

		log.info(">>>>>>> path variable id : {}",id);

		return bookUser;   // bookUser DTO 를 json 문자열로 변환시켜 전달합니다. (직렬화)
	}

	@DeleteMapping("/bookuser/{id}")
	public int delete(@PathVariable String id){

		int count = bookUserMapper.delete(id);

		log.info(">>>>>> path variable id : {}", id);

		return count;
	}

   /* 이것도 가능
   @DeleteMapping("/bookuser/{id}")

   public Map<String,Integer>  delete(@PathVariable String id){

      int count = bookUserMapper.delete(id);

      Map<String,Integer> resultMap = new HashMap<>();   // 처리 결과를 응답하기 위한 Map
      resultMap.put("count",count);

      log.info(">>>>>> path variable id : {}", id);

      return resultMap;
   }*/

}