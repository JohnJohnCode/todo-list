import DOM from "./DOM.js";
import projects from "./projects.js";

const index = (() => {
    // VARIABLES
    const localProjects = JSON.parse(localStorage.getItem('projects.allProjects') || '[]');
    const createProjectBTN = document.querySelector("#createProject");
    const cancelProjectBTN = document.querySelector("#cancelProject");
    const submitProjectBTN = document.querySelector(".projectSubmit");
    const createTodoBTN = document.querySelector("#createTodo");
    const submitTodoBTN = document.querySelector(".todoSubmit");
    const cancelTodoBTN = document.querySelector("#cancelTodo");
    const editProjectBTN = document.querySelector("#editBtn");
    const toggleBTN = document.querySelector("#toggle");
    const toggleRBTN = document.querySelector("#toggleRight");
    const editBTN = document.querySelector("#editProject");

    function loadProjects() { 
        // Loads projects into left sidebar
        for (let y = 0; y < projects.allProjects.length; y++) {
            DOM.projectCounter++;
            DOM.createProjectCont();
            index.attachProject();
            let names = document.querySelectorAll(".indivProject");
            names[y].textContent = projects.allProjects[y].name;
        }
    }

    function loadTodos(project) {
        // Loads todos into right sidebar
        for (let y = 0; y < projects.allProjects[project].todos.length; y++) {
            DOM.todoCounter++;
            DOM.createTodoCont();
            index.attachTodo();
            let names = document.querySelectorAll(".indivTodo");
            names[y].textContent = projects.allProjects[project].todos[y].name;
        }
    }

    function loadLocalStorage() {
        window.addEventListener('load', () => {
            projects.allProjects = [];
            localProjects.forEach((project) => {
              projects.allProjects.push(project);
            });
            loadProjects();
        });  
    }

    function attachProject() {
        let nameConts = document.querySelectorAll(".nameCont");
        let deleteBTNs = document.querySelectorAll(".delete");

        deleteBTNs[(deleteBTNs.length) - 1].addEventListener("click", () => {
            // Deletes projects
            let pos = parseInt(deleteBTNs[(deleteBTNs.length) - 1].classList.item(1));
            projects.allProjects.splice(pos, 1);
            localStorage.setItem('projects.allProjects', JSON.stringify(projects.allProjects));
            let parent = document.querySelector("#indivPCont");
            parent.removeChild(parent.children[pos]);
            if (projects.lastProject == pos) {
                DOM.projectArea.style.visibility = "hidden";
                editBTN.style.visibility = "hidden";
                editBTN.style.position = "absolute";
            }
            DOM.refreshPos();
            DOM.clearTodos();
        });

        // If project name gets clicked
        nameConts[(nameConts.length) - 1].addEventListener("click", () => {
            // Load that project's data
            let pos = parseInt(nameConts[(nameConts.length) - 1].classList.item(1));
            if (toggleRBTN.style.visibility == "hidden") {
                toggleRBTN.style.visibility = "visible";
            }
            if (editBTN.style.visibility == "hidden") {
                editBTN.style.visibility = "visible";
                editBTN.style.position = "relative";
            }
            if (DOM.rightBar.style.visibility == "hidden") {
                DOM.rightBar.style.visibility = "visible";
                projects.lastProject = pos;
                index.loadTodos(pos);
            } else {
                if (DOM.projectArea.style.visibility == "visible") {
                    DOM.projectArea.style.visibility = "hidden";
                }
                projects.lastProject = pos;
                DOM.clearTodos();
                index.loadTodos(pos);
            }
        });
    }

    function attachTodo() {
        let nameConts = document.querySelectorAll(".todoNameCont");
        let deleteBTNs = document.querySelectorAll(".deleteTodo");

        deleteBTNs[(deleteBTNs.length) - 1].addEventListener("click", () => {
            // Deletes todos
            let pos = parseInt(deleteBTNs[(deleteBTNs.length) - 1].classList.item(1));
            projects.allProjects[projects.lastProject].todos.splice(pos, 1);
            localStorage.setItem('projects.allProjects', JSON.stringify(projects.allProjects));
            let parent = document.querySelector("#indivTodoCont");
            parent.removeChild(parent.children[pos]);
            if (projects.lastTodo == pos) {
                DOM.showProjectArea();
            }
            DOM.refreshTodoPos();
        });

        // If todo name gets clicked
        nameConts[(nameConts.length) - 1].addEventListener("click", () => {
            // Load that todo's data
            let pos = parseInt(nameConts[(nameConts.length) - 1].classList.item(1));
            projects.lastTodo = pos;
            if (DOM.projectArea.style.visibility == "hidden") {
                DOM.projectArea.style.visibility = "visible";
                DOM.updateProjectArea(pos);
            }
            DOM.updateProjectArea(pos);
        });
    }

    function attachListeners() {     
        
        toggleBTN.addEventListener("click", () => {
            DOM.showLeftBar();
        });

        toggleRBTN.addEventListener("click", () => {
            DOM.showRightBar();
        });

        editBTN.addEventListener("click", () => {
            document.querySelector(".name").value = projects.allProjects[projects.lastProject].name;
            DOM.showProjectForm();
            submitProjectBTN.value = "Edit";
        });

        createProjectBTN.addEventListener("click", () => {
            DOM.showProjectForm();
            submitProjectBTN.value = "Create";
        });

        createTodoBTN.addEventListener("click", () => {
            DOM.showTodoForm();
            submitTodoBTN.value = "Create";
        });

        editProjectBTN.addEventListener("click", () => {
            document.querySelector(".todoName").value = projects.allProjects[projects.lastProject].todos[projects.lastTodo].name;
            document.querySelector(".dueDate").value = projects.allProjects[projects.lastProject].todos[projects.lastTodo].dueDate;
            document.querySelector(".priority").value = projects.allProjects[projects.lastProject].todos[projects.lastTodo].priority;
            DOM.showTodoForm();
            submitTodoBTN.value = "Edit";
        });
        
        cancelProjectBTN.addEventListener("click", function(event) {
            event.preventDefault();
            DOM.clearForm();
            DOM.showProjectForm();
        });

        cancelTodoBTN.addEventListener("click", function(event) {
            event.preventDefault();
            DOM.clearForm();
            DOM.showTodoForm();
        });

        submitTodoBTN.addEventListener("click", function(event) {
            event.preventDefault();
            // If user is creating a todo
            if (submitTodoBTN.value == "Create") {
                // Validate input
                if (document.querySelector(".todoName").value.length <= 0) {
                    alert("Please enter a name");
                } else if (document.querySelector(".todoName").value.length > 24) {
                    alert("Name can only be 24 characters long");
                } else if (document.querySelector(".dueDate").value == "") {
                    alert("Please enter a due date");
                } else if (DOM.isLater(document.querySelector(".dueDate").value) == false) {
                    alert("Please enter a later date");
                } else {
                    // Create todo
                    let x = new projects.createTodo;
                    projects.allProjects[projects.lastProject].todos.push(x);
                    localStorage.setItem('projects.allProjects', JSON.stringify(projects.allProjects));
                    DOM.todoCounter++;
                    DOM.createTodoCont();
                    index.attachTodo();
                    DOM.showTodoForm();
                    DOM.clearForm();
                }
            // If user is editing a todo
            } else {
                // Validate input
                if (document.querySelector(".todoName").value.length <= 0) {
                    alert("Please enter a name");
                } else if (document.querySelector(".todoName").value.length > 24) {
                    alert("Name can only be 24 characters long");
                } else if (document.querySelector(".dueDate").value == "") {
                    alert("Please enter a due date");
                } else if (DOM.isLater(document.querySelector(".dueDate").value) == false) {
                    alert("Please enter a later date");
                } else {   
                    // Edit todo
                    projects.allProjects[projects.lastProject].todos[projects.lastTodo].name = document.querySelector(".todoName").value;
                    projects.allProjects[projects.lastProject].todos[projects.lastTodo].dueDate = document.querySelector(".dueDate").value;
                    projects.allProjects[projects.lastProject].todos[projects.lastTodo].priority = document.querySelector(".priority").value;
                    localStorage.setItem('projects.allProjects', JSON.stringify(projects.allProjects));
                    document.querySelectorAll(".indivTodo")[projects.lastTodo].textContent = document.querySelector(".todoName").value;
                    DOM.updateProjectArea(projects.lastTodo);
                    DOM.showTodoForm();
                    DOM.clearForm();
                }
            }
        });

        
        submitProjectBTN.addEventListener("click", function(event) {
            event.preventDefault();
            // If user is creating a project
            if (submitProjectBTN.value == "Create") {
                // Validate input
                if (document.querySelector(".name").value.length <= 0) {
                    alert("Please enter a name");
                } else if (document.querySelector(".name").value.length > 24) {
                    alert("Name can only be 24 characters long");
                } else {
                    // Create project
                    let x = new projects.createProject;
                    projects.allProjects.push(x);
                    localStorage.setItem('projects.allProjects', JSON.stringify(projects.allProjects));
                    DOM.projectCounter++;
                    DOM.createProjectCont();
                    index.attachProject();
                    DOM.showProjectForm();
                    DOM.clearForm();
                }
            // If user is editing a project
            } else {
                // Validate input
                if (document.querySelector(".name").value.length <= 0) {
                    alert("Please enter a name");
                } else if (document.querySelector(".name").value.length > 24) {
                    alert("Name can only be 24 characters long");
                } else {   
                    // Edit project
                    projects.allProjects[projects.lastProject].name = document.querySelector(".name").value;
                    localStorage.setItem('projects.allProjects', JSON.stringify(projects.allProjects));
                    document.querySelectorAll(".indivProject")[projects.lastProject].textContent = document.querySelector(".name").value;
                    DOM.showProjectForm();
                    DOM.clearForm();
                }
            }
        });

        DOM.projectTextBox.addEventListener("keypress", () => {
            // Automatically save text field
            setTimeout(function(){projects.allProjects[projects.lastProject].todos[projects.lastTodo].text = DOM.projectTextBox.value}, 100);
        });
    }
    return {
        attachListeners,
        attachProject,
        attachTodo,
        loadTodos,
        loadLocalStorage
    }
})();

index.loadLocalStorage();
index.attachListeners();
