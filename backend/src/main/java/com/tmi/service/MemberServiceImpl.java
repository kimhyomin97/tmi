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
        return memberRepository.existsByMemberid(member.getMemberid());
    }

    @Override
    public boolean login(Member member) throws Exception {
        return memberRepository.existsByMemberidAndMemberpw(member.getMemberid(), member.getMemberpw());
    }

    @Override
    public Member updateMember(Member member) throws Exception {
        return null;
    }

    @Override
    public Member deleteMember(Member member) throws Exception {
        return null;
    }
}
