class Todolist{
    constructor(){
        this.todolist = [
            {
                text: 'Default Todo',
                completed: true,
            },
            {
                text: "Membuat TodoList App",
                completed: false,
            }
        ];
        this.initializeElements();
        this.initializeForm();
        this.displayTodolist();
        this.initializeEventListeners();
    }

    initializeElements(){
        this.todoInput = document.getElementById('todoInput');
        this.todoBody = document.getElementById('todolistBody');
        this.todoTemplate = document.getElementById('todoItem');
        this.status = document.getElementById('status');
        this.searchInput = document.getElementById('searchTodo');
        this.filter = document.getElementById('filter');
        this.allButton = this.filter.querySelector('[name="all"]');
        this.completedButton = this.filter.querySelector('[name="completed"]');
        this.activeButton = this.filter.querySelector('[name="active"]');
    }

    initializeEventListeners(){
        this.searchInput.onkeydown = () => {
            this.displayTodolist();
        };
        this.searchInput.onkeyup = () => {
            this.displayTodolist();
        };

        this.completedButton.onclick = () => {
            this.todolist = this.todolist.filter(todo => todo.completed);
            this.displayTodolist();
        }

        this.activeButton.onclick = () => {
            this.todolist = this.todolist.filter(todo => !todo.completed);
            this.displayTodolist();
            this.todolist = this.todolist;
        }
    }

    initializeForm(){
        document.forms['todoForm'].onsubmit = (event) => {
            event.preventDefault();
            this.addTodo();
            console.log(this.todolist);
            document.forms['todoForm'].reset();
        }
    }

    addTodo(){
        const todoText = this.todoInput.value.trim();
        if(!todoText) return;

        const todo = {
            text: todoText,
            completed: false,
        }

        this.todolist.push(todo);
        this.displayTodolist();
    }

    toggleTodo(index, event){
        const todo = this.todolist[index];
        if(!todo) return;

        todo.completed = event.target.checked;
        const todoText = event.target.nextElementSibling;
        if(todo.completed) {
            this.completedTodos();
            this.pendingTodos();
            event.target.checked
            todoText.classList.add('line-through');
        } else {
            this.completedTodos();
            this.pendingTodos();
            todoText.classList.remove('line-through');
        }
        // console.log(todo);
    }

    addTodoItem(index, todo){
        const todoItem = this.todoTemplate.cloneNode(true);

        const todoTextKonten = todoItem.querySelector('[name="todoText"]');
        todoTextKonten.textContent = todo.text;
      
        if(todo.completed){
            todoTextKonten.classList.add('line-through');
        }

        //Event Listener Checkbox On Change 
        const checkbox = todoItem.querySelector('input[type="checkbox"]');
        checkbox.checked = todo.completed;
        checkbox.onchange = (event) => {
            this.toggleTodo(index, event);
        }

        //Event Listener Delete On Click
        const deleteButton = todoItem.querySelector('#delete-btn');
        deleteButton.onclick = () => {
            this.deleteTodo(index);
        }

        //Event Listener Update On click
        const updateButton = todoItem.querySelector('#update-btn');
        updateButton.onclick = () => {
            this.updateTodo(index, todo);
        }

        this.todoBody.appendChild(todoItem);
    }

    // Func Clear Todo
    clearTodoitem(){ 
        while(this.todoBody.firstChild){
            this.todoBody.removeChild(this.todoBody.firstChild);
        }
    }

    // Func Delete
    deleteTodo(index){
        this.todolist.splice(index,1);
        this.displayTodolist();
    }

    // Func Update
    updateTodo(index, todo){
        const newText = prompt(`Update Todo : ${todo.text}`);

        if(newText.trim() !== ''){
            this.todolist[index] = {
                text: newText,
                completed: todo.completed
            };
        }

        this.displayTodolist();
    }

    displayTodolist(){
        this.emptyState();
        this.totalTodos();
        this.pendingTodos();
        this.completedTodos();
        this.clearTodoitem();

        for(let i = 0; i < this.todolist.length; i++){
            const todo = this.todolist[i];

            const searchText = this.searchInput.value.toLowerCase();
            console.log(searchText);
            
            if(todo.text.toLowerCase().includes(searchText)){
                this.addTodoItem(i, todo);
            }
        }
    }

    emptyState(){
        const emptyState = document.getElementById('emptyState');
    
        if(this.todolist.length == 0 ){
            emptyState.classList.remove('hidden');
        }else {
            emptyState.classList.add('hidden');
        }

        // this.displayTodolist();
    }

    totalTodos() {
        const totalTodos = this.status.querySelector('[name="totalTodos"]');
        totalTodos.textContent = this.todolist.length;
    }

    completedTodos(){
        const completedTodos = this.status.querySelector('[name="completedTodos"]');
        const completed = this.todolist.filter(todo => todo.completed);
        completedTodos.textContent = completed.length;
    }

    pendingTodos(){
        const pendingTodos = this.status.querySelector('[name="pendingTodos"]');
        const todoCount = document.getElementById('todoCount');
        const pending = this.todolist.filter(todo => !todo.completed);
        pendingTodos.textContent = pending.length; 
        todoCount.textContent = pending.length;
    }
    
    
}

export default Todolist;