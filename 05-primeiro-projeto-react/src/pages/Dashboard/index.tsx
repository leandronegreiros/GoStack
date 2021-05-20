import React, { useState, useEffect, FormEvent } from "react";
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg'
import { FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'
import { Title, Form, Repositories, Error } from './styles'

interface Repository {
    id: number;
    login: string;
    full_name: string;
    avatar_url: string;
    bio: string;
    name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {

    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem(
            '@GithubExplore:repositories'
        );

        if (storagedRepositories) {
            return JSON.parse(storagedRepositories);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem(
            '@GithubExplore:repositories',
            JSON.stringify(repositories)
        );
    }, [repositories]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {

        event.preventDefault();

        if (!newRepo) {
            setInputError('Digite o autor do repositório');
            return;
        }

        try {
            const response = await api.get<Repository>(`users/${newRepo}`)
            const repository = response.data;

            setRepositories([...repositories, repository]);
            setNewRepo('');
            setInputError('');
        } catch (error) {
            setInputError('Erro na busca por esse repositório!');
        }
    }

    return (
        <>
            <img src={logoImg} alt="Github Explore" />
            <Title>Explore repositórios no Github</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                    placeholder="Digite o nome do repositório"
                />
                <button type="submit">Pesquisar</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {repositories.map(repository => (
                    <Link key={repository.id}
                        to={`/users/${repository.login}`}
                    >
                        <img
                            src={repository.avatar_url}
                            alt={repository.login}
                        />
                        <div>
                            <strong>{repository.name}</strong>
                            <p>{repository.bio}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repositories>
        </>
    );
};

export default Dashboard;