package tmi.project_tmi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FoodListController {
    @GetMapping("getfoodlist")
    public void hello(Model model){

        System.out.println("HELLO");
    }
}
