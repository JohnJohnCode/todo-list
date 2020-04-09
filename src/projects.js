
const projects = (() => {
    let allProjects = [];
    let lastProject = null;
    let lastTodo = null;

    class createProject {
        constructor() {
            this.name = document.querySelector(".name").value;
            this.todos = [];
        }
    };

    class createTodo {
        constructor() {
            this.name = document.querySelector(".todoName").value
            this.dueDate = document.querySelector(".dueDate").value;
            this.priority = document.querySelector(".priority").value;
            this.text = ""
        }
    }
    
    return {
        createProject,
        createTodo,
        allProjects,
        lastProject,
        lastTodo
    }
})();

export default projects;