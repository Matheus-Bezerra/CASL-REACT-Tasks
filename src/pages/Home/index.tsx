import React, { useContext } from "react";
import { fetchTasks, create, removeTask, updateToClosed } from "./services";
import {
  ActionContainer,
  Container,
  Divider,
  DoneButton,
  ListContainer,
  ListItem,
  NewButton,
  RemoveButton,
  Input,
  Page,
  Form,
  Title,
  Id,
} from "./styles";
import { Can, GuardContext } from "../../guards/GuardContext";

type Task = {
  id: number;
  title: string;
  status: "open" | "closed";
};

export const Home = () => {
  const ability = useContext(GuardContext)
  const [tasks, setTasks] = React.useState<Task[]>([]);

  function refresh() {
    fetchTasks().then((tasks) => setTasks(tasks));
  }

  React.useEffect(() => {
    refresh();
  }, []);

  const onRemove = async (id: number) => {
    const canRemove = ability.can('delete', 'task')
    if(!canRemove) {
      alert('Você não tem permissão para excluir, contate o admin')
      return
    }

    await removeTask(id);

    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const onDone = async (id: number) => {
    await updateToClosed(id);

    setTasks((prev) => {
      return prev.map((task) =>
        task.id === id ? { ...task, status: "closed" } : task
      );
    });
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get("title")?.toString();

    await create(title!);

    refresh();
  };

  return (
    <Page>
      <Container>
        <Title>Task Manager</Title>

      <Can I="create" a="task">
        <Form onSubmit={onSubmit}>
          <Input type="text" name="title" required />
          <NewButton type="submit">Criar nova tarefa</NewButton>
        </Form>
      </Can>

        <Divider />

        <ListContainer>
          {tasks.map((task) => (
            <ListItem $open={task.status === "open"} key={task.id}>
              <Id>{task.id}</Id>
              <p>{task.title}</p>
              <ActionContainer>
                {task.status === "open" && (
                  <Can I="update" a="task">
                    <DoneButton onClick={() => onDone(task.id)}>
                      Concluir
                    </DoneButton>
                  </Can>
                )}
                {/* <Can I="delete" a="task"> */}
                  <RemoveButton onClick={() => onRemove(task.id)}>
                    Excluir
                  </RemoveButton>
                {/* </Can> */}
              </ActionContainer>
            </ListItem>
          ))}
        </ListContainer>
      </Container>
    </Page>
  );
};
