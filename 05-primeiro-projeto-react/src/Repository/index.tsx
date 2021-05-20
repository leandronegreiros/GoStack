import React, { useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { Header, RepositoryInfo, Issues } from './styles';
import logoImg from '../assets/logo.svg'
import { FiChevronsLeft, FiChevronRight } from 'react-icons/fi'
import api from '../services/api';
import { useState } from 'react';

interface RepositoryParams {
    repository: string;
}

interface Repository {
    login: string;
    description: string;
    avatar_url: string;
    name: string;
    followers: number,
    following: number,
    public_repos: number,
}

interface Issue {
    id: number
    name: string,
    description: string,
    owner: {
        html_url: string,
    }
}

const Repository: React.FC = () => {

    const [repository, setRepository] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    const { params } = useRouteMatch<RepositoryParams>();
    useEffect(() => {
        api.get(`users/${params.repository}`).then(response => {
            setRepository(response.data);
        });

        api.get(`users/${params.repository}/repos`).then(response => {
            setIssues(response.data);
        });
    }, [params.repository]);

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Explorer" />
                <Link to="/">
                    <FiChevronsLeft size={16} />
                    Voltar
                </Link>
            </Header>

            {repository && (
                <RepositoryInfo>
                    <header>
                        <img src={repository.avatar_url} alt={repository.login} />
                        <div>
                            <strong>{repository.name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.followers}</strong>
                            <span>Followers</span>
                        </li>
                        <li>
                            <strong>{repository.following}</strong>
                            <span>Following</span>
                        </li>
                        <li>
                            <strong>{repository.public_repos}</strong>
                            <span>Repositorios</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}

            <Issues>
                {issues.map(issue => (
                    <a key={issue.id} href={issue.owner.html_url}>
                        <div>
                            <strong>{issue.name}</strong>
                            <p>{issue.description}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Issues>
        </>
    );
};

export default Repository;