import { useEffect, useState } from "react";
interface ProviderProps {
    refresh: boolean;
    renderComponent: (props: { data: DataState }) => JSX.Element;
}

import TasksService from "../api-client/Tasks";
import Styled from "../shared/Styled";

interface DataState {
    loading: boolean;
    tasks: Array<string> | undefined,
    error: string | undefined;
}

interface TasksBoardProps {
    title: string;
    description: string;
    data: DataState;
}

type TaskBoardStaticProps = Pick<TasksBoardProps, "title" | "description">;
type TaskBoardDataProps = Pick<TasksBoardProps, "data">;

const TasksBoard = (props: TasksBoardProps) => {
    useEffect(() => {
        console.log("Tasks component did mount");
        return () => {
            console.log("Tasks component did ummount");
        }
    }, []);
    const { title, description } = props;
    return <Styled.Card style={{ padding: "20px" }}>
        <Styled.DetailsSection>
            <summary>{title}</summary>
            <p>{description}</p>
        </Styled.DetailsSection>
        <Styled.List>
            {(props.data.tasks ?? []).map(item => <li key={item}>{item}</li>)}
        </Styled.List>
    </Styled.Card>
}

const TaskBoardsPipeline = (staticProps: TaskBoardStaticProps) =>
    (dataProps: TaskBoardDataProps) =>
        <TasksBoard {...staticProps} {...dataProps} />;


const DataProvider = (props: ProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [tasks, setTasks] = useState<string[]>([]);

    const load = () => {
        setLoading(true);
        setError(undefined);
        TasksService.getTasks().then((tasksData: string[]) => {
            setTasks(tasksData);
        }).catch(e => {
            setError(e.message ?? "Unexpected Error");
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        load();
        if (props.refresh) {
            setInterval(() => {
                load();
            }, 500);
        }
    }, []);

    const data = {
        loading,
        error,
        tasks
    }
    return <props.renderComponent data={data} />;
    //return <props.renderComponent data={data} />
}

const Example = () => {
    const [title, setTitle] = useState("Tasks");

    useEffect(() => {
        const x = setInterval(() => {
            setTitle("Task " + Math.random());
        }, 500);

        return () => {
            clearInterval(x);
        }
    }, []);

    return <DataProvider
        refresh
        renderComponent={TaskBoardsPipeline(
            {
                title,
                description: "Tasks for illustration of Data Provider pattern"
            }
        )}
    />
}

export default Example;