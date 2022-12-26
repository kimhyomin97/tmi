package com.tmi.service;

import com.tmi.dto.Member;
import com.tmi.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService{

    @Autowired
    MemberRepository memberRepository;

    @Override
    public boolean signUp(Member member) throws Exception {
        // salt 값을 랜덤으로 생성해서 sha-256 알고리즘으로 비밀번호 암호화 저장하는 로직 추가

        return memberRepository.existsByMemberid(member.getMemberid());
    }

    @Override
    public boolean login(Member member) throws Exception {
        // 입력한 비밀번호를 테이블에 저장된 솔트값을 읽어와서 sha-256 알고리즘으로 암호화하여 유효성 검사를 하는 로직 추가
        // 유효성 검사는 추가 검색 필요

        return memberRepository.existsByMemberidAndMemberpw(member.getMemberid(), member.getMemberpw());
    }

    @Override
    public Member updateMember(Member member) throws Exception {
        // 회원정보 수정하는 부분
        return null;
    }

    @Override
    public Member deleteMember(Member member) throws Exception {
        // 회원정보 삭제 로직 -> 완료시 로그인까지 연결되야함
        return null;
    }
}
