import Provider from '../contexts';
import '../styles/globals.css';
import '../styles/login.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
