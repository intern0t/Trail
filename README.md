# Trail
Trail is a personal, open-source project developed using ReactJS which is intended to track your task completion at a given time, creating a collection of logs by the end of the day for you to be proud of.

---

### Remaining Task(s)
1. Button **functionalities** for our task entry/entries.
    * [x] Delete task
    * [x] Complete task
        * [x] Marks as complete.
            * [x] Log the completion timestamp, **displayed on hover on Completed tag**.
    * [x] Edit task
2. Storing our tasks.
    * [x] Store our tasks in `localStorage`. I'll probably use this permanently as I have JSON Import/Export functionality planned. (*Remote storage, possible.*)
    * [ ] Import and Export functionalities.
        * [x] Exporting our Tasks with a filename of current date. (*Example: 2018-06-01.json*)
        * [ ] Importing a pre-exported Tasks file (.**json**)
            * [ ] Create drag & drop option?
            * [ ] Parse through our <Tasks>.json file and set our Tasks.
            * [ ] Update `localStorage`.
3. Reset all Tasks.
    * [x] Reset `localStorage`.
    * [x] Reset `state`. 
4. * [ ] Count total tasks in each categories and display it.
5. Achievement system.
    * ~~Progressive and adaptive, more achievements unlocked per day on task completion or addition of tasks.~~ **Difficult**
6. Customize option
    * [ ] Themes
    * [ ] Import/Export options.
    * [ ] Unique tasks/day setup (**toggle-able**)
7. Responsiveness
    * [ ] Fix responsiveness inside the task container.
    * [ ] Sidebar, reduce icon size?
8. ...

***

#### Libraries used
1. [Ant Design's ](http://ant.design/) [React UI library](http://ant.design/docs/react/introduce)

#### Contents used
1. [Icons8 icons](https://icons8.com/)

#### Tools used
1. [Visual Studio Code](https://code.visualstudio.com/)
2. [VIM](https://en.wikipedia.org/wiki/Vim_(text_editor))
3. [Yarn](https://yarnpkg.com/en/)
4. [gh-pages module](https://www.npmjs.com/package/gh-pages)