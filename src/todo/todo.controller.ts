import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { addTodoDto } from './dto/add-todo.dto';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.dto';

@Controller('todo')
export class TodoController {
  constructor() {
    this.todos = [];
  }

  todos: Todo[];

  @Get()
  getTodos(
    @Query() myQueriesParams: GetPaginatedTodoDto;
  ) {
    console.log(myQueriesParams)
    return this.todos;
  }

  @Get(':id')
  getTodoById(
    @Param('id') id //This id is type string
  ) {
    const todo = this.todos.find((actualTodo:Todo) => actualTodo.id === +id) //do we add + to make it an int 
    if(todo)
      return todo;
    else
      throw new NotFoundException(`Le todo d'id ${id} n'est pas trouvé`);
  }

  @Post()
  addTodo(@Body() newTodo: addTodoDto) {
    const todo = new Todo();
    const {name, description} = newTodo;
    todo.name = name;
    todo.description = description;
    if (this.todos.length) {
      todo.id = Number(this.todos[this.todos.length - 1].id) + 1;
    } else {
      todo.id = 1;
    }
    this.todos.push(todo);
    return newTodo;
  }

  //delete un todo via son id
  @Delete(':id')
  deleteTodo(
    @Param('id') id
  ) {
    //chercher l'objet via son index
    const index = this.todos.findIndex((todo) => todo.id === +id);
    //utiliser la methode splice pour supprimer le todo
    if(index>0)
      this.todos.splice(index,1);
    else
      throw new NotFoundException("Le todo spécifié n'est pas dans la listes des todos");
    //Declencher une erreur
    return {
      message: `Le todo d'id ${id} a été supprimé`,
      count: 1
    }
  }

  @Put(':id')
  modifierTodo(
    @Param('id') id,
    @Body() newTodo: Partial<addTodoDto>
  ) {
    const todo = this.getTodoById(id);
    todo.description = newTodo.description? newTodo.description : todo.description;
    todo.name = newTodo.name? newTodo.name : todo.name;
    return todo;
  }
}
