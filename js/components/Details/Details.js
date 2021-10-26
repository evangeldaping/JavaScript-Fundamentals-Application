export const Details = {
    render: () => {
        return `
            <div class="details">
            </div>
            <button class="delete">delete</button>
        `;
    }
}

export const renderDetails = async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    const container = document.querySelector('.details');
    const deleteBtn = document.querySelector('.delete');

    const response = await fetch('http://localhost:8888/posts/' + id);
    const post = await response.json();

    const template = `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
    `

    container.innerHTML = template;

    deleteBtn.addEventListener('click', async () => {
        const res = await fetch('http://localhost:8888/posts/' + id, {
            method: 'DELETE'
        });

        window.location.href = '/';
    })

    window.addEventListener('DOMContentLoaded', () => renderDetails());

}
