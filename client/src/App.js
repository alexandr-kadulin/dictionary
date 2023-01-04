import { useState, useEffect } from 'react';
import axios from 'axios';
import { List } from './components';
import { Loading } from './components';
import { Squares } from './components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getItemFromLocalStorage = () => {
  let item = localStorage.getItem('item');

  if (item) {
    return JSON.parse(localStorage.getItem('item'));
  } else {
    return null;
  }
};

function App() {
  const [item, setItem] = useState(getItemFromLocalStorage);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  const getWord = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`/api/v1/words/${name}`);
      toast.success('the search was successful');
      setItem(response.data.word);
      setName('');
      setIsLoading(false);
    } catch (error) {
      toast.error(
        error.response.data.msg
          ? `${error.response.data.msg}`
          : 'oops, something went wrong... please try again later'
      );
      setName('');
      setItem(null);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      toast.warning('please enter the value');
    } else {
      getWord();
    }
  };

  const clearResults = () => {
    setItem(null);
    setName('');
    toast.warning('search results were cleared');
  };

  const copyTextToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    toast.success('value was copied to clipboard');
  };

  useEffect(() => {
    localStorage.setItem('item', JSON.stringify(item));
  }, [item]);

  return (
    <main>
      <div className="snow"></div>
      <section className="section-center box">
        <Squares />
        <form className="dictionary-form" onSubmit={handleSubmit}>
          {isLoading ? (
            <Loading />
          ) : (
            <h3>{(item && item.key) || 'dictionary'}</h3>
          )}
          <div className="form-control">
            <input
              type="text"
              className="dictionary-input"
              placeholder="Search"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submit-btn" disabled={isLoading}>
              go
            </button>
          </div>
        </form>
        {item && (
          <div className="dictionary-container">
            <List item={item} copyTextToClipboard={copyTextToClipboard} />
            <button className="clear-btn" onClick={clearResults}>
              clear results
            </button>
          </div>
        )}
      </section>
      <ToastContainer position="top-center" />
    </main>
  );
}

export default App;
