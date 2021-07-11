import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { Task } from '../components/TaskItem';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(tasks.find(item => item.title === newTaskTitle)){
      Alert.alert(
        "Task já cadastrada", 
        "Você não pode cadastrar uma task com o mesmo nome"
      );

    }else{
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }

      setTasks(oldState => [...oldState, newTask])
    }
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(item => {
      if(item.id === id){
        item.done = item.done ? false : true;
      }

      return item;
    });

    setTasks(updateTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item ?",
      [
        {
          text: "Não"
        },
        {
          text: "Sim",
          onPress: () => {
            const removeTask = tasks.filter(item => {
              if(item.id !== id){
                return item;
              }
            });
        
            setTasks(removeTask);
          }
        }
      ]
    );
  }

  function handleEditTask(id: number, newTaskTitle: string) {
    const updateTask = tasks.map(item => {
      if(item.id === id){
        item.title = newTaskTitle;
      }

      return item;
    });

    setTasks(updateTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})