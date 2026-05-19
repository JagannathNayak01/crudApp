# crudApp
# 🏢 Employee Management System — Spring Boot CRUD Application

A full-stack Employee Management System built with **Spring Boot**, **Thymeleaf**, and **Oracle Database**. Perform complete CRUD (Create, Read, Update, Delete) operations on employee records through a modern, animated glassmorphism UI.

> 📌 **Team SAM** — KIIT University, MCA  
> Built by **Jagannath Nayak**, **Samikshya Das**, and **Suhana Parween**

---

## 📸 Features

| Feature | Description |
|---------|-------------|
| ➕ **Add Employee** | Register new employees via a sleek popup form with name, email, age, phone, and gender selection |
| 📋 **View Employees** | Browse all employees in a sortable, searchable table with glassmorphism styling |
| ✏️ **Edit Employee** | Update employee details through a dedicated edit page with form validation |
| 🗑️ **Delete Employee** | Remove employee records with a confirmation dialog |
| 🔍 **Search & Filter** | Real-time search across employee records |
| ⬍ **Column Sorting** | Sort by Name, Gender, Email, Age, or Phone (ascending/descending) |
| ☑️ **Bulk Selection** | Select-all checkbox for batch operations |
| 👥 **About Us** | Team showcase with animated 3D flip cards and a Google Maps embed |
| 🔐 **Login / Signup UI** | Glassmorphism authentication forms (UI-only) |
| 📱 **Responsive Design** | Mobile-friendly layout with Bootstrap 5 |

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 17 | Core language |
| **Spring Boot** | 3.4.4 | Application framework |
| **Spring Data JPA** | — | ORM & database access |
| **Spring Web** | — | MVC controller layer |
| **Thymeleaf** | — | Server-side HTML templating |
| **Spring Boot DevTools** | — | Hot-reload during development |
| **Oracle Database** | ojdbc11 | Relational database (Oracle XE) |

### Frontend
| Technology | Purpose |
|------------|---------|
| **HTML5 + Thymeleaf** | Server-rendered dynamic pages |
| **CSS3** | Custom dark-theme glassmorphism styling (1000+ lines) |
| **JavaScript (Vanilla)** | DOM manipulation, sorting, search, animations |
| **Bootstrap 5** | Grid system, responsive utilities, components |
| **Font Awesome 6** | Icons throughout the UI |
| **Google Fonts (Poppins)** | Typography |
| **AOS** | Scroll-triggered animations on About Us page |

---

## 📁 Project Structure

```
crudapp/
├── pom.xml                                        # Maven dependencies & build config
├── src/
│   ├── main/
│   │   ├── java/com/
│   │   │   ├── crud/crudapp/
│   │   │   │   └── CrudApplication.java           # Main app + Controller (MVC routes)
│   │   │   └── database/
│   │   │       ├── crudApp.java                    # JPA Entity (Employee model)
│   │   │       ├── crudAppRepo.java                # JPA Repository interface
│   │   │       └── Services.java                   # Service layer (business logic)
│   │   └── resources/
│   │       ├── application.properties              # DB connection, server config
│   │       ├── templates/
│   │       │   ├── Home.html                       # Main page (home + employee table)
│   │       │   ├── editEmp.html                    # Edit employee form
│   │       │   └── aboutUs.html                    # About Us / Team page
│   │       └── static/
│   │           ├── style.css                       # Global styles (dark theme)
│   │           ├── script.js                       # Client-side JS logic
│   │           ├── Jaga.jpg / Jaga1.jpg            # Team member photos
│   │           ├── Samik.jpg                       # Team member photo
│   │           ├── suhana.jpg                      # Team member photo
│   │           ├── images.jpeg                     # Project showcase image
│   │           └── pexels-essow-k-251295-936722.jpg # Background image
│   └── test/
│       └── java/com/crud/crudapp/
│           └── CrudApplicationTests.java           # Spring Boot test scaffold
```

---

## 🗄️ Database Schema

**Table**: `crudApp1` (Oracle DB)

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | `BIGINT` | Primary Key, Auto-generated (Sequence: `emp_seq`) |
| `name` | `VARCHAR` | NOT NULL |
| `gender` | `VARCHAR` | NOT NULL |
| `email` | `VARCHAR` | NOT NULL |
| `age` | `INT` | NOT NULL |
| `phone` | `VARCHAR` | NOT NULL |

---

## 🚀 Getting Started

### Prerequisites

- **Java 17** or higher
- **Maven 3.8+**
- **Oracle Database XE** (running on `localhost:1521`, SID: `xe`)
- Oracle user `todo_list` with appropriate table creation privileges

### 1. Clone the Repository

```bash
git clone <repository-url>
cd crudapp/crudapp
```

### 2. Configure the Database

Ensure Oracle XE is running and the user exists. Update credentials in `src/main/resources/application.properties` if needed:

```properties
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:xe
spring.datasource.username=todo_list
spring.datasource.password=<your-password>
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver
spring.jpa.hibernate.ddl-auto=update
```

> ⚠️ The `ddl-auto=update` setting will **auto-create/update** the table schema on startup.

### 3. Build & Run

```bash
# Using Maven Wrapper
./mvnw spring-boot:run

# Or using installed Maven
mvn spring-boot:run
```

### 4. Open in Browser

Navigate to:

```
http://localhost:9000/
```

This will redirect to `/showEmp` and display the employee management dashboard.

---

## 🌐 Application Routes

| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `/` | Redirects to `/showEmp` |
| `GET` | `/Home` | Home landing page |
| `GET` | `/showEmp` | Display all employees in a table |
| `POST` | `/addEmp` | Add a new employee |
| `GET` | `/editEmp/{id}` | Show edit form for an employee |
| `POST` | `/updateEmp` | Update an existing employee |
| `POST` | `/deleteEmp/{id}` | Delete an employee by ID |
| `GET` | `/About Us` | About Us / Team page |

---

## 🎨 UI Highlights

- **Dark Theme** with cyan accent colors and glassmorphism effects
- **Animated Hero Section** with floating text and radial grid background
- **Custom Gender Toggle** — animated sliding radio button group
- **Glassmorphism Table** with frosted glass effect and hover animations
- **3D Flip Team Cards** on the About Us page (flip on hover)
- **Neon Social Icons** with brand-colored hover glows
- **Footer** with Quick Links, Contact Info, and a Customer Feedback form

---

## 👥 Team

| Member | Role | Skills |
|--------|------|--------|
| **Jagannath Nayak** | Backend & Database Lead | Spring Boot, Java, SQL |
| **Samikshya Das** | Frontend & UI/UX | HTML, Tailwind, UX Design |
| **Suhana Parween** | Testing, Debugging & Documentation | Jest, Cypress, DevTools |

---

## 📝 License

Copyright © 2025 SAM Team (KIIT University). All rights reserved.
