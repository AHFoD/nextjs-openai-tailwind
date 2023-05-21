import {useEffect, useState} from 'react';
import axios from 'axios';

const IndexPage = () => {
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);
    setResponse('');

    const res = await fetch('/api/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt}),
    }).then(res => res.json());

    console.log(res.data);

    setResponse(res.data.text);
    setLoading(false);
  };

  const handleTryAgain = () => {
    setResponse('');
    setPrompt('');
  };

  useEffect(() => {
    console.log('Check yg ni running tak');

    const parseData = {
      latitude: 3.140853,
      longitude: 101.693207,
    };

    const fetchData = async () => {
      try {
        console.log('masuk tak');

        const res = await axios.post('/api/places', parseData);
        console.log(res);

        const resPlaces = await axios.post('/api/places', parseData);
        console.log(resPlaces);

        // const res = await fetch('/api/places', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(parseData),
        // }).then(res => res.json());
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(fetchData());
  }, []);

  return (
    <div className="max-w-md mx-auto pt-20">
      <h1 className="text-3xl font-bold text-center mb-6 bg-white">
        Ask Me Anything!
      </h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8">
        <div className="mb-4">
          <label
            htmlFor="prompt"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            What do you want to know?
          </label>
          <input
            id="prompt"
            type="text"
            name="prompt"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="How to ask a question?"
            autoComplete="off"
            disabled={!!response || loading}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        {response && (
          <div className="mb-4">
            <h2 className="font-bold">Response</h2>
            <a href="#" className="pl-2 text-gray-700 whitespace-pre-line">
              {response}
            </a>
          </div>
        )}
        <div className="flex gap-2">
          {response ? (
            <button
              onClick={handleTryAgain}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Try again
            </button>
          ) : (
            <button
              type="submit"
              disabled={!!loading || prompt.length < 5}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? 'Thinking...' : 'Ask'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default IndexPage;
