export const Add = {
    render: () => {
        return `
            <h1>Create a New Blog</h1>
            <form>
                <input class="create-title" type="text" name="title" required placeholder="Blog title"/>
                <input class="create-author" type="text" name="author" required placeholder="Blog author"/>
                <textarea class="create-description" name="description" required placeholder="Blog description"></textarea>
                <button class="create">CREATE</button>
            </form>
        `;
    }
}

export const createPost = async (e, form) => {
    e.preventDefault();

    const doc = {       
        title: form.title.value,
        author: form.author.value,
        description: form.description.value,
        likes: 0,
    }

    await fetch('http://localhost:8888/posts', {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: { 'Content-Type': 'application/json' }
    })

    window.location.href = '/';
}


