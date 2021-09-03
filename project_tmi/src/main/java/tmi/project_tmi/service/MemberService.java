package tmi.project_tmi.service;

import tmi.project_tmi.domain.Member;
import tmi.project_tmi.repository.MemberRepository;
import tmi.project_tmi.repository.MemoryMemberRepository;

import java.util.List;
import java.util.Optional;

public class MemberService {

//    private final MemberRepository memberRepository = new MemoryMemberRepository();

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository){
        this.memberRepository = memberRepository;
        // 멤버 리파지토리를 직접 new해서 생성하는게 아니라
        // 외부에서 생성하도록 바꿔준다.
    } // DI : Dependency Injection (의존성 주입)

    /**
     * 회원 가입
     */
    public Long join(Member member){
        // 같은 이름이 있는 중복 회원은 안된다
//        Optional<Member> result = memberRepository.findByName(member.getName());
//        // member.getName()은 넘어온값
////        result.orElseGet() // 값이 있으면 꺼내고 없으면 어떠한 메소드를 실행해서 꺼낸다 (디폴트값을 넣어서 꺼낸다던가)
//        result.ifPresent(m -> {
//            // ifPresent는 null이 아니라 값이 있으면 동작을 한다.
//            // 옵셔널이기 때문에 가능하다 (기존에는 if(__ != null) 했겠지만)
//            // 옵셔널로 한번 감싸서 반환하면 null일때를 거를 수 있다.
//            throw new IllegalStateException("이미 존재하는 회원입니다.");
//        }); // 하지만 코드가 이쁘지 않아서 아래의 방식을 사용한다

        validateDuplicateMember(member); // 중복 회원 검증
        memberRepository.save(member); // 통과하면 저장
        return member.getId();
    }

    private void validateDuplicateMember(Member member) {
        memberRepository.findByName(member.getName())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                }); // 이런 경우에는 메소드로 뽑는게 좋다
    }

    public List<Member> findMembers(){
        // 전체 회원 조회하는것
        return memberRepository.findAll();
    }

    public Optional<Member> findOne(Long memberId){
        return memberRepository.findById(memberId);
    }

}
