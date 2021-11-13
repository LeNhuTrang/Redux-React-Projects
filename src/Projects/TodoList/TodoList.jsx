
import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { DarkTheme } from "./Themes/DarkTheme";
import { LightTheme } from "./Themes/LightTheme";
import { PrimaryTheme } from "./Themes/PrimaryTheme";
import { Container } from "./Components/Container";
import { Dropdown } from "./Components/Dropdown";
import { Button } from "./Components/Button";
import { Table, Th, Tr, Td, Thead, Tbody } from "./Components/Table";
import { TextField, Label, Input } from "./Components/TextField";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "./Components/Heading";
import { connect } from "react-redux";
import { createAction } from "../../store/actions";
import { actionType } from "../../store/actions/type";
import { arrTheme } from "./Themes/ThemeManager";

class TodoList extends Component {
  state = {
    taskName: "",
    disabled: true,
  };

  handleSetCompleted = (id) => {
    let cloneTaskList = [...this.props.taskList];
    let foundIndex = cloneTaskList.findIndex((item) => item.id === id);
    if (foundIndex !== -1) cloneTaskList[foundIndex].done = true;

    this.props.dispatch(createAction(actionType.SET_TASK, cloneTaskList));
   
  };

  renderTasksToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, i) => {
        return (
          <Tr key={i}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => this.handleSetCompleted(task.id)}
                className="ml-1"
              >
                <i className="fa fa-check"></i>
              </Button>
              {/* EDIT BUTTON*/}
              <Button
                onClick={() => {
                  this.setState(
                    { taskName: task.taskName, disabled: false },
                    () => {
                      this.props.dispatch(
                        createAction(actionType.EDIT_TASK, task)
                      );
                    }
                  );
                }}
                className="ml-1"
              >
                <i className="fa fa-edit"></i>
              </Button>
              {/* DELETE */}
              <Button
                onClick={() => {
                  let cloneTaskList = [...this.props.taskList];
                  let listAfterDeleted = cloneTaskList.filter(
                    (taskItem) => taskItem.id !== task.id
                  );

                  this.props.dispatch(
                    createAction(actionType.SET_TASK, listAfterDeleted)
                  );
                }}
                className="ml-1"
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };
  renderTasksCompleted = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, i) => {
        return (
          <Tr key={i}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  let cloneTaskList = [...this.props.taskList];
                  let listAfterDeleted = cloneTaskList.filter(
                    (taskItem) => taskItem.id !== task.id
                  );

                  this.props.dispatch(
                    createAction(actionType.SET_TASK, listAfterDeleted)
                  );
                }}
                className="ml-1"
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  handleAddTask = () => {
    let { taskName } = this.state;

    let cloneTaskList = [...this.props.taskList];

    let newTask = {
      id: Date.now(),
      taskName: taskName,
      done: false,
    };

    console.log(newTask);

    if (newTask.taskName === "") {
      alert("Task name is required");
      return cloneTaskList;
    }

    let index = cloneTaskList.findIndex(
      (item) => item.taskName === newTask.taskName
    );

    if (index === -1) {
      cloneTaskList.push(newTask);
    } else {
      alert("task name already exists!");
      return cloneTaskList;
    }

    this.props.dispatch(createAction(actionType.SET_TASK, cloneTaskList));
  };

  handleUpdateTask = () => {
    let cloneEdittedTask = { ...this.props.taskEdit };
    let cloneTaskList = [...this.props.taskList];

    let index = cloneTaskList.findIndex(
      (item) => item.id === cloneEdittedTask.id
    );

    if (index !== -1) {
      cloneTaskList[index].taskName = this.state.taskName;
    }

    this.props.dispatch(createAction(actionType.SET_TASK, cloneTaskList));

    this.setState({
      disabled: true,
      taskName: "",
    });
  };

  renderTheme = () => {
    return arrTheme.map((item, i) => {
      return (
        <option key={i} value={item.id}>
          {item.name}
        </option>
      );
    });
  };

  handleSwitchTheme = (e) => {
    let currentTheme = this.props.theme;

    let { value } = e.target;

    let chosenTheme = arrTheme.find((item) => item.id == value);

    this.props.dispatch(
      createAction(
        actionType.SWITCH_THEME,
        chosenTheme ? chosenTheme.theme : currentTheme
      )
    );
  };

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
          <h2 className="text-center mt-3 font-weight-bold">PROJECT OF TO-DO-LIST</h2>
        <Container className="w-50 mt-3">
          <Dropdown onChange={this.handleSwitchTheme}>
            {this.renderTheme()}
          </Dropdown>
          <Heading3 className="font-weight-bold mt-2">To Do List</Heading3>
          <TextField
            value={this.state.taskName}
            name="taskName"
            onChange={(e) => {
              this.setState(
                {
                  taskName: e.target.value,
                },
                () => {
                  console.log(this.state);
                }
              );
            }}
            label="Task name"
            className="w-50"
          ></TextField>

          {this.state.disabled && (
            <Button onClick={this.handleAddTask} className="ml-2">
              <i className="fa fa-plus"></i> Add tasks
            </Button>
          )}

          {!this.state.disabled && (
            <Button onClick={this.handleUpdateTask} className="ml-2">
              <i className="fa fa-upload"></i> Update tasks
            </Button>
          )}

          <hr />
          <Heading3>Tasks to do</Heading3>
          <Table>
            <Thead>{this.renderTasksToDo()}</Thead>
          </Table>

          <Heading3>Tasks completed</Heading3>
          <Table>
            <Thead>{this.renderTasksCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.todoListReducer.theme,
    taskList: state.todoListReducer.taskList,
    taskEdit: state.todoListReducer.taskEdit,
  };
};
export default connect(mapStateToProps)(TodoList);
