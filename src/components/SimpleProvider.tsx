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
    data: DataState;
}

const TasksBoard = (props: TasksBoardProps) => {
    return <Styled.Card style={{ padding: "20px" }}>
        <Styled.List>
            {(props.data.tasks ?? []).map(item => <li key={item}>{item}</li>)}
        </Styled.List>
    </Styled.Card>
}

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
    }, [])

    const data = {
        loading,
        error,
        tasks
    }
    const Comp = props.renderComponent;
    return <Comp data={data} />
}

const Example = () => {
    return <DataProvider
        refresh
        renderComponent={TasksBoard}
    />
}

export default Example;