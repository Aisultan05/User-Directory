import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import UserModal from './components/UserModal';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);    
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Получение пользователей с API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?per_page=12');
        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить пользователей.');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Функция поиска
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Функция сортировки
  const sortedUsers = filteredUsers.sort((a, b) => {
    const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
    const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
    if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
    if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Пагинация
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Обработка клика по пользователю
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Каталог пользователей</h1>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-secondary"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Сортировать по имени ({sortOrder === 'asc' ? 'по возрастанию' : 'по убыванию'})
        </button>
      </div>
      {loading ? (
        <p className="text-center">Загрузка...</p>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : (
        <>
          <UserList users={currentUsers} onUserClick={handleUserClick} />
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={sortedUsers.length}
            currentPage={currentPage}
            onPageChange={paginate}
          />
        </>
      )}
      <UserModal show={showModal} user={selectedUser} onHide={() => setShowModal(false)} />
    </div>
  );
}

export default App;
