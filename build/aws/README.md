# Static Website Templates for AWS CloudFormation

## Static website with CDN
This template describes the infrastructure for hosting a static website over HTTPS behind a CDN.

![Architecture](./static-website.png?raw=true "Architecture")

### Installation Guide
1. <a href="https://console.aws.amazon.com/cloudformation/home#/stacks/new?stackName=ec2-auto-recovery&templateURL=https://s3-eu-west-1.amazonaws.com/widdix-aws-cf-templates/static-website/static-website.yaml">Launch Stack</a>
1. Click **Next** to proceed with the next step of the wizard.
1. Specify a name and all parameters for the stack.
1. Click **Next** to proceed with the next step of the wizard.
1. Click **Next** to skip the **Options** step of the wizard.
1. Check the **I acknowledge that this template might cause AWS CloudFormation to create IAM resources.** checkbox.
1. Click **Create** to start the creation of the stack.
1. Wait until the stack reaches the state **CREATE_COMPLETE**

## Support
We offer support for our CloudFormation templates: setting up environments based on our templates, adopting templates to specific use cases, resolving issues in production environments. [Hire us!](https://widdix.net/)

## Feedback
We are looking forward to your feedback. Mail to [hello@widdix.de](mailto:hello@widdix.de).

## About
A [cloudonaut.io](https://cloudonaut.io/templates-for-aws-cloudformation/) project. Engineered by [widdix](https://widdix.net).
