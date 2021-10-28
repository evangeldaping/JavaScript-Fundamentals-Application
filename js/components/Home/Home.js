export const Home = {
    render: () => {
        return `
            <h1>All Blogs</h1>
            <form class="search">
                <input type="text" name="term" placeholder="Search term">
            </form>
            <div id="blogs">
            </div>
        `;
    }
}

export const renderPosts = async (term) => {
    const searchForm = document.querySelector('.search');
    const container = document.querySelector('#blogs');

    let url = 'http://localhost:8888/posts?_sort=likes&&_order=desc';
    if (term) {
        url += `&q=${term}`;
    }

    const response = await fetch(url);
    const posts = await response.json();

    // Handling fetch errors
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    let template = '';
    posts.forEach(post => {
        template += `
            <div class="post-container">
                <div class="image">
                    <img src="https://www.mofea.gm/assets/images/no-profile.png" alt="image unknown" width="70" height="70">
                </div>
                <div class="post">
                    <h2>${post.title}</h2>
                    <h3>${post.author}</h3>
                    <p>${post.description.slice(0, 200)}</p>
                    <p><small>${post.likes} likes</small></p>
                    <a href="#/details?id=${post.id}">read more...</a>
                </div>
            </div>
        `
    })

    container.innerHTML = template;

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        renderPosts(searchForm.term.value.trim());
    })
}