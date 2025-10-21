package com.database;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;


@Entity
@Table(name="crudApp1")

public class crudApp {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emp_seq")
	@SequenceGenerator(
	    name = "emp_seq",
	    sequenceName = "emp_seq",
	    allocationSize = 1
	)
	private Long id;

	
	@Column(name="name",nullable=false)
	private String name;
	
	@Column(name="gender",nullable = false)
	private String gender;
	
	@Column(name="email",nullable = false)
	private String email;
	
	@Column(name="age",nullable = false)
	private int age;
	
	@Column(name="phone",nullable = false)
	private String phone;

	public crudApp() {
		super();
	}

	public crudApp(String name, String gender, String email, int age, String phone) {
		super();
		this.name = name;
		this.gender = gender;
		this.email = email;
		this.age = age;
		this.phone = phone;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Override
	public String toString() {
		return "crudApp [id=" + id + ", name=" + name + ", gender=" + gender + ", email=" + email + ", age=" + age
				+ ", phone=" + phone + "]";
	}
	
	
	
}
