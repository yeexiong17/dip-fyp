const {
  createAdmin,
  adminLogin,
  getAdminByEmail,
  getAdminById,
  adminResetPassword,
  getDashboardData,
  getUserFromReport,
  getAllReview,
  acceptNewReport,
  rejectNewReport,
  changePassword,
  setCompletedImage,
  createNewCategory,
  getAllCategory,
  getAllAdmin,
  getAllContact,
  deleteContact,
  deleteCategory
} = require('../../models/admin/admin.model')

const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer')
var crypto = require('crypto')

const JWT_SECRET = process.env.admin_jwt_secret

async function httpCreateAdmin(req, res) {
  const { name, email, password, secretCode } = req.body

  if (secretCode !== '5') {
    return res.status(400).json({ message: 'Invalid Secret Code. Please try again' })
  }

  try {
    const adminObject = await createAdmin(name, email, password)

    const cleanAdmin = {
      admin_id: adminObject.admin_id,
      admin_name: adminObject.admin_name,
      admin_email: adminObject.admin_email,
      unique_identifier: crypto.randomBytes(16).toString('hex'),
    }

    const token = jwt.sign(cleanAdmin, process.env.adminTokenSecret, { expiresIn: '1h' })

    res.cookie('adminToken', token, { sameSite: 'None', secure: true, httpOnly: true })

    return res.status(200).json({ cleanAdmin, message: 'Admin created successfully', token })
  }
  catch (error) {
    console.log(error)
    return res.status(400).json({ error, message: 'Error while creating admin' })
  }
}

async function httpAdminLogin(req, res) {
  const { email, password } = req.body

  const { comparePassword, admin } = await adminLogin(email, password)

  const cleanAdmin = {
    admin_id: admin.admin_id,
    admin_name: admin.admin_name,
    admin_email: admin.admin_email,
    unique_identifier: crypto.randomBytes(16).toString('hex'),
  }

  if (comparePassword && admin) {
    const token = jwt.sign(cleanAdmin, process.env.adminTokenSecret, { expiresIn: '1h' })

    res.cookie('adminToken', token, { sameSite: 'None', secure: true, httpOnly: true })

    return res.status(200).json({ cleanAdmin, message: 'Admin Login Successfully', token })
  }

  return res.status(400).json({ message: 'Invalid Credentials' })
}

async function httpAdminForgetPassword(req, res) {
  const { email } = req.body

  try {
    const adminObject = await getAdminByEmail(email)

    if (!adminObject) {
      return res.status(400).json({ message: 'Please enter a valid email address' })
    }

    const secret = JWT_SECRET + adminObject.admin_password

    const token = jwt.sign({ email: adminObject.admin_email, id: adminObject.admin_id }, secret, { expiresIn: '15m' })

    const link = `http://localhost:5173/admin/reset-password/${adminObject.admin_id}/${token}`

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
      subject: 'Admin Reset Password Request',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="x-apple-disable-message-reformatting" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta name="color-scheme" content="light dark" />
                <meta name="supported-color-schemes" content="light dark" />
                <title></title>
                <style type="text/css" rel="stylesheet" media="all">
                /* Base ------------------------------ */
                
                @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
                body {
                  width: 100% !important;
                  height: 100%;
                  margin: 0;
                  -webkit-text-size-adjust: none;
                }
                
                a {
                  color: #3869D4;
                }
                
                a img {
                  border: none;
                }
                
                td {
                  word-break: break-word;
                }
                
                .preheader {
                  display: none !important;
                  visibility: hidden;
                  mso-hide: all;
                  font-size: 1px;
                  line-height: 1px;
                  max-height: 0;
                  max-width: 0;
                  opacity: 0;
                  overflow: hidden;
                }
                /* Type ------------------------------ */
                
                body,
                td,
                th {
                  font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
                }
                
                h1 {
                  margin-top: 0;
                  color: #333333;
                  font-size: 22px;
                  font-weight: bold;
                  text-align: left;
                }
                
                h2 {
                  margin-top: 0;
                  color: #333333;
                  font-size: 16px;
                  font-weight: bold;
                  text-align: left;
                }
                
                h3 {
                  margin-top: 0;
                  color: #333333;
                  font-size: 14px;
                  font-weight: bold;
                  text-align: left;
                }
                
                td,
                th {
                  font-size: 16px;
                }
                
                p,
                ul,
                ol,
                blockquote {
                  margin: .4em 0 1.1875em;
                  font-size: 16px;
                  line-height: 1.625;
                }
                
                p.sub {
                  font-size: 13px;
                }
                /* Utilities ------------------------------ */
                
                .align-right {
                  text-align: right;
                }
                
                .align-left {
                  text-align: left;
                }
                
                .align-center {
                  text-align: center;
                }
                
                .u-margin-bottom-none {
                  margin-bottom: 0;
                }
                /* Buttons ------------------------------ */
                
                .button {
                  background-color: #3869D4;
                  border-top: 10px solid #3869D4;
                  border-right: 18px solid #3869D4;
                  border-bottom: 10px solid #3869D4;
                  border-left: 18px solid #3869D4;
                  display: inline-block;
                  color: #FFF;
                  text-decoration: none;
                  border-radius: 3px;
                  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
                  -webkit-text-size-adjust: none;
                  box-sizing: border-box;
                }
                
                .button--green {
                  background-color: #22BC66;
                  border-top: 10px solid #22BC66;
                  border-right: 18px solid #22BC66;
                  border-bottom: 10px solid #22BC66;
                  border-left: 18px solid #22BC66;
                }
                
                .button--red {
                  background-color: #FF6136;
                  border-top: 10px solid #FF6136;
                  border-right: 18px solid #FF6136;
                  border-bottom: 10px solid #FF6136;
                  border-left: 18px solid #FF6136;
                }
                
                @media only screen and (max-width: 500px) {
                  .button {
                    width: 100% !important;
                    text-align: center !important;
                  }
                }
                /* Attribute list ------------------------------ */
                
                .attributes {
                  margin: 0 0 21px;
                }
                
                .attributes_content {
                  background-color: #F4F4F7;
                  padding: 16px;
                }
                
                .attributes_item {
                  padding: 0;
                }
                /* Related Items ------------------------------ */
                
                .related {
                  width: 100%;
                  margin: 0;
                  padding: 25px 0 0 0;
                  -premailer-width: 100%;
                  -premailer-cellpadding: 0;
                  -premailer-cellspacing: 0;
                }
                
                .related_item {
                  padding: 10px 0;
                  color: #CBCCCF;
                  font-size: 15px;
                  line-height: 18px;
                }
                
                .related_item-title {
                  display: block;
                  margin: .5em 0 0;
                }
                
                .related_item-thumb {
                  display: block;
                  padding-bottom: 10px;
                }
                
                .related_heading {
                  border-top: 1px solid #CBCCCF;
                  text-align: center;
                  padding: 25px 0 10px;
                }
                /* Discount Code ------------------------------ */
                
                .discount {
                  width: 100%;
                  margin: 0;
                  padding: 24px;
                  -premailer-width: 100%;
                  -premailer-cellpadding: 0;
                  -premailer-cellspacing: 0;
                  background-color: #F4F4F7;
                  border: 2px dashed #CBCCCF;
                }
                
                .discount_heading {
                  text-align: center;
                }
                
                .discount_body {
                  text-align: center;
                  font-size: 15px;
                }
                /* Social Icons ------------------------------ */
                
                .social {
                  width: auto;
                }
                
                .social td {
                  padding: 0;
                  width: auto;
                }
                
                .social_icon {
                  height: 20px;
                  margin: 0 8px 10px 8px;
                  padding: 0;
                }
                /* Data table ------------------------------ */
                
                .purchase {
                  width: 100%;
                  margin: 0;
                  padding: 35px 0;
                  -premailer-width: 100%;
                  -premailer-cellpadding: 0;
                  -premailer-cellspacing: 0;
                }
                
                .purchase_content {
                  width: 100%;
                  margin: 0;
                  padding: 25px 0 0 0;
                  -premailer-width: 100%;
                  -premailer-cellpadding: 0;
                  -premailer-cellspacing: 0;
                }
                
                .purchase_item {
                  padding: 10px 0;
                  color: #51545E;
                  font-size: 15px;
                  line-height: 18px;
                }
                
                .purchase_heading {
                  padding-bottom: 8px;
                  border-bottom: 1px solid #EAEAEC;
                }
                
                .purchase_heading p {
                  margin: 0;
                  color: #85878E;
                  font-size: 12px;
                }
                
                .purchase_footer {
                  padding-top: 15px;
                  border-top: 1px solid #EAEAEC;
                }
                
                .purchase_total {
                  margin: 0;
                  text-align: right;
                  font-weight: bold;
                  color: #333333;
                }
                
                .purchase_total--label {
                  padding: 0 15px 0 0;
                }
                
                body {
                  background-color: #F2F4F6;
                  color: #51545E;
                }
                
                p {
                  color: #51545E;
                }
                
                .email-wrapper {
                  width: 100%;
                  margin: 0;
                  padding: 0;
                  -premailer-width: 100%;
                  -premailer-cellpadding: 0;
                  -premailer-cellspacing: 0;
                  background-color: #F2F4F6;
                }
                
                .email-content {
                  width: 100%;
                  margin: 0;
                  padding: 0;
                  -premailer-width: 100%;
                  -premailer-cellpadding: 0;
                  -premailer-cellspacing: 0;
                }
                /* Masthead ----------------------- */
                
                .email-masthead {
                  padding: 25px 0;
                  text-align: center;
                }
                
                .email-masthead_logo {
                  width: 94px;
                }
                
                .email-masthead_name {
                  font-size: 16px;
                  font-weight: bold;
                  color: #A8AAAF;
                  text-decoration: none;
                  text-shadow: 0 1px 0 white;
                }
                /* Body ------------------------------ */
                
                .email-body {
                  width: 100%;
                  margin: 0;
                  padding: 0;
                  -premailer-width: 100%;
                  -premailer-cellpadding: 0;
                  -premailer-cellspacing: 0;
                }
                
                .email-body_inner {
                  width: 570px;
                  margin: 0 auto;
                  padding: 0;
                  -premailer-width: 570px;
                  -premailer-cellpadding: 0;
                  -premailer-cellspacing: 0;
                  background-color: #FFFFFF;
                }
                
                .email-footer {
                  width: 570px;
                  margin: 0 auto;
                  padding: 0;
                  -premailer-width: 570px;
                  -premailer-cellpadding: 0;
                  -premailer-cellspacing: 0;
                  text-align: center;
                }
                
                .email-footer p {
                  color: #A8AAAF;
                }
                
                .body-action {
                  width: 100%;
                  margin: 30px auto;
                  padding: 0;
                  -premailer-width: 100%;
                  -premailer-cellpadding: 0;
                  -premailer-cellspacing: 0;
                  text-align: center;
                }
                
                .body-sub {
                  margin-top: 25px;
                  padding-top: 25px;
                  border-top: 1px solid #EAEAEC;
                }
                
                .content-cell {
                  padding: 45px;
                }
                /*Media Queries ------------------------------ */
                
                @media only screen and (max-width: 600px) {
                  .email-body_inner,
                  .email-footer {
                    width: 100% !important;
                  }
                }
                
                @media (prefers-color-scheme: dark) {
                  body,
                  .email-body,
                  .email-body_inner,
                  .email-content,
                  .email-wrapper,
                  .email-masthead,
                  .email-footer {
                    background-color: #333333 !important;
                    color: #FFF !important;
                  }
                  p,
                  ul,
                  ol,
                  blockquote,
                  h1,
                  h2,
                  h3,
                  span,
                  .purchase_item {
                    color: #FFF !important;
                  }
                  .attributes_content,
                  .discount {
                    background-color: #222 !important;
                  }
                  .email-masthead_name {
                    text-shadow: none !important;
                  }
                }
                
                :root {
                  color-scheme: light dark;
                  supported-color-schemes: light dark;
                }
                </style>
                <style type="text/css">
                  .f-fallback  {
                    font-family: Arial, sans-serif;
                  }
                </style>
              </head>
              <body>
                <span class="preheader">Use this link to reset your password. The link is only valid for 15 minutes.</span>
                <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td align="center">
                      <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td class="email-masthead">
                            <a href="http://localhost:5173/" class="f-fallback email-masthead_name" style="font-size:2rem; color: #f97316">
                            Resolve
                          </a>
                          </td>
                        </tr>
                        <!-- Email Body -->
                        <tr>
                          <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                            <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                              <!-- Body content -->
                              <tr>
                                <td class="content-cell">
                                  <div class="f-fallback">
                                    <h1>Hi ${adminObject.admin_name},</h1>
                                    <p>You recently requested to reset your password for your <span style="color: #f97316;">Resolve Admin</span> account. Use the button below to reset it. <strong>This password reset is only valid for the next 24 hours.</strong></p>
                                    <!-- Action -->
                                    <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                      <tr>
                                        <td align="center">
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                            <tr>
                                              <td align="center">
                                                <a href=${link} class="f-fallback button button--green" target="_blank" style="color: #fafafa;">Reset your password</a>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                    <p>If you did not request a password reset, please ignore this email or <a href="http://localhost:5173/contact">contact support</a> if you have questions.</p>
                                    <p>Thanks,
                                      <br>The  team</p>
                                    <!-- Sub copy -->
                                    <table class="body-sub" role="presentation">
                                      <tr>
                                        <td>
                                          <p class="f-fallback sub">If you’re having trouble with the button above, copy and paste the URL below into your web browser.</p>
                                          <p class="f-fallback sub">${link}</p>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                <td class="content-cell" align="center">
                                  <p class="f-fallback sub align-center">
                                    Resolve
                                    <br>Persiaran Multimedia 63100 
                                    <br>Cyberjaya Selangor
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
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
  }
  catch (error) {
    return res.status(400).json({ message: 'There\'s an error while sending the link to your email' })
  }
}

async function httpAdminResetPassword(req, res) {
  const { adminId, token } = req.params
  const { password } = req.body
  console.log(req.params)
  const adminObject = await getAdminById(adminId)

  if (!adminObject) {
    return res.status(400).json({ message: 'User Not Found' })
  }

  const secret = JWT_SECRET + adminObject.admin_password

  try {
    const verify = jwt.verify(token, secret)
    console.log('Verified')

    const result = await adminResetPassword(adminId, password)

    return res.status(200).json({ message: 'Password Updated Successfully' })
  }
  catch (error) {
    console.log('Not Verified')

    return res.status(400).json({ message: 'Link is not verified' })
  }
}

async function httpGetDashboardData(req, res) {
  try {
    const { allReport, allUser } = await getDashboardData()

    return res.status(200).json({ allReport, allUser })
  }
  catch (error) {
    return res.status(404).json({ message: 'Opps... Something wrong while fetching data' })
  }
}

async function httpGetUserFromReport(req, res) {

  try {
    const { userId } = req.body

    const userObject = await getUserFromReport(userId)

    return res.status(200).json({ userObject, message: 'Successfully getting user' })
  }
  catch (error) {
    return res.status(400).json({ message: 'Error getting user' })
  }

}

async function httpGetAllReview(req, res) {
  try {
    const allReview = await getAllReview()

    return res.status(200).json({ allReview, message: 'Review Fetched Successfully' })
  }
  catch (err) {
    return res.status(400).json({ message: 'Unable to fetch review' })
  }
}

async function httpAcceptNewReport(req, res) {
  try {
    const { reportId } = req.body

    const result = await acceptNewReport(reportId)

    return res.status(200).json({ result, message: `Report ID: ${reportId} Has Been Accepted` })

  }
  catch (error) {
    return res.status(400).json({ message: 'Failed to accept report' })
  }

}

async function httpRejectNewReport(req, res) {
  try {
    const { reportId } = req.body

    const result = await rejectNewReport(reportId)

    return res.status(200).json({ result, message: `Report ID: ${reportId} Has Been Rejected` })

  }
  catch (error) {
    return res.status(400).json({ message: 'Failed to reject report' })
  }
}

async function httpChangePassword(req, res) {
  const { adminId, oldPassword, newPassword } = req.body

  try {
    const result = await changePassword(adminId, oldPassword, newPassword)

    return res.status(200).json({ message: 'Password Changed Successfully' })
  }
  catch (error) {
    return res.status(400).json({ error, message: 'Unable To Change Password' })
  }

}

async function httpSetCompletedImage(req, res) {
  const { reportId } = req.params
  const { imageUrl } = req.body

  try {
    const result = await setCompletedImage(reportId, imageUrl)

    return res.status(200).json({ message: 'Image Stored Succussfully' })

  }
  catch (error) {
    return res.status(400).json({ error, message: 'Unable to store url to database' })
  }

}

async function httpCreateNewCategory(req, res) {
  const { category_name, category_image } = req.body

  try {
    const result = await createNewCategory(category_name, category_image)

    return res.status(200).json({ message: 'Category created successfully' })
  }
  catch (error) {
    return res.status(400).json({ message: 'Failed to create category' })
  }
}

async function httpGetAllCategory(req, res) {

  try {
    const categoryData = await getAllCategory()

    return res.status(200).json({ categoryData, message: 'Get all category data successfully' })
  }
  catch (error) {
    return res.status(400).json({ message: 'Unable to get all menu data' })
  }
}

async function httpLogOutAdmin(req, res) {
  return res.status(200).json({ message: 'Logout successful' })
}

async function httpGetAdminProfile(req, res) {
  return res.status(200).json({ adminObject: req.admin })
}

async function httpGetAllAdmin(req, res) {
  try {
    const allAdmin = await getAllAdmin()

    return res.status(200).json({ allAdmin })
  } catch (error) {
    return res.status(400).json({ message: 'Failed to get all admin' })
  }
}

async function httpGetAllContact(req, res) {
  try {
    const result = await getAllContact()

    return res.status(200).json({ message: 'Get All Contact Successfully', data: result })
  } catch (error) {
    console.log(error)
  }
}

async function httpDeleteContact(req, res) {

  const { contactId } = req.body

  try {
    const result = await deleteContact(contactId)

    return res.status(200).json({ message: 'Successfully deleted contact record' })
  } catch (error) {
    console.log(error)
  }
}

async function httpDeleteCategory(req, res) {
  const { categoryId } = req.body

  try {
    const categoryData = await deleteCategory(categoryId)

    return res.status(200).json({ categoryData, message: 'Menu deleted successfully' })

  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  httpCreateAdmin,
  httpAdminLogin,
  httpAdminForgetPassword,
  httpAdminResetPassword,
  httpGetDashboardData,
  httpGetUserFromReport,
  httpGetAllReview,
  httpAcceptNewReport,
  httpRejectNewReport,
  httpChangePassword,
  httpSetCompletedImage,
  httpCreateNewCategory,
  httpGetAllCategory,
  httpLogOutAdmin,
  httpGetAdminProfile,
  httpGetAllAdmin,
  httpGetAllContact,
  httpDeleteContact,
  httpDeleteCategory
}