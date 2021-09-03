package tmi.project_tmi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {
    @GetMapping("hello")
    public String hello(Model model){
        model.addAttribute("data","hello!!");
        return "hello";
    }

    @GetMapping("hello-mvc")
    public String helloMvc(@RequestParam("name") String name, Model model) {
//        http get방식에서 url에 ?로 값을 넘겨줄 수 있다 (안넘겨주면 오류가 나온다)
        model.addAttribute("name", name);
        return "hello-template";
    }

    @GetMapping("hello-string")
    @ResponseBody // body부분에 내용을 직접 넣어주겠다
    public String helloString(@RequestParam("name") String name){
        return "hello " + name;
    }

    @GetMapping("hello-api")
    @ResponseBody
    public Hello helloApi(@RequestParam("name") String name){
        Hello hello = new Hello();
        hello.setName(name);
        return hello; // 객체(클래스)를 리턴한다 // json방식
    }

    static class Hello{
        private String name;

        public String getName(){
            // getter setter
            // name이 private로 선언되었기 때문에
            // 외부에서 바로 꺼낼수 없다.
            // 그래서, 메소드로 접근을 해야된다
            // 이게 자바 Bean 표준 방식이라고도 하고, getter setter라고도 한다
            // 프로퍼티 접근 방식이라고도 한다.
            return name;
        }
        public void setName(String name){
            this.name = name;
        }
    }
}
