
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Layout = ({ children }) => (
  <>
    <Helmet>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap');
          :root { --primary-green: #2bae66; --secondary-green: #218c54; }
        `}
      </style>
    </Helmet>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="font-['Outfit'] bg-slate-50"
    >
      {children}
    </motion.div>
  </>
);

export default Layout;