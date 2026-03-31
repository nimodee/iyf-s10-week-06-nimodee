 // Synchronous example
console.log("1 - Start");
console.log("2 - Middle");
console.log("3 - End");

// Asynchronous example
console.log("1 - Start async");

setTimeout(() => {
    console.log("2 - This is delayed");
}, 2000);

console.log("3 - End async");

// Predict output exercise
console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");


// Exercise 2: Callback Pattern

// Old-style callback function to simulate fetching user data
function loadUser(userId, callback) {
    console.log('Loading user with ID ${userId}...');

    setTimeout(() => {
        const user = {
            id: userId,
            name: "John Doe",
            age: 30
        };

        // Call the callback function with user data
        callback(user);
    }, 1500);
}

// Use the function
loadUser(1, function(user) {
    console.log("User loaded:", user);
});


// This is BAD - "Callback Hell" or "Pyramid of Doom"
function getUserData(userId, callback) {
    setTimeout(() => {
        callback({ id: userId, name: "John" });
    }, 1000);
}

function getUserPosts(userId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, title: "Post 1" },
            { id: 2, title: "Post 2" }
        ]);
    }, 1000);
}

function getPostComments(postId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, text: "Great post!" },
            { id: 2, text: "Thanks for sharing" }
        ]);
    }, 1000);
}

// The nightmare:
getUserData(1, function(user) {
    console.log("User:", user);
    getUserPosts(user.id, function(posts) {
        console.log("Posts:", posts);
        getPostComments(posts[0].id, function(comments) {
            console.log("Comments:", comments);
            // Imagine 3 more levels deep...
        });
    });
});

// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    const success = true;
    
    setTimeout(() => {
        if (success) {
            resolve("It worked!");
        } else {
            reject("Something went wrong");
        }
    }, 1000);
});

// Using a Promise
myPromise
    .then(result => {
        console.log("Success:", result);
    })
    .catch(error => {
        console.log("Error:", error);
    });


    function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "John" });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

 getUserData(1)
    .then(user => {
        console.log("User:", user);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    // Refactor getUserPosts to return a Promise
function getUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1" },
                { id: 2, title: "Post 2" }
            ]);
        }, 1000);
    });
}

// Refactor getPostComments to return a Promise
function getPostComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Great post!" },
                { id: 2, text: "Thanks for sharing" }
            ]);
        }, 1000);
    });
}

getUserData(1)
    .then(user => {
        console.log("User:", user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return getPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    // After refactoring to Promises:
getUserData(1)
    .then(user => {
        console.log("User:", user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return getPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    // Run multiple promises in parallel
const promise1 = getUserData(1);
const promise2 = getUserData(2);
const promise3 = getUserData(3);

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log("All users:", results);
        // results is an array [user1, user2, user3]
    })
    .catch(error => {
        // If ANY promise fails, this runs
        console.error("One failed:", error);
    });

    // First to complete wins
const fast = new Promise(resolve => setTimeout(() => resolve("Fast!"), 100));
const slow = new Promise(resolve => setTimeout(() => resolve("Slow!"), 500));

Promise.race([fast, slow])
    .then(result => {
        console.log("Winner:", result);  // "Fast!"
    });

 // Build: Fetch data for 3 users simultaneously and display them all at once

async function fetchThreeUsers() {
    try {
        // Run all 3 promises in parallel
        const [user1, user2, user3] = await Promise.all([
            getUserData(1),
            getUserData(2),
            getUserData(3)
        ]);

        console.log("All 3 users:", [user1, user2, user3]);
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
}

// Call the function
fetchThreeUsers();


 //converting to Async function

async function getDataWithAsync() {
    const user = await getUserData(1);
    const posts = await getUserPosts(user.id);
    const comments = await getPostComments(posts[0].id);
    return comments;
}

// Using the async function
getDataWithAsync().then(comments => console.log(comments));

async function fetchUserData(userId) {
    try {
        const user = await getUserData(userId);
        const posts = await getUserPosts(user.id);
        return { user, posts };
    } catch (error) {
        console.error("Failed to fetch:", error);
        throw error;  // Re-throw if needed
    }
}

fetchUserData(1)
    .then(result => console.log(result))
    .catch(error => console.error(error));

    // Exercise 3: Parallel with Async/Await

async function getAllUsers() {
    // Sequential (slow)
    const user1 = await getUserData(1);
    const user2 = await getUserData(2);
    const user3 = await getUserData(3);
    // Total time: ~3 seconds
    
    // Parallel (fast)
    const [u1, u2, u3] = await Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3)
    ]);
    // Total time: ~1 second
    
    return [u1, u2, u3];
}

// Using the function
getAllUsers().then(users => console.log(users));

 // Callback Hell Example
getUserData(1, function(user) {
    console.log("User:", user);
    getUserPosts(user.id, function(posts) {
        console.log("Posts:", posts);
        getPostComments(posts[0].id, function(comments) {
            console.log("Comments:", comments);
        });
    });
});

 // Async/Await version
async function getUserDataAsyncFlow() {
    try {
        const user = await getUserData(1);
        console.log("User:", user);

        const posts = await getUserPosts(user.id);
        console.log("Posts:", posts);

        const comments = await getPostComments(posts[0].id);
        console.log("Comments:", comments);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Call the function
getUserDataAsyncFlow();

// Basic fetch
fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => {
        console.log("Response object:", response);
        console.log("Status:", response.status);
        console.log("OK:", response.ok);
        return response.json(); //Parse JSON 
    })
    .then(data => {
        console.log("User data:", data);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });

    async function getUser(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); 
        }
        
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

// Use it
async function fetchAndLogUser() {
const user = await getUser(1);
console.log(user);
}
fetchAndLogUser();

// Task 12.1 – Practice: Fetch all users

async function getAllUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error('HTTP error! status: ${response.status}');
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
}

// Using the function
(async () => {
    const users = await getAllUsers();
    console.log(users);
})();


// Task 12.1 – Practice: Fetch posts for user 1

async function getUserPostsById(userId) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/${userId}/posts');
        if (!response.ok) {
            throw new Error('HTTP error! status: ${response.status}');
        }
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
    }
}

// Using the function
(async () => {
    const posts = await getUserPostsById(1);
    console.log(posts);
})();


const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");

async function loadUsers() {
    try {
        showLoading();
        
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        
        const users = await response.json();
        displayUsers(users);
        
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

function showLoading() {
    loading.classList.remove("hidden");
    container.innerHTML = "";
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    errorDiv.textContent = `Error: ${message}`;
    errorDiv.classList.remove("hidden");
}

function displayUsers(users) {
    container.innerHTML = users.map(user => `
        <div class="user-card">
            <h2>${user.name}</h2>
            <p>📧 ${user.email}</p>
            <p>🏢 ${user.company.name}</p>
            <p>📍 ${user.address.city}</p>
        </div>
    `).join("");
}

// Initialize
loadUsers();


async function createPost(title, body, userId) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            body,
            userId
        })
    });
    
    if (!response.ok) {
        throw new Error("Failed to create post");
    }
    
    return response.json();
}

// Use it
const newPost = await createPost(
    "My First Post",
    "This is the content of my post.",
    1
);
console.log("Created:", newPost);

const postForm = document.getElementById("post-form");
const postResult = document.getElementById("post-result");

postForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent page refresh

    const title = document.getElementById("post-title").value.trim();
    const body = document.getElementById("post-body").value.trim();

    if (!title || !body) return;

    try {
        const newPost = await createPost(title, body, 1); // userId = 1
        postResult.textContent = 'Created Post: ${JSON.stringify(newPost)}';
        postForm.reset(); // clear form
    } catch (error) {
        postResult.textContent = 'Error: ${error.message}';
    }
});


let allUsers = []; // store all fetched users

async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
}

function displayUsers(users) {
    const container = document.getElementById("users-container");
    container.innerHTML = users.map(user => `
        <div class="user-card">
            <h3>${user.name}</h3>
            <p>📧 ${user.email}</p>
            <p>🏢 ${user.company.name}</p>
            <p>📍 ${user.address.city}</p>
        </div>
    `).join("");
}

async function init() {
    allUsers = await fetchUsers();
    displayUsers(allUsers);

    // Live search
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allUsers.filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );
        displayUsers(filtered);
    });
}

// Start
init();


const sortSelect = document.getElementById("sort-name");

sortSelect.addEventListener("change", () => {
    const sortOrder = sortSelect.value; // "asc" or "desc"
    
    const sorted = [...allUsers].sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return sortOrder === "asc" ? -1 : 1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    displayUsers(sorted);
});


const citySelect = document.getElementById("filter-city");

// inside init(), after fetching users
const cities = [...new Set(allUsers.map(user => user.address.city))];

cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
});

citySelect.addEventListener("change", () => {
    const selectedCity = citySelect.value;

    let filtered = allUsers;

    if (selectedCity !== "all") {
        filtered = allUsers.filter(user => user.address.city === selectedCity);
    }

    displayUsers(filtered);
});

