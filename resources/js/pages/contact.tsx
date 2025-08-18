import GuestLayout from '@/layouts/GuestLayout';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Mail, Phone, MapPin, Clock, Send, Sparkles, MessageCircle, Users, Shield } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        router.post('/contact', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <GuestLayout title="Contact Us">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-cerulean-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-cerulean-200 dark:bg-cerulean-800 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full blur-xl animate-pulse delay-500"></div>

                <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="mb-8 inline-flex items-center rounded-full bg-cerulean-100 dark:bg-cerulean-900 px-4 py-2 text-sm font-medium text-cerulean-700 dark:text-cerulean-300">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Get in Touch
                        </div>
                        
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
                            Let's{' '}
                            <span className="bg-gradient-to-r from-cerulean-600 to-blue-600 bg-clip-text text-transparent">
                                Connect
                            </span>
                        </h1>
                        
                        <p className="mt-8 text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Ready to start your project? Have questions about our services? 
                            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                            {/* Contact Form */}
                            <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 transform hover:-translate-y-1 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-r from-cerulean-50 to-blue-50 dark:from-cerulean-900/20 dark:to-blue-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative">
                                    <div className="mb-8">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cerulean-500 to-blue-500 rounded-xl shadow-lg mb-4">
                                            <Send className="h-6 w-6 text-white" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                            Send us a message
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Fill out the form below and we'll get back to you within 24 hours.
                                        </p>
                                    </div>
                                    
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="form-input w-full rounded-xl border-gray-300 dark:border-gray-600 focus:border-cerulean-500 focus:ring-cerulean-500"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="form-input w-full rounded-xl border-gray-300 dark:border-gray-600 focus:border-cerulean-500 focus:ring-cerulean-500"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    id="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="form-input w-full rounded-xl border-gray-300 dark:border-gray-600 focus:border-cerulean-500 focus:ring-cerulean-500"
                                                    placeholder="+1 (555) 123-4567"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                    Subject *
                                                </label>
                                                <select
                                                    name="subject"
                                                    id="subject"
                                                    required
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    className="form-select w-full rounded-xl border-gray-300 dark:border-gray-600 focus:border-cerulean-500 focus:ring-cerulean-500"
                                                >
                                                    <option value="">Select a subject</option>
                                                    <option value="general">General Inquiry</option>
                                                    <option value="web-development">Web Development</option>
                                                    <option value="mobile-development">Mobile Development</option>
                                                    <option value="ui-ux-design">UI/UX Design</option>
                                                    <option value="digital-marketing">Digital Marketing</option>
                                                    <option value="consulting">Consulting</option>
                                                    <option value="support">Support</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                name="message"
                                                id="message"
                                                rows={6}
                                                required
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="form-textarea w-full rounded-xl border-gray-300 dark:border-gray-600 focus:border-cerulean-500 focus:ring-cerulean-500"
                                                placeholder="Tell us about your project or inquiry..."
                                            />
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="group w-full flex justify-center items-center px-8 py-4 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-cerulean-600 to-blue-600 hover:from-cerulean-700 hover:to-blue-700 transform hover:-translate-y-1 transition-all duration-300"
                                            >
                                                <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                                Send Message
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-8">
                                <div>
                                    <div className="mb-6">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cerulean-500 to-blue-500 rounded-xl shadow-lg mb-4">
                                            <Users className="h-6 w-6 text-white" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                                            Contact Information
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                                            Get in touch with us through any of the following channels. 
                                            We're here to help and answer any questions you may have.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="group bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-600">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="h-12 w-12 bg-gradient-to-r from-cerulean-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                                                    <Mail className="h-6 w-6 text-white" />
                                                </div>
                                            </div>
                                            <div className="ml-6">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                    Email
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-300 text-lg">
                                                    info@sunshine.com
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-300 text-lg">
                                                    support@sunshine.com
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-600">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="h-12 w-12 bg-gradient-to-r from-cerulean-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                                                    <Phone className="h-6 w-6 text-white" />
                                                </div>
                                            </div>
                                            <div className="ml-6">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                    Phone
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-300 text-lg">
                                                    +1 (555) 123-4567
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-300 text-lg">
                                                    +1 (555) 987-6543
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-600">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="h-12 w-12 bg-gradient-to-r from-cerulean-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                                                    <MapPin className="h-6 w-6 text-white" />
                                                </div>
                                            </div>
                                            <div className="ml-6">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                    Office
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-300 text-lg">
                                                    123 Business Street<br />
                                                    Suite 100<br />
                                                    City, State 12345
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-600">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="h-12 w-12 bg-gradient-to-r from-cerulean-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                                                    <Clock className="h-6 w-6 text-white" />
                                                </div>
                                            </div>
                                            <div className="ml-6">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                    Business Hours
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-300 text-lg">
                                                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                                                    Saturday: 10:00 AM - 4:00 PM<br />
                                                    Sunday: Closed
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Section */}
                                <div className="group bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-600 p-8 transform hover:-translate-y-1 transition-all duration-300">
                                    <div className="mb-6">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cerulean-500 to-blue-500 rounded-xl shadow-lg mb-4">
                                            <Shield className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                            Frequently Asked Questions
                                        </h3>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                                                How quickly do you respond to inquiries?
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                We typically respond within 24 hours during business days, and often much sooner for urgent requests.
                                            </p>
                                        </div>
                                        <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                                                Do you offer free consultations?
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Yes, we offer a free 30-minute consultation to discuss your project needs and provide initial recommendations.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                                                What is your typical project timeline?
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Project timelines vary based on complexity, typically ranging from 2-12 weeks. We'll provide a detailed timeline during our consultation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="bg-white dark:bg-gray-800 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-12">
                        <div className="mb-4 inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900 px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300">
                            <MapPin className="mr-2 h-4 w-4" />
                            Visit Our Office
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                            Come{' '}
                            <span className="bg-gradient-to-r from-cerulean-600 to-blue-600 bg-clip-text text-transparent">
                                visit us
                            </span>
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Located in the heart of the city, our office is easily accessible 
                            and welcomes visitors during business hours.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl h-96 flex items-center justify-center shadow-lg">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cerulean-500 to-blue-500 rounded-2xl shadow-lg mb-6">
                                <MapPin className="h-8 w-8 text-white" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
                                Interactive map would be embedded here
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">
                                123 Business Street, Suite 100, City, State 12345
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                    .bg-grid-pattern {
                        background-image: radial-gradient(circle, #000 1px, transparent 1px);
                        background-size: 20px 20px;
                    }
                `
            }} />
        </GuestLayout>
    );
}
