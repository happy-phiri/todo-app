const newTodoInput = document.querySelector(".todo-input");
const todosContainer = document.querySelector(".todos");

let listOfTodos = [];

// if (listOfTodos.length < 1) {
//   document.querySelector(".todos").style.display = "none";
// } else {
//   document.querySelector(".todos").style.display = "block";
// }

newTodoInput.addEventListener("change", (e) => {
  let newTodo = {
    name: e.target.value,
    active: true,
  };
  listOfTodos.push(newTodo);
  newTodoInput.value = "";
  renderTodos();
});

const renderTodos = () => {
  if (listOfTodos.length > 0) {
    let todoItem;
    for (let todo of listOfTodos) {
      todoItem = todo.name;
    }
    todosContainer.innerHTML += `
        <li class="todo-item"><span><input type="checkbox" class="check" data-check="check"></span>${todoItem}</li>
      `;
  }
  if (listOfTodos.length < 1) {
    document.querySelector(".todos").style.display = "none";
  } else {
    document.querySelector(".todos").style.display = "block";
  }
};

document.addEventListener("click", (e) => {
  if (e.target.dataset.check) {
    checkTodoItem(e.target);
  } else if (e.target.dataset.all) {
    renderAllItems();
  } else if (e.target.dataset.active) {
    renderActiveItems();
  } else if (e.target.dataset.completed) {
    renderCompletedItems();
  } else if (e.target.dataset.clear) {
    clearCompletedItems();
  }
});

const checkTodoItem = (item) => {
  for (const todo of listOfTodos) {
    if (todo.name === item.parentElement.parentElement.innerText) {
      todo.active = !todo.active;
      item.parentElement.parentElement.classList.toggle("checked");
    }
  }
};

const renderAllItems = () => {
  todosContainer.innerHTML = "";
  for (const todo of listOfTodos) {
    if (todo.active === true) {
      todosContainer.innerHTML += `
        <li class="todo-item"><span><input type="checkbox" class="check" data-check="check"></span>${todo.name}</li>
      `;
    } else {
      todosContainer.innerHTML += `
        <li class="todo-item checked"><span><input type="checkbox" class="check" data-check="check"></span>${todo.name}</li>
      `;
    }
  }
};

const renderActiveItems = () => {
  let activeItems = listOfTodos.filter((todo) => {
    return todo.active === true;
  });

  todosContainer.innerHTML = "";

  for (const item of activeItems) {
    todosContainer.innerHTML += `
        <li class="todo-item"><span><input type="checkbox" class="check" data-check="check"></span>${item.name}</li>
      `;
  }
};

const renderCompletedItems = () => {
  let completedItems = listOfTodos.filter((todo) => {
    return todo.active === false;
  });

  todosContainer.innerHTML = "";

  for (const item of completedItems) {
    todosContainer.innerHTML += `
        <li class="todo-item checked"><span><input type="checkbox" class="check" data-check="check"></span>${item.name}</li>
      `;
  }
};

const clearCompletedItems = () => {
  listOfTodos = listOfTodos.filter((todo) => {
    return todo.active === true;
  });

  todosContainer.innerHTML = "";

  for (const todo of listOfTodos) {
    todosContainer.innerHTML += `
        <li class="todo-item"><span><input type="checkbox" class="check" data-check="check"></span>${todo.name}</li>
      `;
  }

  if (listOfTodos.length < 1) {
    document.querySelector(".todos").style.display = "none";
  } else {
    document.querySelector(".todos").style.display = "block";
  }
};

renderTodos();
