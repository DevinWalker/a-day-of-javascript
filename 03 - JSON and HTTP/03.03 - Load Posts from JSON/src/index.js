import 'whatwg-fetch';

const apiRoot = 'https://api-demo.dev/wp-json',
			articleContainer = document.querySelector('main#main'),
			listPosts = {};

/**
 * init - Initialize the listing of posts
 *
 */
listPosts.init = function() {

	fetch(  apiRoot + '/wp/v2/posts/?per_page=5' )
		.then( response => {
      if (response.status !== 200) {
        console.log('Problem! Status Code: ' +
          response.status);
        return;
      }
			response.json().then( posts => {
				listPosts.clearPosts();
				listPosts.render( posts );
			});
		})
		.catch( err => {
			console.log('Error: ', err);
		});

};
listPosts.init();


/**
 * renderPost - Display posts on the page
 *
 * @param  {Array} posts Array of Posts in JSON
 */
listPosts.render = function( posts ) {
	for ( let post of posts ) {
		listPosts.renderPost( post );
	}
};


/**
 * renderPost - Displays an individual post on the page
 *
 * @param  {Object} post Individual post
 */
listPosts.renderPost = function( post ) {

  let articleEl = document.createElement( 'article' ),
			titleEl = listPosts.getTitleMarkup( post ),
			contentEl = listPosts.getContentMarkup( post );

	articleEl.classList.add('post');
	articleEl.appendChild( titleEl );
	articleEl.appendChild( contentEl );
	articleContainer.appendChild(articleEl);

};


/**
 * getTitleMarkup - Get the markup for a post title
 *
 * @param  {Object} post Individual post from the API
 * @return {Object}      Title markup with link and post title
 */
listPosts.getTitleMarkup = function( post ) {

	let titleEl = document.createElement( 'h2' ),
				markup = `<a href="${post.link}">${post.title.rendered}</a>`;

	titleEl.classList.add('entry-title');
	titleEl.innerHTML = markup;
	return titleEl;

};


/**
 * getContentMarkup - Get the markup for post content
 *
 * @param  {Object} post Individual post from the API
 * @return {Object}      Content markup with content
 */
listPosts.getContentMarkup = function( post ) {
	let contentEl = document.createElement( 'div' );

	contentEl.innerHTML = post.content.rendered;
	return contentEl;

};


/**
 * clearPosts - Clear posts from page
 *
 */
listPosts.clearPosts = function() {
		articleContainer.innerHTML = '';
};
