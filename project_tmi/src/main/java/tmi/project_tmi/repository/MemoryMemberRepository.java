package tmi.project_tmi.repository;

import tmi.project_tmi.domain.Member;

import java.util.*;

public class MemoryMemberRepository implements MemberRepository {

    private static Map<Long, Member> store = new HashMap<>(); // 실무에서는 동시성문제 때문에 공유되는 변수일때는 컨커런트 해쉬맵을 써야된다 (하지만 예제니깐 단순한 해시맵 사용해본다)
    private static long sequence = 0L;
    // sequnece는 0,1,2 key값을 생성해준다.
    // 마찬가지로 실무에서는 동시성문제 때문에 어톰롱을 고려해야 된다

    @Override
    public Member save(Member member) {
        member.setId(++sequence);
        // store에 넣기 전에 id값 세팅해준다.
        store.put(member.getId(), member);
        // store에 저장해준다 (Map에 저장된다)
        return member;
    }

    @Override
    public Optional<Member> findById(Long id) {
        return Optional.ofNullable(store.get(id));
        // Optional.ofNullable은 값이 null값일수도 있으니 대처하는 것
        // js에서 옵셔널체이닝과 비슷한 기능
    }

    @Override
    public Optional<Member> findByName(String name) {
        // 자바 문법 람다와 스트림 사용한다 (스트림은 루프로 돌려준다)
        return store.values().stream()
                .filter(member -> member.getName().equals(name)) // 멤버의 getName이 파라미터로 넘어온 name이랑 같은지 확인한다 // 같은 경우에만 필터링이 된다
                .findAny(); // 찾으면 반환한다. (findAny는 하나라도 반환한다) // 끝까지 찾아도 없으면 null 반환
    }

    @Override
    public List<Member> findAll() {
        // Map인데 반환은 List로 반환된다 (자바에서는 List많이 쓴다)
        return new ArrayList<>(store.values()); // 멤버들이 쭉 반환된다
    }
    // 잘 동작하는지 확인하는건 테스트케이스 작성하는것


    public void clearStore(){
        store.clear();
        // 스토어를 싹 비워준다.
    }
}
