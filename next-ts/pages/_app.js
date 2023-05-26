import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

import 'aos/dist/aos.css';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AOS from 'aos';
/*page loader
 *package name:nProgress
 * github: https://github.com/rstacruz/nprogress */
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import { useEffect } from 'react';
import { Provider } from 'react-redux';

import '../styles/globals.css';
import '../styles/loader.css';
import '../styles/selectbox.css';
import '../styles/order-style.css';
import 'nprogress/nprogress.css';
import 'aos/dist/aos.css';

import Toaster from '../src/components/Helpers/Toaster';
import DefaultLayout from '../src/components/Partials/DefaultLayout';
import MaintenanceWrapper from '../src/components/Partials/Headers/MaintenanceWrapper';
import store from '../src/store/store';
//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

//font awesome
library.add(fas, fab, far);

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <DefaultLayout>
            <MaintenanceWrapper>
              <Component {...pageProps} />
            </MaintenanceWrapper>
          </DefaultLayout>
        </Provider>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
