import React, {Component} from 'react';
import Modal from './components/Modal/Modal';
import './ToDo.css';

class ToDo extends Component {
    constructor() {
        super();

        this.state = {
            tasks: JSON.parse(localStorage.getItem('tasks')),
            text: '',
            time: '',
            displayModal: false,
            editedText: '',
            editedTime: '',
            editedIndex: ''
        }
    }

    showModal() {
        this.setState({
            displayModal: true
        });
    }

    hideModal() {
        this.setState({
            displayModal: false
        })
    }

    onModalTextChange(e) {
        this.setState({
            editedText: e.target.value
        });
    }

    onModalTimeChange(e) {
        this.setState({
            editedTime: e.target.value
        });
    }

    onTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    onTimeChange(e) {
        this.setState({
            time: e.target.value
        });
    }

    addTask() {
        let taskTitle = this.state.text;
        let taskTime = this.state.time;

        // if empty new task fields
        if (!taskTitle || !taskTime) {
            return false;
        }

        // create object with new task
        const newTask = {
            text: taskTitle,
            time: taskTime,
            isFinished: false
        };

        // if absent an array in local storage
        if (localStorage.getItem('tasks') === null) {
            let tasks = [];
            tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        // if there is an array in local storage
        else {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.push(newTask);
            // sort tasks by time
            tasks = this.constructor.sortTasks(tasks);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // update state
        this.setState({
            tasks: JSON.parse(localStorage.getItem('tasks')),
            text: '',
            time: ''
        });
    }

    deleteTask(e) {
        let index = e.target.getAttribute('data-key');
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.splice(index, 1);

        this.setState({
            tasks: tasks
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    editTask(e) {
        let key = e.target.getAttribute('data-key');

        this.showModal();

        this.setState({
            editedIndex: key
        })
    }

    editModalTask() {
        let currentText = this.state.editedText;
        let currentTime = this.state.editedTime;
        let currentIndex = this.state.editedIndex;

        let tasks = JSON.parse(localStorage.getItem('tasks'));

        tasks[currentIndex].text = currentText;
        tasks[currentIndex].time = currentTime;

        tasks = this.constructor.sortTasks(tasks);

        this.setState({
            tasks: tasks,
            displayModal: false,
            editedText: '',
            editedTime: '',
            editedIndex: ''
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    finishTask(e) {
        let index = e.target.getAttribute('data-key');
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks[index].isFinished = !tasks[index].isFinished;

        this.setState({
            tasks: tasks
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // sort tasks by time (additional method)
    static sortTasks(arr) {
        return arr.sort( (a, b) => a.time === b.time ? 0 : +(a.time > b.time) || -1 );
    };

    render() {
        const todoList = this.state.tasks !== null && JSON.parse(localStorage.getItem('tasks')).length !== 0 ? (
            this.state.tasks.map((task, index) => {
                const taskItemClasses = task.isFinished ? 'tasks__item is-finished' : 'tasks__item';

                return (
                    <div className={taskItemClasses} key={index}>
                        <div className="tasks__time">{task.time}</div>
                        <div className="tasks__text">{task.text}</div>
                        <div className="tasks__buttons">
                            <input type="button" className="tasks__delete" value="delete" onClick={this.deleteTask.bind(this)} data-key={index} />
                            <input type="button" className="tasks__edit" value="edit" onClick={this.editTask.bind(this)} data-key={index} />
                            <input type="button" className="tasks__finished" value={task.isFinished ? 'done' : 'not done'} onClick={this.finishTask.bind(this)} data-key={index} />
                        </div>
                    </div>
                )
            })
        ) : (
            <p className="tasks__empty">There are no tasks at the moment</p>
        );

        // get a current date for display in the title
        const currentDate = new Date().toLocaleDateString();

        // data for a block with statistic
        const allTasksCount = this.state.tasks !== null ? this.state.tasks.length : 0;

        const activeTasksCount = this.state.tasks !== null ? this.state.tasks.filter(item => {
            return !item.isFinished;
        }).length : 0;

        const doneTasksCount = this.state.tasks !== null ? this.state.tasks.filter(item => {
            return item.isFinished;
        }).length : 0;

        return (
            <React.Fragment>
                <div className="app__header">
                    <h3 className="app__title">My To Do list on {currentDate}</h3>
                </div>
                <div className="app__body">
                    <div className="app__timeline tasks">
                        {todoList}
                    </div>
                    <div className="app__form">
                        <div className="app__controls">
                            <label htmlFor="taskTitle" className="app__label">Title:</label>
                            <input type="text" className="app__input" id="taskTitle" placeholder="task name" onChange={this.onTextChange.bind(this)} value={this.state.text} />
                            <label htmlFor="taskTime" className="app__label">Time:</label>
                            <input type="time" className="app__input" id="taskTime" onChange={this.onTimeChange.bind(this)} value={this.state.time} />
                            <input type="button" className="app__add-button" value="Add" onClick={this.addTask.bind(this)} />
                        </div>
                        <div className="app__statistic">
                            <div className="app__active">Active: {activeTasksCount}</div>
                            <div className="app__done">Done: {doneTasksCount}</div>
                            <div className="app__all">All: {allTasksCount}</div>
                        </div>
                    </div>
                    <Modal
                        display={this.state.displayModal}
                        hideModal={this.hideModal.bind(this)}
                        onModalTextChange={this.onModalTextChange.bind(this)}
                        editedText={this.state.editedText}
                        onModalTimeChange={this.onModalTimeChange.bind(this)}
                        editedTime={this.state.editedTime}
                        edit={this.editModalTask.bind(this)}
                    />
                </div>
            </React.Fragment>
        )
    }

}

export default ToDo;