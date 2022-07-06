package com.tmi;

import com.tmi.dto.User;
import com.tmi.repository.UserRepository;
//import org.h2.util.TempFileDeleter;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


//@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest // H2 DB를 자동으로 실행해준다
public class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

//    @AfterAll // junit에서 단위 테스트가 끝날 때마다 수행되는 메소드
//    // 전체 테스트를 수행할 때 테스트간 데이터 침범을 막기 위해 사용한다
//    // 여러 테스트가 동시에 수행되면 테스트용 DB인 H2에 데이터가 그대로 남아 있어 다음 테스트가 실패할 수 있다.
//    public void cleanup(){
//        userRepository.deleteAll();
//    }
    
    @Test
    public void save_road(){
//        String test_id = "테스트 아이디";
//        String test_pw = "테스트 비밀번호";
//        String test_email = "테스트 이메일";
//
//        userRepository.save(User.builder() // 테이블 ...에 insert/update 쿼리를 실행
//                .userid(test_id) // idx값이 있다면 update, 없다면 insert 쿼리가 실행된다.
//                .userpw(test_pw)
//                .email(test_email)
//                .build());
//
//        // when
//        List<User> userList = userRepository.findAll(); // 테이블에 있는 모든 데이터를 조회해오는 메소드
//
//        // then
//        User user = userList.get(0);
//        assertThat(user.getUserid()).isEqualTo(test_id);
//        assertThat(user.getUserpw()).isEqualTo(test_pw);
//        assertThat(user.getEmail()).isEqualTo(test_email);
    } // https://velog.io/@swchoi0329/Spring-Boot%EC%97%90%EC%84%9C-JPA-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
    // hibernate 문법 오류 해결이 필요하다
}
