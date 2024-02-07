import { useState, useEffect, useCallback } from 'react';
import { Formik, FormikProps } from 'formik';
import Styled from "../shared/Styled";
import TasksService from "../api-client/Tasks";

interface AddTasksFormContentProps {
    tasks: string[];
    onAddTask: (newTask: string) => void;
}

interface FormValues {
    selectedTask: string;
    personName: string;
}

interface FormContainerProps {
    content: (formikProps: FormikProps<FormValues>) => JSX.Element;
    headerText: string;
    initialValues: FormValues
}

// componentProps + formikProps
interface AddTasksProps {
    componentProps: AddTasksFormContentProps;
    formikProps: FormikProps<FormValues>;
}

const AddTasksForm = (props: AddTasksProps) => {
    const { formikProps, componentProps } = props;
    const { handleChange } = formikProps;

    const [newTask, setNewTask] = useState<string>('');

    return <Styled.FormContent>
        <label
            htmlFor="person"
            style={{
                marginBottom: "10px"
            }}
        >
            Person name
        </label>
        <Styled.SimpleInput
            id="person"
            name="personName"
            value={formikProps.values.personName ?? formikProps.initialValues.personName}
            type="text"
            onChange={handleChange}
        />
        <label
            htmlFor="tasks"
            style={{
                marginBottom: "10px"
            }}
        >
            Tasks
        </label>
        <Styled.SimpleSelect
            id="tasks"
            name="selectedTask"
            value={formikProps.values.selectedTask ?? formikProps.initialValues.selectedTask}
            onChange={handleChange}
        >
            {componentProps.tasks.map(t =>
                <option key={t} value={t}>{t}</option>
            )}
        </Styled.SimpleSelect>
        <Styled.AddTaskSection>
            <Styled.SimpleInput
                value={newTask}
                onChange={(e: any) => {
                    setNewTask(e.target.value);
                }}
                placeholder='Task name' />
            <Styled.SimpleButton
                disabled={!newTask}
                onClick={() => {
                    if (newTask) {
                        componentProps.onAddTask(newTask);
                    }
                }}
            >
                Add new task
            </Styled.SimpleButton>
        </Styled.AddTaskSection>
        <Styled.DetailsSection>
            <summary>Test section</summary>
            <p>If you add new task, this section will NOT collapse.</p>
        </Styled.DetailsSection>
    </Styled.FormContent>
}

export const getAddTasksFormContent = (props: AddTasksFormContentProps) =>
    (formikProps: FormikProps<FormValues>) => {
        return <AddTasksForm componentProps={props} formikProps={formikProps} />
    }

// usage
const FormContainer = (props: FormContainerProps) => {
    return <Styled.Card>
        <p style={{ padding: "20px" }}>In this case, form content component is called as a function.
            Expand Test section, add new task. Test section shouldnot collapse</p>
        <Formik
            enableReinitialize={true}
            initialValues={props.initialValues}
            onSubmit={(values) => { alert("Submitting " + JSON.stringify(values)); }}
        >
            {(formikProps: FormikProps<any>) => {
                const [count, setCount] = useState(0);
                // if (count < 3) {
                const formContent = props.content;
                return <>
                    <Styled.Header>
                        <h3>{props.headerText}</h3>
                        <h5>{`Times submitted ${count}`}</h5>
                    </Styled.Header>
                    <Styled.Content>{formContent(formikProps)}</Styled.Content>
                    <Styled.Footer>
                        <Styled.SimpleButton
                            type="submit"
                            onClick={() => {
                                formikProps.handleSubmit();
                                setCount(count + 1);
                            }}>
                            Submit
                        </Styled.SimpleButton>
                    </Styled.Footer>
                </>
                // } else {
                //     return <div>You cannot submit anymore</div>
                // }
            }
            }
        </Formik>
    </Styled.Card>
}

const Example = () => {
    const [tasks, setTasks] = useState<string[]>([]);

    useEffect(() => {
        TasksService.getTasks().then((tasks: string[]) => {
            setTasks(tasks);
        });
    }, []);

    const onAddTask = useCallback((newTask: string) => {
        TasksService.addTask(newTask).then(allTasks => {
            // new list of tasks came back
            setTasks(allTasks);
        });
    }, []);

    return <FormContainer
        headerText='Assign Task'
        initialValues={{
            personName: "Alma",
            selectedTask: tasks[1]
        }}
        content={getAddTasksFormContent({
            onAddTask,
            tasks
        })}
    />
}

export default Example;

