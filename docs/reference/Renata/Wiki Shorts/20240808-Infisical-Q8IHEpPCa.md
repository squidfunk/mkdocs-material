# Infisical

### Infiscal is the open source secret management platform that developers use to centralize their application configuration and secrets like API keys and database credentials as well as manage their internal PKI. Additionally, developers use Infisical to prevent secrets leaks to git and securely share secrets amongst engineers 

## Why Infisical?

Infisical helps developers achieve secure centralized secret management and provides all the tools to easily manage secrets in various environments and infrastructure components. In particular, here are some of the most common points that developers mention after adopting Infisical:

- Streamlined **local development** processes (switching .env files to [Infisical CLI](https://infisical.com/docs/cli/commands/run) and removing secrets from developer machines).
- **Best-in-class developer experience** with an easy-to-use [Web Dashboard](https://infisical.com/docs/documentation/platform/project).
- Simple secret management inside **[CI/CD pipelines](https://infisical.com/docs/integrations/cicd/githubactions)** and staging environments.
- Secure and compliant secret management practices in **[production environments](https://infisical.com/docs/sdks/overview)**.
- **Facilitated workflows** around [secret change management](https://infisical.com/docs/documentation/platform/pr-workflows), [access requests](https://infisical.com/docs/documentation/platform/access-controls/access-requests), [temporary access provisioning](https://infisical.com/docs/documentation/platform/access-controls/temporary-access), and more.
- **Improved security posture** thanks to [secret scanning](https://infisical.com/docs/cli/scanning-overview), [granular access control policies](https://infisical.com/docs/documentation/platform/access-controls/overview), [automated secret rotation](https://infisical.com/docs/documentation/platform/secret-rotation/overview), and [dynamic secrets](https://infisical.com/docs/documentation/platform/dynamic-secrets/overview) capabilities.

## [​](https://infisical.com/docs/documentation/getting-started/introduction#how-does-infisical-work)How does Infisical work?

To make secret management effortless and secure, Infisical follows a certain structure for enabling secret management workflows as defined below.

**Identities** in Infisical are users or machine which have a certain set of roles and permissions assigned to them. Such identities are able to manage secrets in various **Clients** throughout the entire infrastructure. To do that, identities have to verify themselves through one of the available **Authentication Methods**.

As a result, the 3 main concepts that are important to understand are:

- **[Identities](https://infisical.com/docs/documentation/platform/identities/overview)**: users or machines with a set permissions assigned to them.
- **[Clients](https://infisical.com/docs/integrations/platforms/kubernetes)**: Infisical-developed tools for managing secrets in various infrastructure components (e.g., [Kubernetes Operator](https://infisical.com/docs/integrations/platforms/kubernetes), [Infisical Agent](https://infisical.com/docs/integrations/platforms/infisical-agent), [CLI](https://infisical.com/docs/cli/usage), [SDKs](https://infisical.com/docs/sdks/overview), [API](https://infisical.com/docs/api-reference/overview/introduction), [Web Dashboard](https://infisical.com/docs/documentation/platform/organization)).
- **[Authentication Methods](https://infisical.com/docs/documentation/platform/identities/universal-auth)**: ways for Identities to authenticate inside different clients (e.g., SAML SSO for Web Dashboard, Universal Auth for Infisical Agent, AWS Auth etc.).

Self-hosting Infisical lets you retain data on your own infrastructure and network. Choose from a number of deployment options listed below to get started.

## [Docker](https://infisical.com/docs/documentation/getting-started/deployment-options/standalone-infisical)

[Use the fully packaged docker image to deploy Infisical anywhere.](https://infisical.com/docs/documentation/getting-started/deployment-options/standalone-infisical)

## [Docker Compose](https://infisical.com/docs/documentation/getting-started/deployment-options/docker-compose)

[Install Infisical using our Docker Compose template.](https://infisical.com/docs/documentation/getting-started/deployment-options/docker-compose)

## [Kubernetes](https://infisical.com/docs/documentation/getting-started/deployment-options/kubernetes-helm)

[Use our Helm chart to Install Infisical on your Kubernetes cluster.](https://infisical.com/docs/documentation/getting-started/deployment-options/kubernetes-helm)

