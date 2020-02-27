export const getData = plotParams => {
  return fetch("http://34.87.127.76:8080/simulate", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(plotParams)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
