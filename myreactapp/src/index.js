import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SingleStudent from './components/SingleStudent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App />  */}
    {/* react makes custom tag. each component of react tag starts with capital letter to distinguish. */}
    <SingleStudent name = "Ali" address="LDA Lahore" onRegiterInCourse=""/>
    {/* passing an event. these are not HTML tags */}
    <SingleStudent name = "Ahmad" address="DHA Lahore"/>
    {/* custom attributes are passed. received as parameters in function */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
