package com.database;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class Services {

	@Autowired
	private crudAppRepo ca;
	
	public crudApp saveEmp(crudApp crudApp1) {
		
		return ca.save(crudApp1);
		
		
	}
	 public List<crudApp> getAllEmp() {
	        return ca.findAll(); 
	    }
	 
	 public crudApp getEmpById(Long id) {
		    return ca.findById(id).orElse(null);
		}
	 public void deleteEmpById(Long id) {
		    ca.deleteById(id);
		}


	
}
