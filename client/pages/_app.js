import Layout from '../components/Layout'
import { motion } from "framer-motion";
import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion';
function MyApp({ Component, pageProps, router }) {

  return (
    <AnimatePresence>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AnimatePresence>
  )
}

export default MyApp
