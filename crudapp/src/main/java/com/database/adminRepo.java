package com.database;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface adminRepo extends JpaRepository<Admin, Long> {
	
	Optional<Admin> findByEmail(String email);

}
