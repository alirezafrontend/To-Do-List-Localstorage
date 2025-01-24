const inp = document.querySelector("#new-task > input");
const add = document.querySelector("#add");
const divTasks = document.querySelector("#tasks");

window.onload = function () {
  inp.focus();
};

let dataBase = [];

// get local

let _data = localStorage.getItem("data");
if (_data == null) {
  dataBase = [];
} else {
  dataBase = JSON.parse(_data);
  dataBase.forEach((val) => {
    const div = document.createElement("div");
    div.classList.add("task");
    div.innerHTML = val.div;
    divTasks.appendChild(div);

    const editBtn = div.querySelector(".edit");
    const delBtn = div.querySelector(".delete");

    editBtn.addEventListener("click", edit);
    delBtn.addEventListener("click", remove);
  });
}

// update

function updateLocalStorage() {
  const tasks = document.querySelectorAll(".task");
  dataBase = [];
  tasks.forEach((task) => {
    const locTask = {
      div: task.innerHTML,
    };
    dataBase.push(locTask);
  });
  localStorage.setItem("data", JSON.stringify(dataBase));
}

// delete

function remove(e) {
  const taskDiv = e.target.closest(".task");
  if (taskDiv) {
    taskDiv.remove();
    updateLocalStorage();
  }
}

// edit

function edit(e) {
  const taskSpan = e.target.closest(".task").querySelector("span");
  if (taskSpan) {
    if (taskSpan.isContentEditable) {
      if (taskSpan.innerText != "") {
        taskSpan.contentEditable = false;
        e.target.innerHTML = `<i class="fa fa-pen-to-square"></i>`;
        updateLocalStorage();
      } else {
        taskSpan.focus();
      }
    } else {
      e.target.innerHTML = `<i class="fa fa-check"></i>`;
      taskSpan.contentEditable = true;
      taskSpan.innerText = "";
      taskSpan.focus();

      taskSpan.addEventListener("keydown", (e) => {
        if (taskSpan.innerText.length >= 30 && e.key !== "Backspace") {
          e.preventDefault();
        }
      });
    }
  }
}

// add

add.addEventListener("click", () => {
  if (inp.value != "") {
    // creat div  =>

    const div = document.createElement("div");
    div.classList.add("task");
    div.innerHTML = `<span>${inp.value}</span>`;

    // creat edit =>

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.innerHTML = `<i class="fa fa-pen-to-square"></i>`;
    div.appendChild(editBtn);

    editBtn.addEventListener("click", edit);

    // creat del =>

    const delBtn = document.createElement("button");
    delBtn.classList.add("delete");
    delBtn.innerHTML = `<i class="fa fa-trash"></i>`;
    div.appendChild(delBtn);

    delBtn.addEventListener("click", remove);

    //

    divTasks.appendChild(div);

    // local storage

    // const locTask = {
    //   div: div.innerHTML,
    // };

    // dataBase.push(locTask);
    // localStorage.setItem("data", JSON.stringify(dataBase));

    updateLocalStorage();
    //

    inp.value = "";
    inp.focus();
  }
});
