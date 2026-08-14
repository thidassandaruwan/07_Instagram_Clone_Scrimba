import posts from "./posts.json" with { type : "json" };

const feed = document.querySelector("#feed");

feed.addEventListener("dblclick", (event) => {
    if (event.target.classList.contains("post-image"))
    {
       updateLikes(event);
    }
});

feed.addEventListener("click", (event) => {
    // looks for .heart in the clicked element or any of it's parents
    const hearButton = event.target.closest(".heart");

    if (hearButton){
        updateLikes(event);
    }
});

function loadPosts(){
    const postElements = [];
    for (const post of posts){
        postElements.push(createPostElement(post));
    }
    feed.innerHTML = postElements.join("");
}

function updateLikes(event){
    const postElement = event.target.closest(".post");
    const likeCount = postElement.querySelector(".like-count");
    const postCreator = postElement.querySelector(".postCreator").textContent;

    const postObject = posts.find(post => post.username === postCreator);
    likeCount.textContent = `${++postObject.likes} likes`;
    console.log("clicked");
}

function createPostElement(post){
    return`
        <article class="post">
            <header class="post-header">
                <img class="profile-pic" src="${post.avatar}" alt="${post.name}">
                <div class="user-info">
                    <span class="user-name">${post.name}</span>
                    <span class="user-location">${post.location}</span>
                </div>
            </header>
            <figure>
                <img class="post-image" src="${post.post}" alt="wavy drawing of ${post.name}">
            </figure>
            <footer class="post-footer">
                <div class="post-actions">
                    <button class="btn-icon heart" aria-label="Like post">
                        <img src="images/icon-heart.png" alt="" aria-hidden="true">
                    </button>
                    <button class="btn-icon" aria-label="Comment on post">
                        <img src="images/icon-comment.png" alt="" aria-hidden="true">
                    </button>   
                    <button class="btn-icon" aria-label="Share post">
                        <img src="images/icon-dm.png" alt="" aria-hidden="true">
                    </button>   
                </div>
                <p><strong class="like-count">${post.likes} likes</strong></p>
                <p class="post-caption">
                    <strong class="postCreator">${post.username}</strong> just took a few mushrooms lol.
                </p>
            </footer>
        </article>
    `;
}

loadPosts()