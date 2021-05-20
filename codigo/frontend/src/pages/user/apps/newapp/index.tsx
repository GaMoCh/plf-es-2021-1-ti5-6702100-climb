import { Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NotLinkedGit from "../../../../components/NotLinkedGit";
import RepositoriesCard from "../../../../components/RepositoriesCard";
import { HeadingActionButton } from "../../../../components/SubHeading/ActionButton";
import { GitProviders } from "../../../../shared/interfaces/GitProviders";
import { githubService } from "../../../../shared/services/githubService";
import { gitlabService } from "../../../../shared/services/gitlabService";
import { getMessages } from "../../../../shared/utils/toast-messages";

const data = {
  github: null,
  gitlab: null,
};

const NewApp = () => {
  const [gitProvider, setGitProvider] = useState<"github" | "gitlab">("github");
  const [providers, setProviders] = useState<GitProviders>(data);
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await githubService
      .getRepositories()
      .then((res) => {
        setProviders({ github: res.organizations, gitlab: null });
      })
      .catch((error) => {
        if (error?.response?.data) {
          getMessages(error.response.data).forEach((description, i) =>
            toast({
              title: "Erro!",
              description: `${description}`,
              status: "error",
              id: i,
              position: "bottom-left",
            })
          );
        } else
          toast({
            title: "Erro!",
            description:
              "Não foi possível comunicar com o servidor para carregar as aplicações.",
            id: 1,
            status: "error",
            position: "bottom-left",
          });
      });

    await gitlabService
      .getRepositories()
      .then((res) => {
        console.log(res);
        setProviders((prevState) => {
          prevState.gitlab = res.organizations;
          return prevState;
        });
      })
      .catch((error) => {
        if (error?.response?.data) {
          getMessages(error.response.data).forEach((description, i) =>
            toast({
              title: "Erro!",
              description: `${description}`,
              status: "error",
              id: i,
              position: "bottom-left",
            })
          );
        }
      });
  }

  function handleSelectGit(gitProvider: string) {
    gitProvider === "github"
      ? setGitProvider("github")
      : setGitProvider("gitlab");
  }

  return !providers.github && !providers.gitlab ? (
    <NotLinkedGit />
  ) : (
    <Flex flexDirection="column" padding="12" width="full">
      <HeadingActionButton title="Nova Aplicação" />
      <Flex justifyContent="center" alignItems="center">
        <RepositoriesCard
          gitOrganizations={providers[gitProvider]}
          onSelectGit={handleSelectGit}
        />
      </Flex>
    </Flex>
  );
};

export default NewApp;
