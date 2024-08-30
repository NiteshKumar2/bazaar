import nodemailer from 'nodemailer';
import { User } from '@/models/userModel';


export const sendEmail = async({email, emailType, userId}) => {
    try {
        // create a hased token
        const hashedToken = Math.floor(1000 + Math.random() * 9000)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }


          var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "bf9732e4af83c1",
              pass: "02db6f089a0352"
            }
          });

        const mailOptions = {
            from: 'kumrrnitesh26@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p> ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
             <br>otp=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error) {
        throw new Error(error.message);
    }
}