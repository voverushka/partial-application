const tasks = new Set([
    "Task1", "Task2", "Task3", "Task4"
]);

const getTasks = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Array.from(tasks));
        }, 500);
    });
}


const addTask = (task: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            tasks.add(task);
            resolve(Array.from(tasks));
        }, 500);
    });
}

export default {
    getTasks,
    addTask
}