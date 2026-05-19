# 📊 Data Flow Diagrams — Employee Management System

> DFD Level 0 (Context), Level 1 (System Overview), and Level 2 (Detailed Processes)  
> **Project**: Spring Boot CRUD Application | **Team SAM** — KIIT University

---

## 📘 DFD Notation Guide

| Symbol | Meaning |
|--------|---------|
| **Rectangle** | External Entity (User/Actor) |
| **Rounded/Circle** | Process |
| **Open Rectangle (parallel lines)** | Data Store |
| **Arrow** | Data Flow (labeled with data name) |

---

## 🔵 Level 0 — Context Diagram

The highest-level view showing the entire system as a single process interacting with external entities.

```mermaid
flowchart LR
    Admin["👤 Admin / User"]

    subgraph System["🔄 0.0 Employee Management System"]
        EMS["Employee\nManagement\nSystem"]
    end

    DB[("🗄️ Oracle Database\n(crudApp1)")]

    Admin -->|"Employee Data\n(name, gender, email, age, phone)"| EMS
    Admin -->|"Search Query / Sort Request"| EMS
    Admin -->|"Edit Request (employee ID + updated data)"| EMS
    Admin -->|"Delete Request (employee ID)"| EMS
    Admin -->|"Login / Signup Credentials"| EMS

    EMS -->|"Employee List\n(table view)"| Admin
    EMS -->|"Success / Error Messages"| Admin
    EMS -->|"Edit Form\n(pre-filled data)"| Admin
    EMS -->|"Team Info\n(About Us page)"| Admin

    EMS <-->|"CRUD Queries\n& Results"| DB
```

**Summary**: A single user (Admin) interacts with the Employee Management System to manage employee records. The system reads/writes data to an Oracle Database.

---

## 🟢 Level 1 — System Overview

Breaks the system into its major processes.

```mermaid
flowchart TB
    User["👤 Admin / User"]
    DB[("🗄️ Oracle DB\ncrudApp1 Table")]

    subgraph EMS["Employee Management System"]
        P1["1.0\nView Employees"]
        P2["2.0\nAdd Employee"]
        P3["3.0\nEdit Employee"]
        P4["4.0\nDelete Employee"]
        P5["5.0\nSearch & Sort"]
        P6["6.0\nAuthenticate User"]
        P7["7.0\nView About Us"]
    end

    %% User → Processes
    User -->|"Page Request\n(GET /showEmp)"| P1
    User -->|"Employee Data\n(POST /addEmp)"| P2
    User -->|"Employee ID\n(GET /editEmp/{id})"| P3
    User -->|"Updated Employee Data\n(POST /updateEmp)"| P3
    User -->|"Employee ID\n(POST /deleteEmp/{id})"| P4
    User -->|"Search Keyword"| P5
    User -->|"Login / Signup\nCredentials"| P6
    User -->|"Page Request\n(GET /About Us)"| P7

    %% Processes → User
    P1 -->|"Employee List\n(Home.html)"| User
    P2 -->|"Redirect to\n/showEmp"| User
    P3 -->|"Edit Form\n(editEmp.html)"| User
    P4 -->|"Redirect to\n/showEmp"| User
    P5 -->|"Filtered /\nSorted Results"| User
    P6 -->|"Auth Form UI"| User
    P7 -->|"About Us Page\n(aboutUs.html)"| User

    %% Processes ↔ Database
    P1 <-->|"SELECT * FROM crudApp1"| DB
    P2 -->|"INSERT INTO crudApp1"| DB
    P3 <-->|"SELECT by ID /\nUPDATE crudApp1"| DB
    P4 -->|"DELETE FROM crudApp1\nWHERE id = ?"| DB
    P5 <-->|"SELECT * FROM crudApp1\n(client-side filter)"| DB
```

> [!NOTE]
> **Process 5.0 (Search & Sort)** operates entirely on the client side via JavaScript. The data is already loaded in the table; filtering/sorting happens in the browser without additional DB queries.

> [!NOTE]
> **Process 6.0 (Authenticate User)** is currently UI-only — the login/signup forms have no backend integration.

---

## 🟠 Level 2 — Detailed Process Decomposition

### 2.1 — Process 1.0: View Employees (Detailed)

```mermaid
flowchart TB
    User["👤 User"]
    DB[("🗄️ Oracle DB")]

    subgraph P1["1.0 View Employees"]
        P1_1["1.1\nReceive GET\nRequest"]
        P1_2["1.2\nCall Service\ngetAllEmp()"]
        P1_3["1.3\nQuery Repository\nfindAll()"]
        P1_4["1.4\nBind Data\nto Model"]
        P1_5["1.5\nRender Thymeleaf\nTemplate"]
    end

    User -->|"GET /showEmp\nor GET /"| P1_1
    P1_1 -->|"Invoke\nServices.getAllEmp()"| P1_2
    P1_2 -->|"Call\ncrudAppRepo.findAll()"| P1_3
    P1_3 <-->|"SELECT * FROM\ncrudApp1"| DB
    P1_3 -->|"List of crudApp\nentities"| P1_4
    P1_4 -->|"model.addAttribute\n('employees', list)"| P1_5
    P1_5 -->|"Home.html with\nemployee table"| User
```

---

### 2.2 — Process 2.0: Add Employee (Detailed)

```mermaid
flowchart TB
    User["👤 User"]
    DB[("🗄️ Oracle DB")]

    subgraph P2["2.0 Add Employee"]
        P2_1["2.1\nDisplay Add\nForm Popup"]
        P2_2["2.2\nReceive POST\nForm Data"]
        P2_3["2.3\nCreate crudApp\nEntity Object"]
        P2_4["2.4\nCall Service\nsaveEmp()"]
        P2_5["2.5\nPersist via\nRepository"]
        P2_6["2.6\nSet Flash\nMessage"]
        P2_7["2.7\nRedirect to\n/showEmp"]
    end

    User -->|"Click + icon"| P2_1
    P2_1 -->|"Fill form:\nname, email, age,\nphone, gender"| User
    User -->|"POST /addEmp\nwith @RequestParam"| P2_2
    P2_2 -->|"Instantiate\nnew crudApp()"| P2_3
    P2_3 -->|"Set fields:\nsetName(), setGender(),\nsetEmail(), setAge(),\nsetPhone()"| P2_4
    P2_4 -->|"crudAppRepo\n.save(emp)"| P2_5
    P2_5 -->|"INSERT INTO\ncrudApp1 VALUES(...)"| DB
    P2_5 -->|"Saved entity\n(with generated ID)"| P2_6
    P2_6 -->|"'Employee added\nsuccessfully!'"| P2_7
    P2_7 -->|"redirect:/showEmp"| User
```

---

### 2.3 — Process 3.0: Edit Employee (Detailed)

```mermaid
flowchart TB
    User["👤 User"]
    DB[("🗄️ Oracle DB")]

    subgraph P3["3.0 Edit Employee"]
        P3_1["3.1\nReceive Edit\nRequest"]
        P3_2["3.2\nFetch Employee\nby ID"]
        P3_3["3.3\nBind to Model\n& Render Form"]
        P3_4["3.4\nReceive Updated\nForm Data"]
        P3_5["3.5\nCall Service\nsaveEmp()"]
        P3_6["3.6\nUpdate via\nRepository"]
        P3_7["3.7\nRedirect to\n/showEmp"]
    end

    User -->|"Click Edit icon\nGET /editEmp/{id}"| P3_1
    P3_1 -->|"Services\n.getEmpById(id)"| P3_2
    P3_2 <-->|"SELECT * FROM\ncrudApp1 WHERE id = ?"| DB
    P3_2 -->|"crudApp entity"| P3_3
    P3_3 -->|"editEmp.html\nwith pre-filled fields"| User
    User -->|"Submit updated data\nPOST /updateEmp"| P3_4
    P3_4 -->|"@ModelAttribute\ncrudApp emp"| P3_5
    P3_5 -->|"crudAppRepo\n.save(emp)"| P3_6
    P3_6 -->|"UPDATE crudApp1\nSET ... WHERE id = ?"| DB
    P3_6 -->|"Success"| P3_7
    P3_7 -->|"redirect:/showEmp"| User
```

---

### 2.4 — Process 4.0: Delete Employee (Detailed)

```mermaid
flowchart TB
    User["👤 User"]
    DB[("🗄️ Oracle DB")]

    subgraph P4["4.0 Delete Employee"]
        P4_1["4.1\nReceive Delete\nRequest"]
        P4_2["4.2\nShow Confirm\nDialog"]
        P4_3["4.3\nCall Service\ndeleteEmpById()"]
        P4_4["4.4\nDelete via\nRepository"]
        P4_5["4.5\nRedirect to\n/showEmp"]
    end

    User -->|"Click Delete icon"| P4_1
    P4_1 -->|"confirm('Are you sure?')"| P4_2
    P4_2 -->|"User confirms → POST\n/deleteEmp/{id}"| P4_3
    P4_3 -->|"crudAppRepo\n.deleteById(id)"| P4_4
    P4_4 -->|"DELETE FROM crudApp1\nWHERE id = ?"| DB
    P4_4 -->|"Deleted"| P4_5
    P4_5 -->|"redirect:/showEmp"| User
```

---

### 2.5 — Process 5.0: Search & Sort (Detailed)

```mermaid
flowchart TB
    User["👤 User"]

    subgraph P5["5.0 Search & Sort (Client-Side JS)"]
        P5_1["5.1\nCapture Search\nInput"]
        P5_2["5.2\nFilter Table Rows\n(text match)"]
        P5_3["5.3\nCapture Sort\nClick"]
        P5_4["5.4\nDetermine Sort\nDirection"]
        P5_5["5.5\nSort Rows\n(localeCompare /\nnumeric)"]
        P5_6["5.6\nUpdate Sort\nArrow Icons"]
    end

    User -->|"Type in\nsearch input"| P5_1
    P5_1 -->|"filterTable()\nget input value"| P5_2
    P5_2 -->|"Show/hide rows\nbased on text match"| User

    User -->|"Click column\nheader"| P5_3
    P5_3 -->|"sortTable(colIndex)\ncheck sortDirection[]"| P5_4
    P5_4 -->|"asc ↔ desc\ntoggle"| P5_5
    P5_5 -->|"Reorder DOM\ntbody rows"| P5_6
    P5_6 -->|"Update ⬆/⬇\narrow icons"| User
```

> [!IMPORTANT]
> This entire process runs in the **browser** (client-side JavaScript). No server calls are made — all data is already present in the HTML table rendered by Thymeleaf.

---

## 📐 Data Dictionary

| Data Flow | Contents | Format | Source → Destination |
|-----------|----------|--------|---------------------|
| **Employee Data** | name, gender, email, age, phone | Form POST params | User → System |
| **Employee ID** | Unique auto-generated Long | Path variable `{id}` | User → System |
| **Employee List** | Array of all employee records | Thymeleaf model attribute | DB → System → User |
| **Edit Form Data** | Pre-filled employee fields | Thymeleaf `th:field` bindings | DB → System → User |
| **Search Keyword** | Free-text string | JS input event value | User → Browser (JS) |
| **Sort Request** | Column index + direction | JS click handler params | User → Browser (JS) |
| **Flash Message** | Success/error string | `RedirectAttributes` | System → User |
| **CRUD Queries** | SQL INSERT/SELECT/UPDATE/DELETE | JPA-generated SQL | System → Oracle DB |

---

## 🏛️ Data Stores

| Store ID | Name | Implementation | Contents |
|----------|------|----------------|----------|
| **D1** | Employee Database | Oracle DB table `crudApp1` | All employee records (id, name, gender, email, age, phone) |
| **D2** | Session/Browser | Client-side DOM | Currently rendered employee table rows (for search/sort) |
