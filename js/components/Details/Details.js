export const Details = {
    
    render: () => {
        return `
            <div class="details post">
            </div>
            <div class="btnsContainer">
                <button class="delete">DELETE</button>
            </div>

            <div id="id01" class="modal">
                <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
                <form class="modal-content" action="/action_page.php">
                    <div class="container">
                        <h1>Update Blog</h1>

                        <input class="create-title" type="text" name="title" required placeholder="Blog title"/>
                        <input class="create-author" type="text" name="author" required placeholder="Blog author"/>
                        <textarea class="create-description" name="body" required placeholder="Blog description"></textarea>
                        
                        <div class="clearfix">
                            <button type="button" class="cancelbtn">Cancel</button>
                            <button type="button" class="updatebtn">Update</button>
                        </div>
                    </div>
                </form>
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
    <div class="post-container">
        <div class="image">
            <img src="https://www.mofea.gm/assets/images/no-profile.png" alt="image unknown" width="70" height="70">
        </div>
        <div>
            <h2>${post.title}</h2>
            <h3>${post.author}</h3>
            <p>${post.description}...</p>
            <p><small>${post.likes} likes</small></p>
        </div>
    </div>
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

    // Get the modal
    const modal = document.getElementById('id01');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    window.addEventListener('DOMContentLoaded', () => renderDetails());
}
