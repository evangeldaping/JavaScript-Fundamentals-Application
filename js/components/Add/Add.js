export const Add = {
    render: () => {
        return `
            <h1>Create a New Blog</h1>
            <form class="create">
                <input type="text" name="title" required placeholder="Blog title"/>
                <textarea name="body" required placeholder="Blog body"></textarea>
                <button>Create</button>
            </form>
        `;
    }
}

export const createPost = async (e) => {
    const createform = document.querySelector('.create');

    e.preventDefault();

    const doc = {
        title: form.title.value,
        body: form.body.value,
        likes: 0,
    }

    await fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: { 'Content-Type': 'application/json' }
    })

    // window.location.replace('./index.html')

    createform.addEventListener('submit', createPost);
}