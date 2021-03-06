// Components
import { Home, renderPosts } from './components/Home/Home.js';
import { Add, createPost } from './components/Add/Add.js';
import { Details, renderDetails } from './components/Details/Details.js';
import { Error } from './components/Error/Error.js';

// Routes 
const routes = [
    { path: '/', component: Home },
    { path: '/create', component: Add },
    { path: '/details', component: Details },
];

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path, routes) => {

    if(path.includes("/details")) {
        return routes.filter(route => route.path === '/details')[0]
        // result
        // [{ path: '/details', component: Details }][0]
    }

    return routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gmi'))) || undefined
};

const router = () => {
    // TODO: Get the current path

    // TODO: Find the component based on the current path
    const path = parseLocation();
    // TODO: If there's no matching route, get the "Error" component
    const { component = Error } = findComponentByPath(path, routes) || {};
    // TODO: Render the component in the "app" placeholder
    document.getElementById('blog-container').innerHTML = component.render();

    if (path === '/') renderPosts();
    
    if (path === '/create') {
        const form = document.querySelector('form');
        form.addEventListener('submit', (e) => createPost(e, form)); 
    }

    if (path.includes("/details")) renderDetails();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
