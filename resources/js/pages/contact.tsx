import GuestLayout from '@/layouts/GuestLayout';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

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
            <div className="bg-white dark:bg-gray-800 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Get in Touch
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Ready to start your project? Have questions about our services? 
                            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            {/* Contact Form */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Send us a message
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="form-input"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="form-input"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="form-input"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Subject *
                                            </label>
                                            <select
                                                name="subject"
                                                id="subject"
                                                required
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="form-select"
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
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            id="message"
                                            rows={6}
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="form-textarea"
                                            placeholder="Tell us about your project or inquiry..."
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                        >
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                        Contact Information
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                                        Get in touch with us through any of the following channels. 
                                        We're here to help and answer any questions you may have.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                Email
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                info@sunshine.com
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                support@sunshine.com
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                Phone
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                +1 (555) 123-4567
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                +1 (555) 987-6543
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                Office
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                123 Business Street<br />
                                                Suite 100<br />
                                                City, State 12345
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                Business Hours
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Monday - Friday: 9:00 AM - 6:00 PM<br />
                                                Saturday: 10:00 AM - 4:00 PM<br />
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Section */}
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Frequently Asked Questions
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                How quickly do you respond to inquiries?
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                We typically respond within 24 hours during business days.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                Do you offer free consultations?
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Yes, we offer a free 30-minute consultation to discuss your project needs.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                What is your typical project timeline?
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Project timelines vary based on complexity, typically ranging from 2-12 weeks.
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
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Visit Our Office
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Located in the heart of the city, our office is easily accessible 
                            and welcomes visitors during business hours.
                        </p>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96 flex items-center justify-center">
                        <div className="text-center">
                            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 dark:text-gray-300">
                                Interactive map would be embedded here
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                123 Business Street, Suite 100, City, State 12345
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
