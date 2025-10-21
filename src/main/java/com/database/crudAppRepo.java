package com.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface crudAppRepo extends JpaRepository<crudApp, Long> {
	

}
