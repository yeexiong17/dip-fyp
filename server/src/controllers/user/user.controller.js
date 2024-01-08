const {
    createNewUser,
    loginUser,
    createNewReport,
    updateUsername,
    updatePassword,
    getAllReport,
    saveReportImage,
    getUserById,
    createReview,
    getUserByEmail,
    getAllCategory,
} = require('../../models/user/user.model')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var nodemailer = require('nodemailer')
var crypto = require('crypto');

const JWT_SECRET = 'wkfj4oj(j3j_fjej224()j3nnjt[kfef[]wm2o4j5nmo3mme?eowfkgrk?fmemmo[]feokoofekm4933ojfegnmzo'

async function httpCreateNewUser(req, res) {
    try {
        const userData = req.body

        const existingUser = await getUserByEmail(userData.email)

        if (existingUser) {
            return res.status(400).json({ message: 'User Already Exists' })
        }

        const user = await createNewUser(userData)

        const cleanUser = {
            user_id: user.user_id,
            user_username: user.user_username,
            user_email: user.user_email,
            timestamp: Date.now(),
        }

        const token = jwt.sign(cleanUser, process.env.tokenSecret, { expiresIn: '1h' })

        res.cookie('token', token, { sameSite: 'None', secure: true, httpOnly: true })

        res.status(200).json({ cleanUser, message: 'User created successfully', token })
    }
    catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

async function httpLoginUser(req, res) {
    try {
        const userData = req.body
        const existingUser = await getUserByEmail(userData.email)

        if (!existingUser) {
            return res.status(400).json({ message: 'User Not Found' })
        }

        const { comparePassword, user } = await loginUser(userData);

        if (!comparePassword || !user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const cleanUser = {
            user_id: user.user_id,
            user_username: user.user_username,
            user_email: user.user_email,
            unique_identifier: crypto.randomBytes(16).toString('hex'),
        }

        const token = jwt.sign(cleanUser, process.env.tokenSecret, { expiresIn: '1h' })

        res.cookie('token', token, { sameSite: 'None', secure: true, httpOnly: true })

        res.status(200).json({ cleanUser, message: 'User logged in successfully', token })

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function httpUpdateUsername(req, res) {
    const userId = req.params.userId

    try {
        const newUsername = req.body

        const result = await updateUsername(newUsername, userId)

        res.status(200).json({ message: 'Username updated succesfully' })

    }
    catch (error) {
        console.log(error)
        res.status(400).send('Error Saving Report')
    }
}

async function httpForgetPassword(req, res) {
    const { email } = req.body

    try {
        const userObject = await getUserByEmail(email)

        if (!userObject) {
            return res.status(400).json({ message: 'Please enter a valid email address' })
        }

        const secret = JWT_SECRET + userObject.user_password

        const token = jwt.sign({ email: userObject.user_email, id: userObject.user_id }, secret, { expiresIn: '5m' })

        const link = `http://localhost:5173/reset-password/${userObject.user_id}/${token}`
        console.log(link)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '1211207422@student.mmu.edu.my',
                pass: 'grwohwgnowgcvfyk'
            }
        });

        var mailOptions = {
            from: '1211207422@student.mmu.edu.my',
            to: email,
            subject: 'Reset Password Request',
            html: `<!DOCTYPE html>
            <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
            
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"><xml><o:OfficeDocumentSettings><o:PixelsPerInch></o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml>
                <style>
                    * {
                        box-sizing: border-box;
                    }
            
                    body {
                        margin: 0;
                        padding: 0;
                    }
            
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: inherit !important;
                    }
            
                    #MessageViewBody a {
                        color: inherit;
                        text-decoration: none;
                    }
            
                    p {
                        line-height: inherit
                    }
            
                    .desktop_hide,
                    .desktop_hide table {
                        mso-hide: all;
                        display: none;
                        max-height: 0px;
                        overflow: hidden;
                    }
            
                    .image_block img+div {
                        display: none;
                    }
            
                    @media (max-width:620px) {
            
                        .desktop_hide table.icons-inner,
                        .social_block.desktop_hide .social-table {
                            display: inline-block !important;
                        }
            
                        .icons-inner {
                            text-align: center;
                        }
            
                        .icons-inner td {
                            margin: 0 auto;
                        }
            
                        .mobile_hide {
                            display: none;
                        }
            
                        .row-content {
                            width: 100% !important;
                        }
            
                        .stack .column {
                            width: 100%;
                            display: block;
                        }
            
                        .mobile_hide {
                            min-height: 0;
                            max-height: 0;
                            max-width: 0;
                            overflow: hidden;
                            font-size: 0px;
                        }
            
                        .desktop_hide,
                        .desktop_hide table {
                            display: table !important;
                            max-height: none !important;
                        }
                    }
                </style>
            </head>
            
            <body style="background-color: #d9dffa; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
            <table class="image_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <tr>
                <td class="pad">
                    <div class="alignment" align="center" style="line-height:10px">
                        <div><a href="http://localhost:5173/" target="_blank" style="outline:none; text-decoration: none; color: #f97316; font-size: 1.4rem" tabindex="-1"><h1>Resolve</h1></a></div>
                    </div>
                </td>
            </tr>
        </table>
                <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9dffa;">
                    <tbody>
                        <tr>
                            <td>
                                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #cfd6f4;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="width:100%;">
                                                                            <div class="alignment" align="center" style="line-height:10px">
                                                                                <div style="max-width: 600px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/3991/animated_header.gif" style="display: block; height: auto; border: 0; width: 100%;" width="600" alt="Card Header with Border and Shadow Animated" title="Card Header with Border and Shadow Animated"></div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9dffa; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/3991/body_background_2.png'); background-position: top center; background-repeat: repeat;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 15px; padding-left: 50px; padding-right: 50px; padding-top: 15px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div style="color:#506bec;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:38px;line-height:120%;text-align:left;mso-line-height-alt:45.6px;">
                                                                                <p style="margin: 0; word-break: break-word; color: #f97316;"><strong><span>Forgot your password?</span></strong></p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="paragraph_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div style="color:#40507a;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                                <p style="margin: 0; word-break: break-word;"><span>Hey, we received a request to reset your password.</span></p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div style="color:#40507a;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                                <p style="margin: 0; word-break: break-word;"><span>Let’s get you a new one!</span></p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="button_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:20px;text-align:left;">
                                                                            <div class="alignment" align="left">
            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://www.example.com/" style="height:48px;width:212px;v-text-anchor:middle;" arcsize="34%" stroke="false" fillcolor="#506bec">
            <w:anchorlock/>
            <v:textbox inset="5px,0px,0px,0px">
            <center style="color:#ffffff; font-family:Arial, sans-serif; font-size:15px">
            <a href=${link} target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#f97316;border-radius:16px;width:auto;border-top:0px solid TRANSPARENT;font-weight:undefined;border-right:0px solid TRANSPARENT;border-bottom:0px solid TRANSPARENT;border-left:0px solid TRANSPARENT;padding-top:8px;padding-bottom:8px;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:15px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:25px;padding-right:20px;font-size:15px;display:inline-block;letter-spacing:normal;"><span style="word-break:break-word;"><span style="line-height: 30px;" data-mce-style><strong>RESET MY PASSWORD</strong></span></span></span></a></center></v:textbox></v:roundrect></div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="paragraph_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div style="color:#40507a;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                                                                <p style="margin: 0; word-break: break-word;">Didn’t request a password reset? You can ignore this message.</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td class="pad" style="width:100%;">
                                                                            <div class="alignment" align="center" style="line-height:10px">
                                                                                <div style="max-width: 600px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/3991/bottom_img.png" style="display: block; height: auto; border: 0; width: 100%;" width="600" alt="Card Bottom with Border and Shadow Image" title="Card Bottom with Border and Shadow Image"></div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;" width="600">
                                                    <tbody>
                                                        <tr>
                                                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; padding-left: 10px; padding-right: 10px; padding-top: 10px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div style="color:#97a2da;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                                                                <p style="margin: 0; word-break: break-word;">+(601) 456–7890</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div style="color:#97a2da;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                                                                <p style="margin: 0; word-break: break-word;">This link will expire in the next 15 minutes.<br>Please feel free to contact us at resolve@gmail.com. </p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table class="paragraph_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                    <tr>
                                                                        <td class="pad">
                                                                            <div style="color:#97a2da;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:12px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
                                                                                <p style="margin: 0; word-break: break-word;"><span>Copyright© 2023 RESOLVE.</span></p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
            
            </html>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.status(200).json({ message: 'Reset Link Has Been Sent To Your Email' })
    }
    catch (error) {
        console.log(error)
    }
}

async function httpResetPassword(req, res) {
    const { userId, token } = req.params
    const { password } = req.body

    const userObject = await getUserById(userId)

    if (!userObject) {
        return res.status(400).json({ message: 'User Not Found' })
    }

    const secret = JWT_SECRET + userObject.user_password

    try {
        const verify = jwt.verify(token, secret)
        console.log('Verified')

        const result = await updatePassword(userId, password)

        res.status(200).json({ message: 'Password Updated Successfully' })
    }
    catch (error) {
        console.log('Not Verified')

        res.status(400).json({ message: 'Link is not verified' })
    }
}

async function httpCreateReport(req, res) {
    try {
        const userReportData = req.body

        const result = await createNewReport(userReportData)

        res.status(200).json({ result, message: 'Report saved succesfully' })

    }
    catch (error) {
        console.log(error)
        res.status(400).send('Error Saving Report')
    }
}

async function httpSaveReportImage(req, res) {
    const reportId = req.params.reportId
    try {
        const { imageUrl } = req.body

        if (!imageUrl) {
            return res.status(400).json({ message: 'imageUrl is missing in the request body' });
        }

        const result = await saveReportImage(imageUrl, reportId)

        res.status(200).json({ message: 'Attachment stored successfully' })
    }
    catch (error) {
        console.log(error)
    }
}

async function httpGetAllReport(req, res) {
    const userId = req.params.userId

    try {
        const result = await getAllReport(userId)
        res.status(200).json({ result, message: 'All reports fetched successfully' })

    }
    catch (error) {
        console.log(error)
    }
}

async function httpCreateReview(req, res) {
    const { report_id, rating1, rating2, comment } = req.body

    try {
        const { reviewResult, reportResult } = await createReview(report_id, rating1, rating2, comment)

        res.status(200).json({ reviewResult, reportResult, message: 'Review Created Successfully' })
    }
    catch (error) {
        console.log(error)
    }
}

async function httpChangePassword(req, res) {
    const { userId, oldPassword, newPassword } = req.body

    const user = await getUserById(userId)

    const comparePassword = bcrypt.compareSync(oldPassword, user.user_password)

    if (comparePassword && user) {
        try {
            const result = await updatePassword(userId, newPassword)

            return res.status(200).json({ message: 'Password Changed Successfully' })
        }
        catch (error) {
            return res.status(400).json({ error })
        }
    }

    return res.status(401).json({ message: 'Old Password Is Incorrect' })

}

async function httpGetAllCategory(req, res) {

    try {
        const categoryData = await getAllCategory()

        return res.status(200).json({ categoryData, message: 'Fetch Category Data Successfully' })

    }
    catch (error) {
        return res.status(400).json({ message: 'Failed to get category data' })
    }

}

async function httpLogOutUser(req, res) {
    return res.status(200).json({ message: 'Logout successful' })
}

async function httpGetUserProfile(req, res) {
    return res.status(200).json({ userObject: req.user })
}

module.exports = {
    httpCreateNewUser,
    httpLoginUser,
    httpCreateReport,
    httpUpdateUsername,
    httpGetAllReport,
    httpSaveReportImage,
    httpForgetPassword,
    httpResetPassword,
    httpCreateReview,
    httpChangePassword,
    httpGetAllCategory,
    httpLogOutUser,
    httpGetUserProfile
}