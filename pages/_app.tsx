import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<main className="pb-16">
			<Component {...pageProps} />
		</main>
	);
}

export default MyApp;
