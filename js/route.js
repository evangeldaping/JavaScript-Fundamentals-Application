// Components
import { Home, renderPosts } from './components/Home/Home.js';
import { Add } from './components/Add/Add.js';
import { Error } from './components/Error/Error.js';

// Routes 
const routes = [
    { path: '/', component: Home, },
    { path: '/createBlog', component: Add, },
];

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';
const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gmi'))) || undefined;

const router = () => {
    // TODO: Get the current path
    
    // TODO: Find the component based on the current path
    const path = parseLocation();
    // TODO: If there's no matching route, get the "Error" component
    const { component = Error } = findComponentByPath(path, routes) || {};
    // TODO: Render the component in the "app" placeholder
    document.getElementById('app').innerHTML = component.render();

    if (path === '/') renderPosts();
    if (path === '/createBlog') createPost();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
