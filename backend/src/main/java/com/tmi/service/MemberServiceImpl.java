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
    public Member signUp(Member member) throws Exception {
        boolean temp = memberRepository.existsByMemberid(member.getMemberid());
        System.out.println(temp);
        return null;
    }

    @Override
    public Member login(Member member) throws Exception {
        boolean temp = memberRepository.existsByMemberidAndMemberpw(member.getMemberid(), member.getMemberpw());
        System.out.println("login test : " + temp);
        return null;
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
