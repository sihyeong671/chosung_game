import Layout from '../components/Layout'
import { motion } from "framer-motion";
import '../styles/globals.css'

function MyApp({ Component, pageProps, router }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerDirection: -1
      }
    }
  }
  return (
    <motion.div
      key={router.route}
      initial="hidden"
      animate={{ rotate: 360 }}
      transition={{ type: 'spring' }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </motion.div>
  )
}

export default MyApp
