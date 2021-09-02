package tmi.project_tmi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@RestController
public class ProjectTmiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectTmiApplication.class, args);
	}
	@GetMapping("/home")
	public String hello(){
		return "이건 REACT, Spring 연동 테스트.";
	}

	@GetMapping("/wordtest")
	public String word() {
		String openApiURL = "http://aiopen.etri.re.kr:8000/WiseNLU";
		return "hello this is test";
	}

//	@GetMapping("/hello-string")
//	@ResponseBody // HTTP에 head와 body중 body부분을 직접 넣어주겠다
//	public String helloString(@RequestParam("name") String name){
//		return "hello " + name; // "hello spring" 문자가 그대로 내려간다
//	}
}
