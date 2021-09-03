package tmi.project_tmi.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import tmi.project_tmi.domain.Member;
import tmi.project_tmi.repository.MemoryMemberRepository;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

class MemberServiceTest {

//    MemberService memberService = new MemberService();
//    MemoryMemberRepository memberRepository = new MemoryMemberRepository();
    MemberService memberService;
    MemoryMemberRepository memberRepository;

    @BeforeEach
    public void beforeEach(){
        memberRepository = new MemoryMemberRepository();
        memberService = new MemberService(memberRepository);
    }

    @AfterEach
    public void afterEach(){
        memberRepository.clearStore();
    }

    @Test
    void 회원가입() {
        // 테스트는 이름을 한글로 바꿔도 된다.

        // 추천하는 문법! (처음에는 이런 패턴의 주석을 쓰는걸 추천한다)
        //given - 이런 상황이 주어졌을 때
        Member member = new Member();
        member.setName("hello");
        //when - 이걸 실행했을 때
        Long saveId = memberService.join(member);

        //then - 뭔가가 나와야된다!
        Member findMember = memberService.findOne(saveId).get();
        assertThat(member.getName()).isEqualTo(findMember.getName());
    } // 너무 단순하다?

    @Test // 정상플로우도 중요하지만, 예외플로우도 중요하다
    public void 중복_회원_예외(){
        // given
        Member member1 = new Member();
        member1.setName("spring");

        Member member2 = new Member();
        member2.setName("spring");

        // when
        memberService.join(member1);
        IllegalStateException e = assertThrows(IllegalStateException.class, () -> memberService.join(member2));// try catch를 사용하지 않는 방법
//        assertThrows(NullPointerException.class, () -> memberService.join(member2));
        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
/*
        try{
            memberService.join(member2);
            fail(); // 여기까지 오면 실패한거다
        } catch(IllegalStateException e){
            // 여기는 예외가 터져서 정상적으로 성공한것?
            assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
        }
*/

//        memberService.join(member2); // 한번 더 조인했을 때 이름이 똑같으면 예외가 터져야된다

        // then

    }

    @Test
    void findMembers() {
    }

    @Test
    void findOne() {
    }
}