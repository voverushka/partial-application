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
        <p>Try to expand title while number of 'time allapsed' is changing
            Title will collapse. If you incomment line 88 and comment line 85
            in source file, it should prevent title collapse
        </p>
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
    const Comp = props.renderComponent;
    return <Comp data={data} />;

    // This would NOT destroy/re-create component ! to be used with caution though.
    // return props.renderComponent({ data });
}


const Example = () => {
    const [timeAllocated, seTimeAllocated] = useState(50000);

    useEffect(() => {
        let x: number | null = setInterval(() => {
            seTimeAllocated(tt => {
                if (tt > 0) {
                    return tt - 500;
                } else {
                    if (x) {
                        clearInterval(x);
                        x = null;
                    }
                    return tt;
                }
            });
        }, 500);

        return () => {
            if (x) {
                clearInterval(x);
                x = null;
            }
        }
    }, []);

    // here renderable component wuld be returned at the end of TaskBoardsPipeline
    // however each time new component definition would be created
    // and if you render it as component with JSX syntax, it will be destroyed and recreated
    // each time timeAllocated is changing
    // if you call it as a function, lifecycle hooks do not exacute at component level,
    // they assigned to component parent. But that should be used with caution
    return <DataProvider
        refresh
        renderComponent={TaskBoardsPipeline(
            {
                title: `Time allocated ${timeAllocated}`,
                description: "Tasks for illustration of Data Provider pattern"
            }
        )}
    />
}

export default Example;