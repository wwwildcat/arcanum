import React from 'react';
import './Footer.css';

const Footer = () =>
	<footer className="Footer">
		<span className="Footer-Address">
			Trade secrets of Yandex LLC. 16, Lev Tolstoy Str., Moscow, Russia, 119021
		</span>
		<span className="Footer-Copyright">
			<span className="Footer-Version">UI: 0.1.15</span>
			<span>© 2007—2019 <a href="https://yandex.ru/" className="Footer-Link">Yandex</a></span>
		</span>
	</footer>

export default Footer;