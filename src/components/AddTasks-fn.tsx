import { useState, useEffect, useCallback } from 'react';
import { Formik, FormikProps } from 'formik';
import Styled from "../shared/Styled";
import TasksService from "../api-client/Tasks";

interface AddTasksFormContentProps {
    tasks: string[];
    onAddTask: (newTask: string) => void;
}

interface FormContainerProps {
    content: (formikProps: FormikProps<AddTasksFormContentProps>) => JSX.Element;
    headerText: string;
}

// componentProps + formikProps
interface AddTasksProps {
    componentProps: AddTasksFormContentProps;
    formikProps: FormikProps<AddTasksFormContentProps>;
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
            name="tasks"
            onChange={handleChange}
        >
            {componentProps.tasks.map(t => <option key={t} value={t}>{t}</option>)}
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
                        //setNewTask("");
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
    (formikProps: FormikProps<AddTasksFormContentProps>) => {
        return <AddTasksForm componentProps={props} formikProps={formikProps} />
    }

// usage
const FormContainer = (props: FormContainerProps) => {
    return <Styled.Card>
        <Formik
            initialValues={{
                personName: undefined
            }}
            onSubmit={(values) => { alert("Submitting " + JSON.stringify(values)); }}
        >
            {(formikProps: FormikProps<any>) => {
                const formContent = props.content;
                return <>
                    <Styled.Header>
                        <h3>{props.headerText}</h3>
                    </Styled.Header>
                    <Styled.Content>{formContent(formikProps)}</Styled.Content>
                    <Styled.Footer>
                        <Styled.SimpleButton
                            type="submit"
                            onClick={() => formikProps.handleSubmit()}>
                            Submit
                        </Styled.SimpleButton>
                    </Styled.Footer>
                </>
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
        content={getAddTasksFormContent({
            onAddTask,
            tasks
        })}
    />
}

export default Example;

