package tmi.project_tmi.repository;

import tmi.project_tmi.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    Member save(Member member); // 회원이 저장소에 저장된다
    Optional<Member> findById(Long id); // 저장소에서 찾아온다
    Optional<Member> findByName(String name);
    List<Member> findAll(); // 모든 회원 리스트를 찾아준다

}
