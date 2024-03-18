import "@/styles/globals.css";
import { GlobalProvider } from "@/contexts/Global";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
export default function App({ Component, pageProps }) {
  return(
    <>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </>
  );
}
