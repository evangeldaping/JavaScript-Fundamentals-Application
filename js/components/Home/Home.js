export const Home = {
    render: () => {
        return `
            <h1>All Blogs</h1>
            <form class="search">
                <input type="text" name="term" placeholder="search term">
            </form>
            <div id="blogs">
            </div>
        `;
    }
}

export const renderPosts = async (term) => {
    const searchForm = document.querySelector('.search');
    const container = document.querySelector('#blogs');

    let url = 'http://localhost:3000/posts?_sort=likes&&_order=desc';
    if (term) {
        url += `&q=${term}`;
    }

    const response = await fetch(url);
    const posts = await response.json();

    let template = '';
    posts.forEach(post => {
        template += `
            <div class = "post">
                <h2>${post.title}</h2>
                <p><small>${post.likes} likes</small></p>
                <p>${post.body.slice(0, 200)}...</p>
                <a href="./details.html?id=${post.id}">read more...</a>
            </div>
        `
    })

    container.innerHTML = template;

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        renderPosts(searchForm.term.value.trim());
    })
}