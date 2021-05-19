import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { Header, RepositoryInfo, Issues } from './styles';
import logoImg from '../assets/logo.svg'
import { FiChevronsLeft, FiChevronRight } from 'react-icons/fi'

interface RepositoryParams {
    repository: string;
}

const Repository: React.FC = () => {

    const { params } = useRouteMatch<RepositoryParams>();

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Explorer" />
                <Link to="/">
                    <FiChevronsLeft size={16} />
                    Voltar
                </Link>
            </Header>

            <RepositoryInfo>
                <header>
                    <img src="https://avatars0.githubusercontent.com/u/28929274?v=4" alt="Rocketseat" />
                    <div>
                        <strong>rocketseat/unform</strong>
                        <p>descrição de repositório</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>1908</strong>
                        <span>Stars</span>
                    </li>
                    <li>
                        <strong>48</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>67</strong>
                        <span>Issues abertas</span>
                    </li>
                </ul>
            </RepositoryInfo>

            <Issues>
                <Link to={'teste'}>
                    <div>
                        <strong>teste 1</strong>
                        <p>teste 2</p>
                    </div>
                    <FiChevronRight size={20} />
                </Link>
            </Issues>
        </>
    );
};

export default Repository;