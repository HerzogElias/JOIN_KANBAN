let tasks = [];
let amountTasksToDo;
let amountTasksInProgress;
let amountTasksFeedback;
let amountTasksDone;
let amountTasksUrgent;

/**
 * Initializes the summary by loading tasks from the database and rendering summary and greeting.
 * This function calls `init()`, loads tasks, calculates the number of tasks in various states,
 * and renders the summary and greeting components. It also hides the greeting after a delay.
 * 
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when all initialization tasks are complete.
 */
async function initSummary() {
    init();
    tasks = Object.values(await loadFromDatabase(`tasks`));
    getNumberOfTasks();
    renderSummary();
    renderGreeting();
    hideGreeting();
}

/**
 * Calculates the number of tasks in various states and priorities.
 * This function updates global variables to reflect the count of tasks in different statuses
 * (to-do, progress, feedback, done) and priorities (urgent).
 * 
 * @function
 * @returns {void}
 */
function getNumberOfTasks() {
    amountTasksToDo = tasks.filter(t => t[`status`] == 'to-do').length;
    amountTasksInProgress = tasks.filter(t => t['status'] == 'progress').length;
    amountTasksFeedback = tasks.filter(t => t[`status`] == 'feedback').length;
    amountTasksDone = tasks.filter(t => t[`status`] == 'done').length;
    amountTasksUrgent = tasks.filter(t => t[`priority`] == 'urgent').length;
}

/**
 * Renders the summary content into the element with the ID 'summary-content'.
 * This function sets the inner HTML of the summary content element to the HTML generated by
 * `getSummaryHTML()`.
 * 
 * @function
 * @returns {void}
 */
function renderSummary() {
    let content = document.getElementById('summary-content');
    content.innerHTML = getSummaryHTML();
}

/**
 * Renders the greeting content into the elements with the IDs 'greeting' and 'greeting-overlay'.
 * This function sets the inner HTML of both elements to the HTML generated by `getGreetingHTML()`.
 * 
 * @function
 * @returns {void}
 */
function renderGreeting() {
    document.getElementById('greeting').innerHTML = getGreetingHTML();
    document.getElementById('greeting-overlay').innerHTML = getGreetingHTML();
}

/**
 * Hides the greeting overlay after a delay.
 * This function adds the 'd-none' class to the greeting overlay element to hide it, with a delay
 * of 1500 milliseconds.
 * 
 * @function
 * @returns {void}
 */
function hideGreeting() {
    setTimeout(() => {
        document.getElementById('greeting-overlay').classList.add('d-none');        
    }, 1500);
}
