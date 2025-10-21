function showForm() {
    document.getElementById("formContainer").style.display = "block";
}

function addEmployee() {
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let email = document.getElementById("email").value.trim();
    let isValid = true;

    document.getElementById("firstNameError").innerText = "";
    document.getElementById("lastNameError").innerText = "";
    document.getElementById("emailError").innerText = "";

    if (firstName === "") {
        document.getElementById("firstNameError").innerText = "First name is required";
        isValid = false;
    }

    if (lastName === "") {
        document.getElementById("lastNameError").innerText = "Last name is required";
        isValid = false;
    }

    if (email === "") {
        document.getElementById("emailError").innerText = "Email is required";
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById("emailError").innerText = "Invalid email format";
        isValid = false;
    }

    if (isValid) {
        let table = document.getElementById("employeeTable");
        let newRow = table.insertRow();
        
        newRow.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${email}</td>
            <td class="action-buttons">
                <button class="btn btn-danger" onclick="deleteEmployee(this)">Delete</button>
                <button class="btn btn-success">Update</button>
            </td>
        `;

        document.getElementById("form").reset();
        document.getElementById("formContainer").style.display = "none";
    }
}

function validateEmail(email) {
    let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

function deleteEmployee(button) {
    let row = button.closest("tr");
    row.remove();
}



    function editEmployee(id) {
        window.location.href = '/editEmp/' + id;
    }
	let homeSection = document.getElementById("homeSection");
	let employeeSection = document.getElementById("employeeSection");
	let formPopup = document.getElementById("employeeForm");

	// Nav Links
	const navLinks = document.querySelectorAll(".nav-link");

	// Navigation Handling
	function showHome(ele) {
	  employeeSection.style.display = "block";
	  homeSection.style.display = "flex";  // important for centering
	  setActive(ele);
	}

	function showEmployees(ele) {
	  homeSection.style.display = "none";
	  employeeSection.style.display = "block";
	  setActive(ele);
	}

	// Active Link Highlighter
	function setActive(ele) {
	  navLinks.forEach(link => link.classList.remove("active"));
	  ele.classList.add("active");
	}
	
	//page activation
	// Wait for the DOM to be fully loaded
	document.addEventListener("DOMContentLoaded", function () {
	  // Get current pathname (e.g., "/Emp", "/Home", etc.)
	  const currentPath = window.location.pathname;

	  // Get all nav links
	  const navLinks = document.querySelectorAll(".nav-link");

	  navLinks.forEach(link => {
	    // Remove 'active' class from all links
	    link.classList.remove("active");

	    // If href matches the current path, add 'active' class
	    if (link.getAttribute("href") === currentPath) {
	      link.classList.add("active");
	    }
	  });
	});

	// Auto Active Link After Reload
	window.onload = function () {
	  if (window.location.href.includes("employees")) {
	    showEmployees(document.getElementById("employeesLink"));
	  } else {
	    showHome(document.getElementById("homeLink"));
	  }
	}

	// Show Add Employee Form
	function showForm() {
	  formPopup.style.display = formPopup.style.display === "block" ? "none" : "block";
	}

	// Delete Employee Row
	/*function deleteEmployee(ele) {
	  ele.closest('tr').remove();
	}*/

	// Pagination
	const rowsPerPageSelect = document.createElement('select');
	[5, 10, 15, 20].forEach(num => {
	  const option = document.createElement('option');
	  option.value = num;
	  option.innerText = `${num} Rows`;
	  rowsPerPageSelect.appendChild(option);
	});

	// document.getElementById('employeeSection').prepend(rowsPerPageSelect);

	// rowsPerPageSelect.addEventListener('change', paginate);

	// function paginate() {
	//   const rows = document.querySelectorAll('#employeeTable tbody tr');
	//   const limit = parseInt(rowsPerPageSelect.value);

	//   rows.forEach((row, index) => {
	//     row.style.display = index < limit ? '' : 'none';
	//   });
	// }

	// paginate();
	// const rowsPerPage = 5;
	// const table = document.getElementById("employeeTable");
	// const pagination = document.getElementById("pagination");

	// function displayPage(page) {
	//   const rows = table.querySelectorAll("tr");
	//   const start = (page - 1) * rowsPerPage;
	//   const end = start + rowsPerPage;

	//   rows.forEach((row, index) => {
	//     row.style.display = index >= start && index < end ? "" : "none";
	//   });
	// }

	// function setupPagination() {
	//   const rows = table.querySelectorAll("tr");
	//   const pageCount = Math.ceil(rows.length / rowsPerPage);

	//   pagination.innerHTML = "";

	//   for (let i = 1; i <= pageCount; i++) {
	//     pagination.innerHTML += `
	//       <li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="displayPage(${i})">${i}</a></li>
	//     `;
	//   }
	// }

	// setupPagination();
	// displayPage(1);
	
	
	// 🔍 Filter/Search
	  function filterTable() {
	    const input = document.getElementById("searchInput").value.toLowerCase();
	    const rows = document.querySelectorAll("#employeeTable tr");

	    rows.forEach(row => {
	      const text = row.textContent.toLowerCase();
	      row.style.display = text.includes(input) ? "" : "none";
	    });
	  }

	  // ⬍ Sort Columns
	  /*let sortDirection = true;

	  function sortTable(colIndex) {
	    const table = document.getElementById("employeeTableElement");
	    const tbody = table.querySelector("tbody");
	    const rows = Array.from(tbody.querySelectorAll("tr"));

	    rows.sort((a, b) => {
	      const A = a.children[colIndex].innerText.trim().toLowerCase();
	      const B = b.children[colIndex].innerText.trim().toLowerCase();

	      return sortDirection ? A.localeCompare(B) : B.localeCompare(A);
	    });

	    // Toggle direction
	    sortDirection = !sortDirection;

	    // Re-append rows
	    rows.forEach(row => tbody.appendChild(row));
	  }*/

	  
	
	  let sortDirection = Array(6).fill(null); // Track sort direction for each column

	  function sortTable(columnIndex) {
	    const table = document.getElementById("employeeTableElement");
	    const tbody = table.tBodies[0];
	    const rows = Array.from(tbody.querySelectorAll("tr"));

	    const direction = sortDirection[columnIndex] === "asc" ? "desc" : "asc";
	    sortDirection[columnIndex] = direction;

	    rows.sort((a, b) => {
	      const valA = a.cells[columnIndex].innerText.toLowerCase();
	      const valB = b.cells[columnIndex].innerText.toLowerCase();

	      if (!isNaN(valA) && !isNaN(valB)) {
	        return direction === "asc" ? valA - valB : valB - valA;
	      }

	      return direction === "asc"
	        ? valA.localeCompare(valB)
	        : valB.localeCompare(valA);
	    });

	    rows.forEach(row => tbody.appendChild(row));

	    // Update sorting arrows
	    document.querySelectorAll(".sort-icon").forEach(el => el.innerText = "⬍");
	    const headerIcon = table.querySelectorAll(".sort-icon")[columnIndex - 1];
	    headerIcon.innerText = direction === "asc" ? "⬆" : "⬇";
	  }

	  document.getElementById("searchInput").addEventListener("input", function () {
	    const filter = this.value.toLowerCase();
	    const rows = document.querySelectorAll("#employeeTable tr");
	    rows.forEach(row => {
	      const text = row.innerText.toLowerCase();
	      row.style.display = text.includes(filter) ? "" : "none";
	    });
	  });

	  // Select all checkbox
	  document.getElementById("selectAll").addEventListener("change", function () {
	    document.querySelectorAll(".row-checkbox").forEach(cb => {
	      cb.checked = this.checked;
	    });
	  });

	  const toggleBtn = document.querySelector('.add-icon');
	  const overlay = document.getElementById('overlay');
	  const formContainer = document.querySelector('.container2');
	  const closeBtn = document.querySelector('.close-btn');

	  toggleBtn.addEventListener('click', () => {
	    overlay.classList.add('active');
	    formContainer.classList.add('active');
	    toggleBtn.classList.add('hide'); // hide icon from center
	  });

	  closeBtn.addEventListener('click', () => {
	    overlay.classList.remove('active');
	    formContainer.classList.remove('active');
	    toggleBtn.classList.remove('hide'); // show icon back when form closes
	  });


	  const form = document.querySelector('form');
	  const radios = document.querySelectorAll('.gender-toggle input[type="radio"]');

	  // Optional sound
	  const toggleSound = new Audio('https://cdn.pixabay.com/audio/2023/02/01/audio_51f64467c3.mp3');

	  radios.forEach(radio => {
	    radio.addEventListener('change', () => {
	      if (navigator.vibrate) navigator.vibrate(50);
	      toggleSound.play();
	    });
	  });

	  form.addEventListener('submit', function(e) {
	    e.preventDefault();

	    const formData = new FormData(form);
	    const data = Object.fromEntries(formData.entries());

	    console.log("Form Data:", data);

	    form.reset();

	    // Reset indicator back to first option
	    document.querySelector('#male').checked = true;
	  });
	  
	  function toggleDropdown() {
	    document.getElementById('profileDropdown').classList.toggle('show');
	  }

	  window.onclick = function(e) {
	    if (!e.target.closest('.profile')) {
	      document.getElementById('profileDropdown').classList.remove('show');
	    }
	  }

	  function showForm(type){
	    closeForm('loginForm');
	    closeForm('signupForm');
	    document.getElementById(type+'Form').classList.add('show');
	  }

	  function closeForm(formId){
	    document.getElementById(formId).classList.remove('show');
	  }

	  function switchForm(toForm){
	    closeForm('loginForm');
	    closeForm('signupForm');
	    document.getElementById(toForm+'Form').classList.add('show');
	  }
	  
	 /* window.addEventListener("DOMContentLoaded", function () {
	      const params = new URLSearchParams(window.location.search);
	      const error = params.get("signupError");
	      const msgDiv = document.getElementById("signupErrorMessage");

	      if (error && msgDiv) {
	          if (error === "emailExists") {
	              msgDiv.innerText = "Email already registered!";
	          } else if (error === "passwordMismatch") {
	              msgDiv.innerText = "Passwords do not match!";
	          } else {
	              msgDiv.innerText = "Signup error occurred.";
	          }
	      }
	  });
	  const success = params.get("signupSuccess");
	  const successDiv = document.getElementById("signupSuccessMessage");

	  if (success === "true" && successDiv) {
	      successDiv.innerText = "Signup successful! You can now log in.";
	  }*/

	  window.addEventListener('DOMContentLoaded', () => {
	     const params = new URLSearchParams(window.location.search);
	     const error = params.get("signupError");

	     if (error) {
	       // Show error message
	       const errorDiv = document.getElementById("errorMessage");
	       switch (error) {
	         case "emailExists":
	           errorDiv.textContent = "Email already exists!";
	           break;
	         case "passwordMismatch":
	           errorDiv.textContent = "Passwords do not match!";
	           break;
	         default:
	           errorDiv.textContent = "Unknown error occurred.";
	       }

	       // ⬅️ Make sure signup form is visible
	       document.getElementById("signupForm").style.display = "block";
	     }
	   });
	   

