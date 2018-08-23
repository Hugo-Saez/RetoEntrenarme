import axios from 'axios'
const baseUrl = 'https://dev.entrenar.me/api/';
const access_token = localStorage.getItem('access_token');

if (access_token) {
    console.log('token', access_token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
}

const register = (data) => new Promise((resolve, reject)=> {
    axios.post(baseUrl + 'v3/auth/register',  { ...data, source:'geekshubs'}  )
        .then(response => {
            if (response.data.error) {
                reject(response.data);
            } else {
                resolve(response.data);
            }
        })
        .catch(response => reject(response));
});

const login = (data) => new Promise((resolve, reject)=> {
    axios.post(baseUrl + 'v3/oauth/access_token', { ...data, client_id:'geekshubs', client_secret:'f0203v093mi0rsm0mvskds0i443gsmosdj902m', grant_type:'password'} )
        .then(response => {
            if (response.data && !response.data.access_token) {
                reject(response.data);
            } else {
               let token = response.data.access_token;
               localStorage.setItem('access_token', token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                resolve(response.data);
            }
        })
        .catch(response => reject(response));
});

const ranking = (sport, place) => new Promise((resolve, reject)=> {
    axios.get(baseUrl + 'test/sports?sport_id=' + sport +  '&place_id=' + place )
        .then(response => {
            if (response.data.error) {
                reject(response.data);
            } else {
                resolve(response.data);
            }
        })
        .catch(response => reject(response));
});

export default {register, login, ranking};
