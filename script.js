const taskList = [];
const badList = [];
const weekHrs = 7 * 24;
const taskListElm = document.getElementById("task-list");
const badListElm = document.getElementById("bad-list");
const handleOnSubmit = (e) => {
  //   console.log(e);
  const frmDt = new FormData(e);
  const task = frmDt.get("task");
  const hr = +frmDt.get("hr");

  if (hr < 1) return;

  //   having same name and value you can only write one
  const obj = {
    task,
    hr,
  };

  const ttlHr = taskTotalHr();
  //   const ttlBadHr = badTotalHr();

  if (ttlHr + hr > weekHrs) {
    return alert("You have exceeded the weekly hours");
  }

  //   console.log(task, hr);
  taskList.push(obj);
  display();

  taskTotalHr();

  //   console.log(taskList);
};

// display tasklist
const display = () => {
  let str = "";

  // loop through the task list and convert into tr string
  taskList.map((item, i) => {
    str += `<tr>
                    <td><input type="checkbox" name="" id="" /></td>
                    <td>${item.task}</td>
                    <td>${item.hr}</td>
                    <td>
                      <button class="btn btn-danger" onclick="deleteTaskList(${i})">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                      <button class="btn btn-success"  onclick="markAsNotToDo(${i})">
                        <i class="fa-solid fa-circle-right"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>`;
  });
  console.log(str);
  taskListElm.innerHTML = str;
  taskTotalHr();
};

// display bad list
const displayBadList = () => {
  let str = "";
  badList.map((item, i) => {
    str += `<tr>
                    <td><input type="checkbox" name="" id="" /></td>
                    <td>${item.task}</td>
                    <td>${item.hr}</td>
                    <td>
                      <button class="btn btn-danger" onclick="deleteBadList(${i})">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                      <button class="btn btn-warning" onclick="markAsTask(${i})">
                        <i class="fa-solid fa-circle-left"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>`;
    console.log(i);
  });
  //   console.log(str);
  badListElm.innerHTML = str;

  badTotalHr();
  taskTotalHr();
};

// delete item
const deleteTaskList = (i) => {
  const itm = taskList.splice(i, 1);
  display();
  // taskTotalHr();
  return itm[0];
};

// delete bad item
const deleteBadList = (i) => {
  const itm = badList.splice(i, 1);
  displayBadList();
  //   taskTotalHr();

  return itm[0];
};
// slide item
const markAsNotToDo = (i) => {
  const badItm = deleteTaskList(i);
  badList.push(badItm);
  displayBadList();
  taskTotalHr();
};

// mark task as task item
const markAsTask = (i) => {
  const badItm = deleteBadList(i);
  console.log(badItm);
  taskList.push(badItm);
  display();
};

// display total hour
const taskTotalHr = () => {
  const total = taskList.reduce((a, c) => a + c.hr, 0);
  const ttlBadHrs = badTotalHr();
  const grandTotal = total + ttlBadHrs;
  document.getElementById("total-hr").innerHTML = grandTotal;
  return total + ttlBadHrs;
};
// display bad hour
const badTotalHr = () => {
  const total = badList.reduce((a, c) => a + c.hr, 0);
  document.getElementById("bad-hr").innerHTML = total;
  return total;
};
