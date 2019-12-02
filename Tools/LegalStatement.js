class LegalStatement{
    PrivacyPolicy='Last updated: 27/11/2019 Coding101 ("us", "we", or "our") operates Coding101-LTE. This app informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the app. We use your Personal Information only for providing and improving the company services. By clicking the submit, you agree to the collection and use of information in accordance with this policy. Information Collection And Use While using our app, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name, Email address, Phone number, Job title, Company name. Security The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security. Changes To This Privacy Policy This Privacy Policy is effective as of 27/11/2019 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page. We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy. If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website. Contact Us If you have any questions about this Privacy Policy, please contact us.'

    getPrivacyPolicy(){
        return this.PrivacyPolicy
    }
}
const LegalStatementSvc=new LegalStatement()
export default LegalStatementSvc