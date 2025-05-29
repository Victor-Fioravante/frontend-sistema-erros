import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './menuStyle.css';

const MenuBar: React.FC = () => { 
    return (
        <div className="menu">
            <nav className="menu-bar">
                <ul className="menu-list">
                    <li> 
                        <NavLink
                            to="/cadastrar-sugestao" 
                            className='link-ativo'
                        >
                            Cadastrar Sugestão
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/sugestao"
                            className='link-ativo'
                        >
                            Consultar Sugestões
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/avaliacao"
                            className='link-ativo'
                        >
                            Consultar Avaliações
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default MenuBar; 