import React from "react";
import emailIcon from "../assets/email.png"

function Contact() {
    return (
        <>
            <section id ="contact">
                <div class="section-container">
                    <div class ="header">
                        <p class ="section__text__p3">Reach out to me!</p>
                        <h1 class ="title">Contact</h1>
                    </div>
                    
                    <div class ="form-container">
                        <form>
                            <div class ="form-element">
                                <label for="name" class="label-title">Name</label>
                                <input type= "text" id="name" placeholder="Your name..." />
                            </div>
                            
                            <div class ="form-element">
                                <label for="contact-details" class="label-title">Contact Details</label>
                                <input type= "text" id="contact-details" placeholder="An email, phone number, etc." />
                            </div>
                            
                            <div class ="form-element">
                                <label for="message" class="label-title">Message</label>
                                <textarea id ="message" placeholder="Write a message here!"></textarea>
                            </div>

                            <input class="btn-color-2" type="submit" value="Submit" onclick="sendEmail()" />
                        </form>
                        <br></br>

                        <p>Or reach me at:</p>

                        <div class="contact-container">
                            <div class="contact-details-container">
                                <img src={emailIcon} alt="email" class="icon" />
                                <a href="mailto:tianxingc@gmail.com">tianxingc@gmail.com</a>
                            </div>
                            <div class="contact-details-container">
                                <img src={emailIcon} alt="email" class="icon" />
                                <a href="tel:647-769-5662">(647)-769-5662</a>
                            </div>
                        </div>
                    </div>
                </div>
            
            </section>
        </>
    );
}

export default Contact;