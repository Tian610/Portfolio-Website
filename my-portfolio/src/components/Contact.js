import React, { useRef, useState } from "react";
import emailIcon from "../assets/email.png";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_p4vapxs";
const TEMPLATE_ID = "template_khfzs69"; // <-- Replace with your actual template ID
const PUBLIC_KEY = "1NzXiBqhGyK9ViKVe";

function Contact() {
    const form = useRef();
    const [curState, setState] = useState("");

    const handleOnSubmit = (e) => {
        e.preventDefault();
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
          .then((result) => {
            console.log(result.text);
            setState("Message Sent! You'll get a reply soon!");
          }, (error) => {
            console.log(error.text);
            setState('Something went wrong! Maybe try again later?')
          });
          e.target.reset();
    };

    return (
        <section id="contact">
            <div className="section-container">
                <div className="header">
                    <p className="section__text__p3">Reach out to me!</p>
                    <h1 className="title">Contact</h1>
                </div>
                <div className="form-container">
                    <form ref={form} onSubmit={handleOnSubmit}>
                        <div className="form-element">
                            <label htmlFor="name" className="label-title">Name</label>
                            <input type="text" id="name" name="name" placeholder="Your name..." />
                        </div>
                        <div className="form-element">
                            <label htmlFor="contact-details" className="label-title">Contact Details</label>
                            <input type="text" id="contact-details" name="contact-details" placeholder="An email, phone number, etc." />
                        </div>
                        <div className="form-element">
                            <label htmlFor="message" className="label-title">Message</label>
                            <textarea id="message" name="message" placeholder="Write a message here!"></textarea>
                        </div>
                        <div className="thingy">
                            <input className="btn-color-2" type="submit" value="Submit" />
                            {curState && (
                                <span className="status-message animate-status">{curState}</span>
                            )}
                        </div>
                    </form>
                    <br />
                    <p>Or reach me at:</p>
                    <div className="contact-container">
                        <div className="contact-details-container">
                            <img src={emailIcon} alt="email" className="icon" />
                            <a href="mailto:tianxingc@gmail.com">tianxingc@gmail.com</a>
                        </div>
                        <div className="contact-details-container">
                            <img src={emailIcon} alt="email" className="icon" />
                            <a href="tel:647-769-5662">(647)-769-5662</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;