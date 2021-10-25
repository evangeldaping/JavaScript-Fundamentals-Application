// Components
const HomeComponent = {
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

const Page1Component = {
    render: () => {
        return `
        <section>
            <h1>Page 1</h1>
            <p>This is just a test</p>
        </section>
        `;
    }
} 

const Page2Component = {
    render: () => {
        return `
        <section>
            <h1>Page 2</h1>
            <p>This is just a test</p>
        </section>
        `;
    }
} 

const CreateBlogComponent = {
    render: () => {
        return `
        <h1>Create a New Blog</h1>
        <form>
            <input type="text" name="title" required placeholder="Blog title">
            <textarea name="body" required placeholder="Blog body"></textarea>
            <button>Create</button>
        </form>
        `;
    }
} 

const ErrorComponent = {
    render: () => {
        return `
        <section>
            <h1>Error</h1>
            <p>This is just a test</p>
        </section>
        `;
    }
}

// Routes 
const routes = [
    { path: '/', component: HomeComponent, },
    { path: '/page1', component: Page1Component, },
    { path: '/page2', component: Page2Component, },
    { path: '/createBlog', component: CreateBlogComponent, },
];

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gmi'))) || undefined;

const renderPosts = async (term) => {
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

const router = () => {
    // TODO: Get the current path
    
    // TODO: Find the component based on the current path
    const path = parseLocation();
    // TODO: If there's no matching route, get the "Error" component
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
    // TODO: Render the component in the "app" placeholder
    document.getElementById('app').innerHTML = component.render();

    if (path === '/') renderPosts();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);