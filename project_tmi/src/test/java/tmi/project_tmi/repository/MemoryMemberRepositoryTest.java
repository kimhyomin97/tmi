package tmi.project_tmi.repository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import tmi.project_tmi.domain.Member;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class MemoryMemberRepositoryTest {
    // TDD -
    MemoryMemberRepository repository = new MemoryMemberRepository();

    // 테스트가 끝날때마다 repository를 지워주는 코드
    @AfterEach // 메소드가 실행이 끝날때마다 동작한다 (일종의 콜백 메시지)
    public void afterEach(){
        repository.clearStore(); // 이렇게 해주면 순서와 상관없어진다.
    }

    @Test
    public void save(){
        Member member = new Member();
        member.setName("spring");

        repository.save(member);

        Member result = repository.findById(member.getId()).get();
        // 옵셔널에서 꺼낼때에는 get으로 꺼낸다 (좋은 방법은 아니지만 테스트에서는 그냥 사용)
//        System.out.println("result = " + (result == member));
//        Assertions.assertEquals(member, result);
        org.assertj.core.api.Assertions.assertThat(member).isEqualTo(result);
    }

    @Test
    public void findByName(){
        Member member1 = new Member();
        member1.setName("spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("spring2");
        repository.save(member2);

        Member result = repository.findByName("spring1").get();
        // spring2와 비교하면 에러가 뜬다
        assertThat(result).isEqualTo(member1);
    }

    @Test
    public void findAll(){
        Member member1 = new Member();
        member1.setName("spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("spring2");
        repository.save(member2);

        List<Member> result = repository.findAll();

        assertThat(result.size()).isEqualTo(2);
    }
    // 모든 테스트는 순서가 보장되지 않는다
    // 따라서 순서에 의존적으로 설계하면 안된다
    // findAll에서 save가 되어버리니깐 문제가 발생
    // 테스트가 하나 끝나면 데이터를 클리어해줘야 된다
}
