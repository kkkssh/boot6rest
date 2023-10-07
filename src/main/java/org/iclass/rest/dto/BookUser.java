package org.iclass.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Arrays;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BookUser {

	@Pattern(regexp = "^[a-zA-Z][a-zA-Z0-9._]{4,12}$",message = "아이디: 첫글자 영문,숫자와 기호 ._ 포함 6~12 글자로 하세요.")
	private String id;

	@Pattern(regexp = "^[a-zA-Z가-힣]{2,}$",message = "이름: 영대소문자와 한글만 가능 2글자 이상으로 하세요.")
	private String name;

	@Pattern(regexp = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})?$"
			,message = "이메일: 작성규칙이 올바르지 않습니다.")
	private String email;

	@Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$",message = "YYYY-MM-DD 형식으로 입력하세요.")
	private String birth;

	@Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[`~!@#$%^&*()-_=+]).{8,24}$"
			,message = "패스워드: 영문자,기호,숫자를 반드시 1개 포함하여 8~24 글자로 하세요.")
	private String password;

	private String[] subjects;
	private String subjectStr;
	public void setSubjectStr() {
		this.subjectStr = Arrays.toString(this.subjects);
	}
}
//테이블의 컬럼 변경 : 1) birth 컬럼 추가 2) id 컬럼을 pk 로 설정 3)email 컬럼은 unique 4)subject - 관심분야 컬럼 추가
