export const Add = {
    render: () => {
        return `
            <h1>Create a New Blog</h1>
            <form>
                <input type="text" name="title" required placeholder="Blog title"/>
                <textarea name="body" required placeholder="Blog body"></textarea>
                <button class="create">CREATE</button>
            </form>
        `;
    }
}

export const createPost = async (e, form) => {
    e.preventDefault();

    const doc = {
        title: form.title.value,
        body: form.body.value,
        likes: 0,
    }

    await fetch('http://localhost:8888/posts', {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: { 'Content-Type': 'application/json' }
    })

    window.location.href = '/';
}


