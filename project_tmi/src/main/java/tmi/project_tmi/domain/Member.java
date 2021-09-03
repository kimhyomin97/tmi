package tmi.project_tmi.domain;

public class Member {
    private Long id;    // 시스템이 저장하는 임의 값
    private String name;

    // Alt + insert 하면 getter setter 자동으로 만들어줌
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
