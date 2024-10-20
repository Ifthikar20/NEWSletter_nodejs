// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const PreferencesPage = () => {
//   const { token } = useParams(); // Extract token from the URL
//   const [availableTopics, setAvailableTopics] = useState(['Tech News', 'Business', 'Sports', 'Health', 'Entertainment']);
//   const [selectedTopics, setSelectedTopics] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(''); // State for search input
//   const [firstNews, setFirstNews] = useState(null); // State to hold the first news item
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     // Fetch user preferences with the token
//     axios.get('http://localhost:3030/api/preferences', {
//       headers: {
//         Authorization: `Bearer ${token}`,  // Send token in Authorization header
//       },
//     })
//     .then((res) => {
//       setSelectedTopics(res.data.topics);
//       setAvailableTopics(prev => prev.filter(topic => !res.data.topics.includes(topic))); // Remove already selected topics from available ones
//     })
//     .catch((err) => {
//       console.error(err);
//       setMessage('Failed to fetch preferences. The link might be invalid or expired.');
//     });
//   }, [token]);

//   // Handle search bar input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Function to fetch news when searching for a ticker
//   const handleSearchSubmit = () => {
//     if (searchTerm.trim()) {
//       axios
//         .get(`http://localhost:3030/api/stock-news?symbol=${searchTerm.trim()}`)
//         .then((response) => {
//           const news = response.data.news || [];
//           if (news.length > 0) {
//             setFirstNews(news[0]);  // Set the first news item
//             console.log('First News Item:', news[0]);  // Log the first news item
//           } else {
//             setMessage('No news found for the provided symbol.');
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//           setMessage('Failed to fetch stock news');
//         });
//     }
//   };

//   // Handle drag and drop functionality
//   const handleDragStart = (e, topic) => {
//     e.dataTransfer.setData('text', topic);  // Save the topic being dragged
//   };

//   const handleDrop = (e, dropZone) => {
//     const topic = e.dataTransfer.getData('text');  // Retrieve the dragged topic
//     if (dropZone === 'selectedTopics') {
//       if (!selectedTopics.includes(topic)) {
//         setSelectedTopics([...selectedTopics, topic]);
//         setAvailableTopics(availableTopics.filter(t => t !== topic));
//       }
//     } else if (dropZone === 'availableTopics') {
//       if (!availableTopics.includes(topic)) {
//         setAvailableTopics([...availableTopics, topic]);
//         setSelectedTopics(selectedTopics.filter(t => t !== topic));
//       }
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault(); // Prevent the default to allow drop
//   };

//   const handleSave = () => {
//     axios.post('http://localhost:3030/api/preferences', { topics: selectedTopics }, {
//       headers: {
//         Authorization: `Bearer ${token}`,  // Send token to save preferences
//       },
//     })
//     .then(() => {
//       setMessage('Preferences saved successfully!');
//     })
//     .catch((err) => {
//       console.error(err);
//       setMessage('Failed to save preferences.');
//     });
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Edit Preferences</h1>
//       {message && <p style={styles.message}>{message}</p>}

//       {/* Search Bar */}
//       <div style={styles.searchBarContainer}>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           placeholder="Search for a stock symbol (e.g., AAPL)"
//           style={styles.searchBar}
//         />
//         <button onClick={handleSearchSubmit} style={styles.button}>
//           Search News
//         </button>
//       </div>

//       {/* Display First News Result */}
//       {firstNews && (
//         <div style={styles.newsContainer}>
//           <h3>Latest News for {searchTerm}:</h3>
//           <div>
//             <a href={firstNews.article_url} target="_blank" rel="noopener noreferrer">
//               <h4>{firstNews.article_title}</h4>
//             </a>
//             <p>{firstNews.source}</p>
//             <img src={firstNews.article_photo_url} alt={firstNews.article_title} style={styles.newsImage} />
//             <p>{firstNews.post_time_utc}</p>
//           </div>
//         </div>
//       )}

//       <div style={styles.dragDropContainer}>
//         {/* Available Topics */}
//         <div
//           id="availableTopics"
//           style={styles.column}
//           onDrop={(e) => handleDrop(e, 'availableTopics')}
//           onDragOver={handleDragOver}
//         >
//           <h3>Available Topics</h3>
//           {availableTopics.map((topic) => (
//             <div
//               key={topic}
//               draggable="true"
//               onDragStart={(e) => handleDragStart(e, topic)}
//               style={styles.draggableItem}
//             >
//               {topic}
//             </div>
//           ))}
//         </div>

//         {/* Selected Topics */}
//         <div
//           id="selectedTopics"
//           style={styles.column}
//           onDrop={(e) => handleDrop(e, 'selectedTopics')}
//           onDragOver={handleDragOver}
//         >
//           <h3>Selected Topics</h3>
//           {selectedTopics.map((topic) => (
//             <div
//               key={topic}
//               draggable="true"
//               onDragStart={(e) => handleDragStart(e, topic)}
//               style={styles.draggableItem}
//             >
//               {topic}
//             </div>
//           ))}
//         </div>
//       </div>
//       <button type="button" onClick={handleSave} style={styles.button}>Save Preferences</button>
//     </div>
//   );
// };

// // Styles
// const styles = {
//   container: {
//     maxWidth: '800px',
//     margin: '50px auto',
//     padding: '20px',
//     border: '1px solid #ddd',
//     borderRadius: '5px',
//     boxShadow: '0 0 10px rgba(0,0,0,0.1)',
//   },
//   searchBarContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginBottom: '20px',
//   },
//   searchBar: {
//     width: '300px',
//     padding: '10px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     marginRight: '10px',
//   },
//   button: {
//     padding: '10px',
//     fontSize: '16px',
//     borderRadius: '3px',
//     border: 'none',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     cursor: 'pointer',
//   },
//   newsContainer: {
//     marginTop: '20px',
//     padding: '10px',
//     border: '1px solid #ccc',
//     backgroundColor: '#f9f9f9',
//     borderRadius: '5px',
//   },
//   newsImage: {
//     maxWidth: '100%',
//     height: 'auto',
//     borderRadius: '5px',
//   },
//   dragDropContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//   },
//   column: {
//     width: '45%',
//     minHeight: '200px',
//     padding: '10px',
//     border: '1px solid #ccc',
//     backgroundColor: '#f9f9f9',
//     borderRadius: '5px',
//   },
//   draggableItem: {
//     padding: '10px',
//     marginBottom: '8px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     borderRadius: '5px',
//     textAlign: 'center',
//     cursor: 'move',
//   },
//   message: {
//     color: 'green',
//     textAlign: 'center',
//   },
// };

// export default PreferencesPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PreferencesPage = () => {
  const { token } = useParams(); // Extract token from the URL
  const [availableTopics, setAvailableTopics] = useState(['', '', '', '', '']);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [firstNews, setFirstNews] = useState(null); // State to hold the first news item
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user preferences with the token
    axios.get('http://localhost:3030/api/preferences', {
      headers: {
        Authorization: `Bearer ${token}`,  // Send token in Authorization header
      },
    })
    .then((res) => {
      setSelectedTopics(res.data.topics);
      setAvailableTopics(prev => prev.filter(topic => !res.data.topics.includes(topic))); // Remove already selected topics from available ones
    })
    .catch((err) => {
      console.error(err);
      setMessage('Failed to fetch preferences. The link might be invalid or expired.');
    });
  }, [token]);

  // Handle search bar input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to fetch news when searching for a ticker
  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      axios
        .get(`http://localhost:3030/api/stock-news?symbol=${searchTerm.trim()}`)
        .then((response) => {
          const news = response.data.news || [];
          if (news.length > 0) {
            setFirstNews(news[0]);  // Set the first news item
            console.log('First News Item:', news[0]);  // Log the first news item

            // Add the news article to available topics as the first item
            const newsTitle = news[0].article_title;
            setAvailableTopics((prev) => [newsTitle, ...prev]); // Add to the top of available topics
          } else {
            setMessage('No news found for the provided symbol.');
          }
        })
        .catch((err) => {
          console.error(err);
          setMessage('Failed to fetch stock news');
        });
    }
  };

  // Handle drag and drop functionality
  const handleDragStart = (e, topic) => {
    e.dataTransfer.setData('text', topic);  // Save the topic being dragged
  };

  const handleDrop = (e, dropZone) => {
    const topic = e.dataTransfer.getData('text');  // Retrieve the dragged topic
    if (dropZone === 'selectedTopics') {
      if (!selectedTopics.includes(topic)) {
        setSelectedTopics([...selectedTopics, topic]);
        setAvailableTopics(availableTopics.filter(t => t !== topic));

        // Send the selected topic (news) via email
        sendSelectedTopicViaEmail(topic);
      }
    } else if (dropZone === 'availableTopics') {
      if (!availableTopics.includes(topic)) {
        setAvailableTopics([...availableTopics, topic]);
        setSelectedTopics(selectedTopics.filter(t => t !== topic));
      }
    }
  };

  const sendSelectedTopicViaEmail = (topic) => {
    axios.post('http://localhost:3030/api/send-news-email', { topic }, {
      headers: {
        Authorization: `Bearer ${token}`,  // Send token to send email
      },
    })
    .then(() => {
      console.log('Email sent with selected news:', topic);
    })
    .catch((err) => {
      console.error('Error sending email:', err);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent the default to allow drop
  };

  const handleSave = () => {
    axios.post('http://localhost:3030/api/preferences', { topics: selectedTopics }, {
      headers: {
        Authorization: `Bearer ${token}`,  // Send token to save preferences
      },
    })
    .then(() => {
      setMessage('Preferences saved successfully!');
    })
    .catch((err) => {
      console.error(err);
      setMessage('Failed to save preferences.');
    });
  };

  return (
    <div style={styles.container}>
      <h1>Edit Preferences</h1>
      {message && <p style={styles.message}>{message}</p>}

      {/* Search Bar */}
      <div style={styles.searchBarContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a stock symbol (e.g., AAPL)"
          style={styles.searchBar}
        />
        <button onClick={handleSearchSubmit} style={styles.button}>
          Search News
        </button>
      </div>

      {/* Display First News Result */}
      {firstNews && (
        <div style={styles.newsContainer}>
          <h3>Latest News for {searchTerm}:</h3>
          <div>
            <a href={firstNews.article_url} target="_blank" rel="noopener noreferrer">
              <h4>{firstNews.article_title}</h4>
            </a>
            <p>{firstNews.source}</p>
            <img src={firstNews.article_photo_url} alt={firstNews.article_title} style={styles.newsImage} />
            <p>{firstNews.post_time_utc}</p>
          </div>
        </div>
      )}

      <div style={styles.dragDropContainer}>
        {/* Available Topics */}
        <div
          id="availableTopics"
          style={styles.column}
          onDrop={(e) => handleDrop(e, 'availableTopics')}
          onDragOver={handleDragOver}
        >
          <h3>Available Topics</h3>
          {availableTopics.map((topic) => (
            <div
              key={topic}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, topic)}
              style={styles.draggableItem}
            >
              {topic}
            </div>
          ))}
        </div>

        {/* Selected Topics */}
        <div
          id="selectedTopics"
          style={styles.column}
          onDrop={(e) => handleDrop(e, 'selectedTopics')}
          onDragOver={handleDragOver}
        >
          <h3>Selected Topics</h3>
          {selectedTopics.map((topic) => (
            <div
              key={topic}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, topic)}
              style={styles.draggableItem}
            >
              {topic}
            </div>
          ))}
        </div>
      </div>
      <button type="button" onClick={handleSave} style={styles.button}>Save Preferences</button>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  searchBarContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  searchBar: {
    width: '300px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '3px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  newsContainer: {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
  },
  newsImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '5px',
  },
  dragDropContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  column: {
    width: '45%',
    minHeight: '200px',
    padding: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
  },
  draggableItem: {
    padding: '10px',
    marginBottom: '8px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    textAlign: 'center',
    cursor: 'move',
  },
  message: {
    color: 'green',
    textAlign: 'center',
  },
};

export default PreferencesPage;

