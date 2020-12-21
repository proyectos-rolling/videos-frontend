import React, {useEffect, useState} from 'react'

const Quote = () => {
  const [quote, setQuote] = useState({content:"",author:""})

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((json) => {
        setQuote({content: json.content, author: json.author});
      });
  }, []);

  return (
    <div className="col-12 mt-5 d-flex justify-content-center">
      <figure>
        <blockquote class="blockquote">
          <p>{quote.content}</p>
        </blockquote>
        <figcaption class="blockquote-footer">
          {quote.author}
        </figcaption>
      </figure>
    </div>
  );
}

export default Quote
