// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { motion } from 'framer-motion';

// const schema = yup.object().shape({
//   name: yup.string().required('Name is required'),
//   email: yup.string().email('Invalid email').required('Email is required'),
//   subject: yup.string().required('Subject is required'),
//   message: yup.string().required('Message is required'),
// });

// const ContactForm = ({ onSubmit }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   return (
//     <motion.form
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-6"
//     >
//       <div>
//         <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//           Name
//         </label>
//         <input
//           type="text"
//           id="name"
//           {...register('name')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
//         />
//         {errors.name && (
//           <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
//         )}
//       </div>

//       <div>
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           {...register('email')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
//         />
//         {errors.email && (
//           <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
//         )}
//       </div>

//       <div>
//         <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
//           Subject
//         </label>
//         <input
//           type="text"
//           id="subject"
//           {...register('subject')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
//         />
//         {errors.subject && (
//           <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>
//         )}
//       </div>

//       <div>
//         <label htmlFor="message" className="block text-sm font-medium text-gray-700">
//           Message
//         </label>
//         <textarea
//           id="message"
//           {...register('message')}
//           rows="4"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
//         />
//         {errors.message && (
//           <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
//         )}
//       </div>

//       <div>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           type="submit"
//           className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors"
//         >
//           Submit
//         </motion.button>
//       </div>
//     </motion.form>
//   );
// };

// export default ContactForm;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Leaf, CheckCircle, Loader } from 'lucide-react';

// Form validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

// Input field component with enhanced animations
const FormField = ({ label, error, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative"
    >
      <label className="block text-emerald-800 font-medium mb-2 tracking-wide">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-red-500 mt-1 flex items-center"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ContactForm = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-lg 
    bg-white/80 backdrop-blur-sm
    border-2 border-emerald-100
    shadow-sm transition-all duration-200
    placeholder:text-emerald-300
    focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20
    hover:border-emerald-200
  `;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      {/* Nature-inspired decorative elements */}
      <motion.div
        animate={{
          rotate: [0, 5, -5, 0],
          transition: { duration: 10, repeat: Infinity }
        }}
        className="absolute -top-8 -right-8 text-emerald-200/30"
      >
        <Leaf size={120} />
      </motion.div>

      <motion.form
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        onSubmit={handleSubmit(handleFormSubmit)}
        className="relative backdrop-blur-md bg-gradient-to-b from-white/80 to-emerald-50/80 
                   p-8 rounded-2xl shadow-xl space-y-6 border border-emerald-100"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <FormField label="Name" error={errors.name?.message}>
            <input
              type="text"
              {...register('name')}
              className={inputClasses}
              placeholder="Mr Green"
            />
          </FormField>

          <FormField label="Email" error={errors.email?.message}>
            <input
              type="email"
              {...register('email')}
              className={inputClasses}
              placeholder="mrgreen@example.com"
            />
          </FormField>
        </div>

        <FormField label="Subject" error={errors.subject?.message}>
          <input
            type="text"
            {...register('subject')}
            className={inputClasses}
            placeholder="How can we help?"
          />
        </FormField>

        <FormField label="Message" error={errors.message?.message}>
          <textarea
            {...register('message')}
            rows="4"
            className={`${inputClasses} resize-none`}
            placeholder="Tell us more about your inquiry..."
          />
        </FormField>

        <motion.div
          className="flex justify-end"
          initial={false}
          animate={submitted ? "success" : "idle"}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting || submitted}
            className={`
              flex items-center justify-center gap-2 
              px-6 py-3 rounded-lg font-medium
              transform transition-all duration-200
              ${submitted 
                ? 'bg-green-500 text-white' 
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }
              disabled:opacity-70 disabled:cursor-not-allowed
              shadow-lg shadow-emerald-500/20
            `}
          >
            {isSubmitting ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : submitted ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Sent Successfully!
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default ContactForm;