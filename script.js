var btn = document.getElementById('sumbit');
var inputfield = document.getElementById('task');

inputfield.addEventListener('keyup', function (e) {
    if (e.code === "Enter") {
        btn.click();
    }
});

if (localStorage.getItem('TodoList') === "") {
    var arr = [];
} else {
    var arr = JSON.parse(localStorage.getItem('TodoList'));
    displayData();
}

btn.addEventListener("click", function(){
    var input = document.getElementById('task').value;
    var obj = {}
    obj.task = input;
    obj.checked = "0";

    arr.push(obj);

    if (input != '') {
        localStorage.setItem("TodoList", JSON.stringify(arr));
        displayData();
    } else {
        alert("Please write a task");
    }
});

function displayData() {
    var root = document.getElementById('root');
    root.textContent = "";

    arr.forEach((task, index) => {
        var para = document.createElement("p");
        var input = document.createElement("input");
        input.type = "checkbox";

        if (task.checked === "1") {
            input.checked = true;
            var del = document.createElement("del");
            del.textContent = task.task;
            para.append(del);
        } else {
            para.textContent = task.task;
        }

        var span = document.createElement("span");
        span.textContent = "X";
        para.append(input, span);
        root.append(para);

        span.addEventListener("click", function () {
            arr.splice(index, 1);
            localStorage.setItem("TodoList", JSON.stringify(arr));
            para.remove();
        });

        input.addEventListener("change", function () {
            task.checked = input.checked ? "1" : "0";
            localStorage.setItem("TodoList", JSON.stringify(arr));
        });
    });
}
