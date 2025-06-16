const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

const logCoordinates = debounce((e) => {
    console.log(`X: ${e.clientX}, Y: ${e.clientY}`)
    document.getElementById('coordinates').textContent = `X: ${e.clientX}, Y: ${e.clientY}`;
}, 300);

document.addEventListener('mousemove', logCoordinates);

const fetchUsers = async () => {
    try {
        const [fakeStoreRes, jsonPlaceholderRes] = await Promise.all([
            fetch('https://fakestoreapi.com/users'),
            fetch('https://jsonplaceholder.typicode.com/users')
        ]);

        const fakeStoreUsers = await fakeStoreRes.json();
        const jsonPlaceholderUsers = await jsonPlaceholderRes.json();

        const fakeStoreUsersDiv = document.getElementById('fakeStoreUsers');
        const jsonPlaceholderUsersDiv = document.getElementById('jsonPlaceholderUsers');

        fakeStoreUsers.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <h3>${user.name.firstname} ${user.name.lastname}</h3>
                <p>Email: ${user.email}</p>
            `;
            fakeStoreUsersDiv.appendChild(userCard);
        });

        jsonPlaceholderUsers.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>
            `;
            jsonPlaceholderUsersDiv.appendChild(userCard);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        document.getElementById('fakeStoreUsers').textContent = 'Failed to load FakeStore users';
        document.getElementById('jsonPlaceholderUsers').textContent = 'Failed to load JsonPlaceholder users';
    }
};

fetchUsers();