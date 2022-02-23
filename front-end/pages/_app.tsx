import '../styles/globals.css'
import { Provider } from 'react-redux';
import { store } from '../store';
import { AppProps } from 'next/app'
import NavBar from '../components/NavBar'

function MyApp({ Component, pageProps }: AppProps)  {
  return (
    <Provider store={store}>   
      <NavBar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp
