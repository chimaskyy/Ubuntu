import emailjs from "@emailjs/browser";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendOrderConfirmationEmail = async (formData, orderId, url) => {
    orderId = orderId.slice(-8);
    
    const emailParams = {
        name: formData.name,
        user_email: formData.email,
        orderId,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
        state: formData.state,
        url,
    }
    return emailjs.send(serviceId, templateId, emailParams, key)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
};
