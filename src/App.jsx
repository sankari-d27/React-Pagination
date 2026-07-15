import { useState } from 'react';
import { posts } from './data';
import './App.css';

function App() {
  const [data] = useState(posts);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(7);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const emptyPosts = postPerPage - currentPosts.length;
  const totalPages = Math.ceil(data.length / postPerPage);

  const paginate = (page) => setCurrentPage(page);

  return (
    <div className="container">
      <h2>Simple Pagination</h2>

      <p className="page-info">
        Page {currentPage} of {totalPages}
      </p>

      <ul className="list">
        {currentPosts.map((post) => (
          <li key={post.id}>
            {post.id} - {post.title}
          </li>
        ))}

        {Array.from({ length: emptyPosts }).map((_, index) => (
          <li className="empty" key={`empty-${index}`}>
            &nbsp;
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button onClick={() => paginate(1)}>Start</button>

        <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>

        <button onClick={() => paginate(totalPages)}>End</button>
      </div>
    </div>

  );
}

export default App;