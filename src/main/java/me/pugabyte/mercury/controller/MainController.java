package me.pugabyte.mercury.controller;

import eden.models.punishments.PunishmentType;
import eden.models.punishments.PunishmentsService;
import eden.utils.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

@Controller
public class MainController {

	@GetMapping
	public String home() {
		return "index";
	}

	@GetMapping("error")
	public String error(HttpServletRequest request, Model model) {
		Object errorMessage = request.getAttribute(RequestDispatcher.ERROR_MESSAGE);
		model.addAttribute("errorMessage", errorMessage);
		return "error";
	}

}
