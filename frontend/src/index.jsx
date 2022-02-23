import { render }						from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React							from 'react';
import App								from './pages/app';
import About							from './pages/about';
import NotFound							from './pages/notfound';


render(
<BrowserRouter>
	<Routes>
		<Route path="*" element={ <NotFound /> }  />
		<Route exact path="/" element={ <App /> } />
		<Route exact path="/about" element={ <About /> } />
	  </Routes>
</BrowserRouter>,
document.getElementById('root'));