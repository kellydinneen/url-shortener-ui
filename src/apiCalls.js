export const getUrls = async () => {
    const result = await fetch('http://localhost:3001/api/v1/urls')
    return result;
  }

export const postUrl = (url) => {
    const post = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(url)
      }
    return fetch(`http://localhost:3001/api/v1/urls`, post)
      .then(res => {if (!res.ok) {
          console.log(res.status);
        } else {
          return res.json();
        }})
      }
