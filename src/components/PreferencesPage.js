

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PreferencesPage = () => {
  const { token } = useParams(); // Extract token from URL
  const [availableTopics, setAvailableTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [keywords, setKeywords] = useState([]); // Store keywords
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user preferences and keywords with the token
    axios
      .get('http://localhost:3030/api/preferences', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { topics = [], keywords = [] } = res.data; // Extract topics and keywords
        setSelectedTopics(topics);
        setKeywords(keywords); // Store the keywords
        setAvailableTopics((prev) => prev.filter((topic) => !topics.includes(topic)));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage('Failed to fetch preferences. The link might be invalid or expired.');
        setLoading(false);
      });
  }, [token]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      axios
        .get(`http://localhost:3030/api/stock-news?symbol=${searchTerm.trim()}`)
        .then((response) => {
          const news = response.data.news || [];
          if (news.length > 0) {
            setAvailableTopics((prev) => [news[0].article_title, ...prev]);
            setMessage('News found and added to available topics!');
          } else {
            setMessage('No news found for the provided symbol.');
          }
        })
        .catch((err) => {
          console.error(err);
          setMessage('Failed to fetch stock news.');
        });
    }
  };

  const handleDragStart = (e, topic) => e.dataTransfer.setData('topic', topic);

  const handleDrop = (e, dropZone) => {
    e.preventDefault();
    const topic = e.dataTransfer.getData('topic');

    if (dropZone === 'selectedTopics' && !selectedTopics.includes(topic)) {
      setSelectedTopics([...selectedTopics, topic]);
      setAvailableTopics((prev) => prev.filter((t) => t !== topic));
    } else if (dropZone === 'availableTopics' && !availableTopics.includes(topic)) {
      setAvailableTopics([...availableTopics, topic]);
      setSelectedTopics((prev) => prev.filter((t) => t !== topic));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSave = () => {
    axios
      .post('http://localhost:3030/api/preferences', { topics: selectedTopics }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessage('Preferences saved successfully!');
        setKeywords(res.data.keywords); // Update keywords after saving
      })
      .catch((err) => {
        console.error(err);
        setMessage('Failed to save preferences.');
      });
  };

  if (loading) return <p>Loading preferences...</p>;

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

      <div style={styles.dragDropContainer}>
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
              draggable
              onDragStart={(e) => handleDragStart(e, topic)}
              style={styles.draggableItem}
            >
              {topic}
            </div>
          ))}
        </div>

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
              draggable
              onDragStart={(e) => handleDragStart(e, topic)}
              style={styles.draggableItem}
            >
              {topic}
            </div>
          ))}
        </div>
      </div>

      <button type="button" onClick={handleSave} style={styles.button}>
        Save Preferences
      </button>

      {/* Display Keywords */}
      <div style={styles.keywordsContainer}>
        <h3>Extracted Keywords</h3>
        <div style={styles.keywordsBox}>
          {keywords.map((keyword, index) => (
            <span key={index} style={styles.keywordItem}>
              {keyword}
            </span>
          ))}
        </div>
      </div>
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
  dragDropContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
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
  },
  message: {
    color: 'green',
    textAlign: 'center',
  },
  keywordsContainer: {
    marginTop: '30px',
  },
  keywordsBox: {
    padding: '15px',
    backgroundColor: '#e3f2fd',
    borderRadius: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  keywordItem: {
    backgroundColor: '#2196f3',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '20px',
    cursor: 'pointer',
  },
};

export default PreferencesPage;