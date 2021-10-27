export const Details = {
    render: () => {
        return `
            <div class="details post">
            </div>
            <div class="btn">
                <button class="delete">DELETE</button>
            </div>
        `;
    }
}

export const renderDetails = async () => {
    const id = window.location.hash.split('=')[1];
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
        if(confirm("Are you sure to want to delete this blog?")) {
            await fetch('http://localhost:8888/posts/' + id, {
                method: 'DELETE'
            });
            window.location.href = '/';
        }
    })

    window.addEventListener('DOMContentLoaded', () => renderDetails());

}
