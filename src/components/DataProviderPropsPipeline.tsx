import { useEffect, useState } from "react";
interface ProviderProps<T extends Data> {
    refresh: boolean;
    propsFn: (data: DataState) => T,
    renderComponent: (props: T) => JSX.Element;
}

import TasksService from "../api-client/Tasks";
import Styled from "../shared/Styled";

interface DataState {
    loading: boolean;
    tasks: Array<string> | undefined,
    error: string | undefined;
}

type TasksBoardProps = {
    title: string;
    description: string;
    data: DataState;
}

type Data = {
    data: DataState
}

type TaskBoardStaticProps = Pick<TasksBoardProps, "title" | "description">;

const TasksBoard = (props: TasksBoardProps) => {
    useEffect(() => {
        console.log("Tasks component did mount");
        return () => {
            console.log("Tasks component did ummount");
        }
    }, []);
    const { title, description } = props;
    return <Styled.Card style={{ padding: "20px" }}>
        <p>If you expand title while number is changing, it should not collapse.
            Only props go through assembly line here.</p>
        <Styled.DetailsSection>
            <summary>{title}</summary>
            <p>{description}</p>
        </Styled.DetailsSection>
        <Styled.List>
            {(props.data.tasks ?? []).map(item => <li key={item}>{item}</li>)}
        </Styled.List>
    </Styled.Card>
}

const TaskBoardsPropsPipeline = (staticProps: TaskBoardStaticProps) =>
    (dataProps: DataState) =>
    ({
        ...staticProps,
        data: dataProps
    })


const DataProvider = (props: ProviderProps<TasksBoardProps>) => {
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

    const dataState = {
        loading,
        error,
        tasks
    }

    const cmpProps = props.propsFn(dataState);

    return <props.renderComponent {...cmpProps} />
    //return <props.renderComponent data={data} />
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

    // here we pass propsFn as separate function
    // could be possible to pass it as a context
    // ...or renderComponent could be an array containing propsFn and compenent
    // the essence is the same: we let props through pipeline, but component is defined statically
    return <DataProvider
        refresh
        propsFn={TaskBoardsPropsPipeline({ title: `Time allocated ${timeAllocated}`, description: "This sections should not collapse on title change" })}
        renderComponent={TasksBoard}
    />
}

export default Example;