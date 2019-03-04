require('es6-promise').polyfill();
require('isomorphic-fetch');

const question = {
    id: '6ni6ok3ym7mf1p33lnez',
    authedUser: 'evan',
    answer: "optionOne"
};

fetch('http://localhost:5000/ek-would-you-rather/us-central1/app/answer', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({question: question})
}).then(res => res.json())
    .then(data => data.success ? data.result : Promise.reject(data.message))
    .then(data => console.log('success: ', data))
    .catch(err => console.log('error: ', err));