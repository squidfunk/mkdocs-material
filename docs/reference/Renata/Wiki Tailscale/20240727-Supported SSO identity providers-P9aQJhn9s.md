# Supported SSO identity providers

 works on top of the identity provider (IdP) or single sign-on (SSO) provider that you already use.

## [Set up an identity provider](https://tailscale.com/kb/1017/install#set-up-an-identity-provider)

When you activate your domain name with Tailscale for the first time, you must choose which identity provider you want to use.

You need to be an [Owner](https://tailscale.com/kb/1138/user-roles) of a tailnet in order to set up an identity provider.

### [Supported native identity providers](https://tailscale.com/kb/1017/install#supported-native-identity-providers)

Tailscale natively supports the following identity providers:

- [Apple](https://tailscale.com/kb/1283/sso-apple)
- [Google](https://tailscale.com/kb/1199/sso-google), including Gmail and Google Workspace (G Suite)
- [GitHub](https://tailscale.com/kb/1284/sso-github)
- [Microsoft](https://tailscale.com/kb/1285/sso-microsoft), including Microsoft Accounts, Office365, Active Directory, and Microsoft Entra ID
- [Okta](https://tailscale.com/kb/1066/sso-okta)
- [OneLogin](https://tailscale.com/kb/1070/sso-onelogin)

### [Supported custom identity providers](https://tailscale.com/kb/1017/install#supported-custom-identity-providers)

In addition to the natively supported identity providers, Tailscale also lets you authenticate with [custom OpenID Connect (OIDC) providers](https://tailscale.com/kb/1240/sso-custom-oidc). For the list of custom identity providers that Tailscale has successfully tested, see [Additional provider configurations](https://tailscale.com/kb/1240/sso-custom-oidc#additional-provider-configurations).

### [Support for passkeys](https://tailscale.com/kb/1017/install#support-for-passkeys)

Tailscale supports the use of [passkey](https://tailscale.com/kb/1269/passkeys) authentication for any tailnet that you are authorized to join.

### [Signing up with an email address](https://tailscale.com/kb/1017/install#signing-up-with-an-email-address)

Tailscale does not support sign-up with email addresses. By design, Tailscale is not an identity provider—there are no Tailscale passwords.

Identity providers build robust infrastructure to handle identity and authentication, which are core and complex aspects of security. Tailscale delegates user authentication to identity providers because of their expertise, which allows Tailscale to focus on areas like secure networking.

Using an identity provider is not only more secure than email and password, but it allows us to automatically [rotate connection encryption keys](https://tailscale.com/blog/rotate-ssh-keys), [follow security policies](https://tailscale.com/kb/1018/acls)set by your team such as multifactor authentication (MFA), and more.

For more information about why Tailscale is not an identity provider, refer to the [Tailscale doesn't want your password](https://tailscale.com/blog/passkeys) and [SSO tax, cut](https://tailscale.com/blog/sso-tax-cut) blog posts.

### [Support for 2FA and MFA](https://tailscale.com/kb/1017/install#support-for-2fa-and-mfa)

Tailscale supports two-factor and multifactor authentication.

Tailscale does not handle authentication itself. Instead, you can [enable 2FA and MFA features](https://tailscale.com/kb/1075/multifactor-auth) in your single sign-on identity provider, and they will apply to all your apps, including Tailscale.

## [Changing identity providers](https://tailscale.com/kb/1017/install#changing-identity-providers)

You need to be an [Owner, Admin, or IT admin](https://tailscale.com/kb/1138/user-roles) of a tailnet in order to change the identity provider configuration.

## [What Tailscale accesses from identity providers](https://tailscale.com/kb/1017/install#what-tailscale-accesses-from-identity-providers)

Tailscale uses OpenID Connect (OIDC) for authentication.

Tailscale requests the minimum access needed to function. When authenticating to Tailscale, you must share information about users' emails and their name. Some providers also share a user photo; in this case, Tailscale stores the photo URL but not the photo itself.

Tailscale only uses your organization's team membership to ensure users can join the tailnet for their organization. With the GitHub identity provider, Tailscale requests the minimum set of permissions needed to get team membership, which includes access to your repositories and project boards. Tailscale does not use any content in your repositories or project boards.

Tailscale requests the minimum number scopes required to operate, and the information on how we use your data can be found in our [privacy policy](https://tailscale.com/privacy-policy).
