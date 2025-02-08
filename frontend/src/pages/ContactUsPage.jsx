import React, { useState } from 'react';
import ContactForm from '../components/Contact/ContactForm';
import InteractiveMap from '../components/Contact/InteractiveMap';
import LoadingSkeleton from '../components/Contact/LoadingSkeleton';
import SuccessErrorFeedback from '../components/Contact/SuccessErrorFeedback';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading.json';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQSection from '../components/Contact/FAQSection';

const ContactUsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setFeedback({ type: 'success', message: 'Your message has been sent successfully!' });
    }, 2000);
  };

  return (
    <>
    <Navbar />
    <div className='pt-8'>
    <FAQSection />
      
    </div>
    <div className="min-h-screen  bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mt-8 mx-auto">
        <h1 className="text-3xl font-bold text-emerald-600 mb-8 text-center">Reach Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            {feedback.message && (
              <SuccessErrorFeedback type={feedback.type} message={feedback.message} />
            )}
            {isLoading ? (
              <div className="space-y-6">
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <div className="flex justify-center items-center">
                  <Lottie animationData={loadingAnimation} loop={true} className="w-32 h-32" />
                </div>
              </div>
            ) : (
              <ContactForm onSubmit={onSubmit} />
            )}
          </div>

          {/* Interactive Map */}
          <div>
            <InteractiveMap />
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
    </>
  );
};

export default ContactUsPage;