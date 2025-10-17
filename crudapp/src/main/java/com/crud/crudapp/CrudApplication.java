package com.crud.crudapp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.ui.Model;
import com.database.crudApp;

import jakarta.servlet.http.HttpSession;

import com.database.Admin;
//import com.database.crudAppRepo;
import com.database.Services;
import com.database.adminRepo;

//import ch.qos.logback.core.model.Model;


@Controller
@SpringBootApplication(scanBasePackages = "com.database")
@EnableJpaRepositories("com.database")
@EntityScan("com.database")

public class CrudApplication {

	
	
	@GetMapping({"/","/Home"})
	public String Home(HttpSession session,
			Model model) {
		
		 if (session.getAttribute("accessDenied") != null) {
		        model.addAttribute("accessDenied", true);
		        session.removeAttribute("accessDenied"); // Clean it up
		    }

		
		return "Home.html";
		
	}
	@GetMapping("/AboutUs")
	public String aboutUs(HttpSession session) {
	    if (session.getAttribute("loggedInUser") == null) {
	        return "redirect:/Home";
	    }
	    return "aboutUs.html";
	}

	
	@Autowired
	private Services empService;
	
//	@PostMapping("/addEmp")
//	public String addEmp(@RequestParam("name") String name,
//            @RequestParam("gender") String gender,
//            @RequestParam("email") String email,
//            @RequestParam("age") int age,
//            @RequestParam("phone") String phone,
//            Model m) {
//
//// Create a new Employee object
//crudApp emp = new crudApp();
//emp.setName(name);
//emp.setGender(gender);
//emp.setEmail(email);
//emp.setAge(age);
//emp.setPhone(phone);
//
//// Save to the database
//empService.saveEmp(emp);
//
//m.addAttribute("emp",emp);
//System.out.print(emp);
//m.addAttribute("message", "Employee added successfully!");
//// Redirect or return view
//return "Home"; // assuming you want to go back to homepage
//}
//	 @GetMapping("/showEmp")
//	    public String viewEmployees(Model model) {
//	        List<crudApp> employees = empService.getAllEmp();
//	        model.addAttribute("employees", employees);
//	        
//	        
//	        System.out.println("Fetched Employees: " + employees.size());
//
//	        return "Home"; // or the name of your HTML file
//	        
//	 }
	
	// POST: Add employee
	@PostMapping("/addEmp")
	public String addEmp(@RequestParam("name") String name,
	                     @RequestParam("gender") String gender,
	                     @RequestParam("email") String email,
	                     @RequestParam("age") int age,
	                     @RequestParam("phone") String phone,
	                     RedirectAttributes redirectAttributes) {

	    // Create a new Employee object
	    crudApp emp = new crudApp();
	    emp.setName(name);
	    emp.setGender(gender);
	    emp.setEmail(email);
	    emp.setAge(age);
	    emp.setPhone(phone);

	    // Save to the database
	    empService.saveEmp(emp);

	    // Add flash message to show on redirected page
	    redirectAttributes.addFlashAttribute("message", "Employee added successfully!");

	    // Redirect to the GET method (avoid form re-submission)
	    return "redirect:/Emp";
	}

	// GET: Show employees
	@GetMapping("/Emp")
	public String viewEmployees(Model model,
			HttpSession session) {
		
		 if (session.getAttribute("loggedInUser") == null) {
		    	
		        return "redirect:/Home";
		    }

		
	    List<crudApp> employees = empService.getAllEmp();
	    model.addAttribute("employees", employees);

	    System.out.println("Fetched Employees: " + employees.size());

	    return "employees.html"; // this is your view (Home.html / Home.jsp etc.)
	}

	 
	 @GetMapping("/editEmp/{id}")
	 public String editEmployee(@PathVariable Long id, Model model) {
	     crudApp emp = empService.getEmpById(id);
	     model.addAttribute("employee", emp);
	     return "editEmp";  // new HTML page for editing
	 }
	 @PostMapping("/updateEmp")
	 public String updateEmployee(@ModelAttribute("employee") crudApp emp) {
	     empService.saveEmp(emp);
	     return "redirect:/Emp";
	 }


	 
		/*
		 * @GetMapping("/") public String redirectToShowEmp() { return "redirect:/Home";
		 * }
		 */
	 
	 @PostMapping("/deleteEmp/{id}")
	 public String deleteEmployee(@PathVariable Long id) {
	     empService.deleteEmpById(id);
	     return "redirect:/Emp";
	 }
	 
	 @Autowired
	 private adminRepo adminRepository;

	    // Signup endpoint
	    @PostMapping("/signup")
	    public String signup(@RequestParam String name,
                @RequestParam String email,
                @RequestParam String password,
                @RequestParam String cpassword,
                HttpSession session) {

			// Check if passwords match
			if (!password.equals(cpassword)) {
			   return "redirect:/?signupError=passwordMismatch";
			}
			
			// Check if email already exists
			Optional<Admin> existing = adminRepository.findByEmail(email);
			if (existing.isPresent()) {
			   return "redirect:/?signupError=emailExists";
			}
			
			// Save new admin
			Admin admin = new Admin();
			admin.setName(name);
			admin.setEmail(email);
			admin.setPassword(password); // 🔒 Password should be hashed in production!
			
			adminRepository.save(admin);
			

		    // ✅ Store user info in session
		    session.setAttribute("loggedInUser", admin);
			return "redirect:/?signupSuccess=true";
		}



	    // Login endpoint with email-based validation
	    @PostMapping("/login")
	    public String login(@RequestParam String email,
	                        @RequestParam String password,
	                        HttpSession session) {

	        Optional<Admin> adminOpt = adminRepository.findByEmail(email);

	        if (adminOpt.isEmpty()) {
	            return "redirect:/?loginError=emailNotFound";
	        }

	        Admin admin = adminOpt.get();

	        if (admin.getEmail() .equals(email)){
	        	if(!admin.getPassword().equals(password)) {
	        		return "redirect:/?loginError=wrongPassword";
	        	}
	        }
	        
	        if (admin.getEmail().equals(email) && admin.getPassword().equals(password)) {
		        // ✅ Store the whole user object in session for access control
		        session.setAttribute("loggedInUser", admin);
		        return "redirect:/?loginSuccess=true";
	        }
	        
	        return "redirect:/Home";
	    }


	    
	    @GetMapping("/logout")
	    public String logout(HttpSession session) {
	        session.invalidate(); // ⬅️ Clears session
	        return "redirect:/Home";
	    }


	 
	 
	
	public static void main(String[] args) {
		SpringApplication.run(CrudApplication.class, args);
	}

}
