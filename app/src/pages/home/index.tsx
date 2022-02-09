import React, { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    fetch(`https://api.github.com/users/ssi02014`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  }, []);

  return <div>홈페이지입니다.</div>;
};

export default HomePage;
