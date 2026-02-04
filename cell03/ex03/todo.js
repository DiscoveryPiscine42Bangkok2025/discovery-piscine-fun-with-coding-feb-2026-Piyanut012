var ft_list = document.getElementById('ft_list');

function newTodo() {
    var text = prompt("สิ่งที่อยากทำ:");
    if (text && text.trim() !== "") {
        addTodo(text);
        saveTodoList();
    }
}

function addTodo(text) {
    var div = document.createElement("div");
    div.innerHTML = text;
    div.onclick = function () {
        if (confirm("ต้องการจะลบสิ่งที่อยากทำไหม?")) {
            this.remove();
            saveTodoList(); 
        }
    };

    ft_list.prepend(div);
}

function saveTodoList() {
    var todos = [];
    var items = ft_list.children;
    
    for (var i = 0; i < items.length; i++) {
        todos.push(items[i].innerHTML);
    }

    var date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toUTCString();

    document.cookie = "ft_list" + "=" + (JSON.stringify(todos) || "") + expires + "; path=/";
}

window.onload = function () {
    var list = document.cookie.split('; ').find(row => row.startsWith("ft_list" + '='))?.split('=')[1];
    
    if (list) {
        var todos = JSON.parse(list);

        for (var i = todos.length - 1; i >= 0; i--) {
            addTodo(todos[i]);
        }
    }
};