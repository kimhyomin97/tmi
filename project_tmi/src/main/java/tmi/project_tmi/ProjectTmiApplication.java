package tmi.project_tmi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.GetMapping;
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

		String accessKey = ""
	}
}
