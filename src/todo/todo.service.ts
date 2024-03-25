import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { addTodoDto } from './dto/add-todo.dto';

@Injectable()
export class TodoService {
  todos: Todo[] = [];

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(newTodo: addTodoDto): Todo {
    const { name, description } = newTodo;
    let id;
    if (this.todos.length) {
      id = Number(this.todos[this.todos.length - 1].id) + 1;
    } else {
      id = 1;
    }

    const todo = {
      id,
      name,
      description,
      createdAt: new Date(),
    } as Todo & { createdAt: Date };

    this.todos.push(todo);
    return todo;
  }

  getTodoById(id: number): Todo {
    const todo = this.todos.find((actualTodo:Todo) => actualTodo.id === id) //do we add + to make it an int 
    if(todo)
      return todo;
    else
      throw new NotFoundException(`Le todo d'id ${id} n'est pas trouvé`);
  }

  deleteTodo(id: number){
    //chercher l'objet via son index
    const index = this.todos.findIndex((todo) => todo.id === id);
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

  updateTodo(id: number, newTodo: Partial<addTodoDto>) {
    const todo = this.getTodoById(id);
    todo.description = newTodo.description? newTodo.description : todo.description;
    todo.name = newTodo.name? newTodo.name : todo.name;
    return todo;
  }
}
