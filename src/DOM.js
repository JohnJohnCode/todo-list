import projects from "./projects.js";

const DOM = (() => {
    // VARIABLES
    const projectFormCont = document.querySelector("#projectFormBG");
    const todoFormCont = document.querySelector("#todoFormBG");
    const indivPCont = document.querySelector("#indivPCont");
    const indivTodoCont = document.querySelector("#indivTodoCont");
    const projectArea = document.querySelector("#todoCont");
    const projectName = document.querySelector("#projectName");
    const projectDate = document.querySelector("#projectDate");
    const projectPriority = document.querySelector("#projectPriority");
    const projectTextBox = document.querySelector("#textArea");
    const editBTN = document.querySelector("#editProject");
    const toggleBTN = document.querySelector("#toggle");
    const toggleRBTN = document.querySelector("#toggleRight");
    const leftBar = document.querySelector("#projectPCont");
    const rightBar = document.querySelector("#todoPCont");
    let projectCounter = 0;
    let todoCounter = 0;
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    // Restrict due date input
    document.querySelector(".dueDate").min = today;

    function isLater(input) {
        // Checks if input is later than yesterday's date
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        
        if (parseInt(input.slice(0, 4)) < parseInt(yyyy)) {
            return false;
        } else if (parseInt(input.slice(0, 4)) == parseInt(yyyy)) {
            if (parseInt(input.slice(5, 7)) < parseInt(mm)) {
                return false;
            } else if (parseInt(input.slice(5, 7)) == parseInt(mm)) {
                if (parseInt(input.slice(8, 10)) < parseInt(dd)) {
                    return false;
                } else if (parseInt(input.slice(8, 10)) >= parseInt(dd)) {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    function clearForm() {
        document.querySelector(".name").value = "";
        document.querySelector(".todoName").value = "";
        document.querySelector(".dueDate").value = "";
        document.querySelector(".priority").value = "!";
    }

    function clearTodos() {
        while (indivTodoCont.firstChild) {
            indivTodoCont.removeChild(indivTodoCont.firstChild);
        }
        DOM.todoCounter = 0;
    }

    function showLeftBar() {
        if (leftBar.style.visibility == "hidden") {
            leftBar.style.visibility = "visible";
            if (editBTN.style.position == "absolute") {
                editBTN.style.visibility = "hidden";
            } else {
                editBTN.style.visibility = "visible";
            }
            if (rightBar.style.visibility == "visible") {
                toggleBTN.textContent = "⯇";
                projectArea.style.width = "64%";
            } else {
                toggleBTN.textContent = "⯇";
                projectArea.style.width = "82%";
            }
        } else {
            leftBar.style.visibility = "hidden";
            editBTN.style.visibility = "hidden";
            if (rightBar.style.visibility == "visible") {
                toggleBTN.textContent = "⯈";
                projectArea.style.width = "82%";
            } else {
                toggleBTN.textContent = "⯈";
                projectArea.style.width = "100%";
            }
        }
    }

    function showRightBar() {
        if (rightBar.style.visibility == "hidden") {
            rightBar.style.visibility = "visible";
            if (leftBar.style.visibility == "visible") {
                toggleRBTN.textContent = "⯈";
                projectArea.style.width = "64%";
                projectArea.style.right = "18%";
            } else {
                toggleRBTN.textContent = "⯈";
                projectArea.style.width = "82%";
                projectArea.style.right = "18%";
            }
        } else {
            rightBar.style.visibility = "hidden";
            if (leftBar.style.visibility == "visible") {
                toggleRBTN.textContent = "⯇";
                projectArea.style.width = "82%";
                projectArea.style.right = "0px";
            } else {
                toggleRBTN.textContent = "⯇";
                projectArea.style.width = "100%";
                projectArea.style.right = "0px";
            }
        }
    }

    function showProjectArea() {
        if (projectArea.style.visibility == "hidden") {
            projectArea.style.visibility = "visible";
        } else {
            projectArea.style.visibility = "hidden";
        }
    }

    function refreshPos() {
        let allProjectNames = document.querySelectorAll(".nameCont");
        let allProjectBTNs = document.querySelectorAll(".delete");

        // Re-numbers each project's position in their classes
        for (let x = 0; x < allProjectNames.length; x++) {
            allProjectNames[x].classList.remove(allProjectNames[x].classList.item(1));
            allProjectNames[x].classList.add(x);
            allProjectBTNs[x].classList.remove(allProjectBTNs[x].classList.item(1));
            allProjectBTNs[x].classList.add(x);
        }
        DOM.projectCounter = allProjectNames.length;
    }

    function refreshTodoPos() {
        let allTodoNames = document.querySelectorAll(".todoNameCont");
        let allTodoBTNs = document.querySelectorAll(".deleteTodo");

        // Re-numbers each todo's position in their classes
        for (let x = 0; x < allTodoNames.length; x++) {
            allTodoNames[x].classList.remove(allTodoNames[x].classList.item(1));
            allTodoNames[x].classList.add(x);
            allTodoBTNs[x].classList.remove(allTodoBTNs[x].classList.item(1));
            allTodoBTNs[x].classList.add(x);
        }
        DOM.todoCounter = allTodoNames.length;
    }

    function updateProjectArea(pos) {
        // Shows todo's data
        projectName.textContent = `${projects.allProjects[projects.lastProject].todos[pos].name}`;
        projectDate.textContent = `Due date: \xa0${projects.allProjects[projects.lastProject].todos[pos].dueDate}`;
        projectPriority.textContent = `Priority: \xa0\xa0\xa0\xa0${projects.allProjects[projects.lastProject].todos[pos].priority}`
        projectTextBox.value = projects.allProjects[projects.lastProject].todos[pos].text;
    }

    function showProjectForm() {
        if (projectFormCont.style.visibility == "hidden") {
            projectFormCont.style.visibility = "visible";
        } else {
            projectFormCont.style.visibility = "hidden";
        }
    }

    function showTodoForm() {
        if (todoFormCont.style.visibility == "hidden") {
            todoFormCont.style.visibility = "visible";
        } else {
            todoFormCont.style.visibility = "hidden";
        }
    }

    function createProjectCont() {

        let projectCont = document.createElement("div");
        projectCont.classList.add("projectCont");
        indivPCont.appendChild(projectCont);

        let nameCont = document.createElement("div");
        nameCont.classList.add("nameCont", `${(DOM.projectCounter) - 1}`);
        projectCont.appendChild(nameCont);

        let name = document.createElement("span");
        name.classList.add("indivProject");
        name.textContent = projects.allProjects[(projects.allProjects.length) - 1].name;
        nameCont.appendChild(name);

        let deleteCont = document.createElement("div");
        deleteCont.classList.add("deleteCont");

        let deleteBTN = document.createElement("button");
        deleteBTN.classList.add("delete", `${(DOM.projectCounter) - 1}`);
        deleteBTN.textContent = "X";
        deleteCont.appendChild(deleteBTN);
        projectCont.appendChild(deleteCont);
    }

    function createTodoCont() {
        
        let todoCont = document.createElement("div");
        todoCont.classList.add("todoCont");
        indivTodoCont.appendChild(todoCont);

        let nameCont = document.createElement("div");
        nameCont.classList.add("todoNameCont", `${(DOM.todoCounter) - 1}`);
        todoCont.appendChild(nameCont);

        let name = document.createElement("span");
        name.classList.add("indivTodo");
        name.textContent = projects.allProjects[projects.lastProject].todos[(projects.allProjects[projects.lastProject].todos.length) - 1].name;
        nameCont.appendChild(name);

        let deleteCont = document.createElement("div");
        deleteCont.classList.add("deleteTodoCont");

        let deleteBTN = document.createElement("button");
        deleteBTN.classList.add("deleteTodo", `${(DOM.todoCounter) - 1}`);
        deleteBTN.textContent = "X";
        deleteCont.appendChild(deleteBTN);
        todoCont.appendChild(deleteCont);
    }

    return {
        showProjectForm,
        showTodoForm,
        createProjectCont,
        createTodoCont,
        showProjectArea,
        updateProjectArea,
        projectArea,
        projectTextBox,
        clearForm,
        clearTodos,
        projectCounter,
        todoCounter,
        refreshPos,
        refreshTodoPos,
        showLeftBar,
        showRightBar,
        isLater,
        rightBar
    }
})();

const customSelect = (() => {
    /* Look for any elements with the class "custom-select": */
    var x, i, j, selElmnt, a, b, c;
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        
        for (j = 0; j < selElmnt.length; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                            for (k = 0; k < y.length; k++) {
                                y[k].removeAttribute("class");
                            }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);

})();

export default DOM;