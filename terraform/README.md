# Vubber Web Application Infrastructure

This Terraform configuration manages the AWS Amplify infrastructure for the Vubber web application. It sets up continuous deployment from GitHub, configures custom domains, and handles routing rules.

## Prerequisites

- AWS CLI configured with appropriate credentials
- Terraform installed
- GitHub access token with repository access
- AWS profile named "use the frontend profile with required IAM access"

## Configuration

### Required Variables

- `github_access_token`: GitHub access token for AWS Amplify to access the webapp repository (Add it to the terminal by exporting TFVARS)
- `domain_name`: Domain name for the webapp (defaults to "vubber.app")
- `repository_url`: GitHub repository URL (defaults to "https://github.com/MotateLLC/vubber-web")
- `basic_auth_username`: Username for basic authentication on dev environment
- `basic_auth_password`: Password for basic authentication on dev environment


## Infrastructure Components

### AWS Amplify App
- Name: vubber-web
- Framework: Next.js
- Auto-deletion of branches enabled
- Custom build specification for Next.js application

### Branch Configuration
- Production branch: `demo`
  - Stage: PRODUCTION
  - Auto-build enabled
  - Pull request preview enabled

- Development branch: `main`
  - Stage: DEVELOPMENT
  - Auto-build enabled
  - Pull request preview enabled
  - Basic authentication enabled
  - Access restricted with username/password

### Domain Configuration
- Main domain: vubber.app
- Subdomain: www.vubber.app and dev.vubber.app (password protected)
- Custom rules:
  - Redirect from apex domain to www subdomain
  - SPA routing rule to handle client-side routing

## Usage

1. Initialize Terraform:
```bash
terraform init
```

2. Export required environment variables:
```bash
export TF_VAR_github_access_token="your-github-personal-access-token"
export TF_VAR_basic_auth_username="your-dev-username"
export TF_VAR_basic_auth_password="your-dev-password"
```

Alternatively, create a `terraform.tfvars` file (recommended, should be git-ignored):
```hcl
github_access_token = "your-github-personal-access-token"
frontend_profile="frontend-aws-profile"
basic_auth_username = "your-dev-username"
basic_auth_password = "your-dev-password"
```

3. Apply the configuration:
```bash
terraform apply
```

## Notes

1. **Initial Setup**
   - Initially we have to manually do the build for the repository in Amplify
   - Obtain DNS Records from Amplify and add it to CloudFlare
        | Type  | Name | Target |
        |-------|------|--------|
        | CNAME | _das...  | example-validations.aws |
        | CNAME | www  | example.cloudfront.net |
        | CNAME | dev  | example.cloudfront.net |
   - DON'T PROXY THE DNS RECORDS
   - It takes around 15 minutes for verification

1. **Build Configuration**
   - Uses Yarn for package management
   - Builds from the `dist` directory
   - Caches node_modules for faster builds
2. **Security**
   - GitHub token is marked as sensitive
   - Uses AWS profile for authentication

## Challenges and Solutions

1. **SPA Routing**
   - Challenge: Next.js applications need proper handling of client-side routes
   - Solution: Implemented custom rule to redirect all non-static paths to index.html

2. **Domain Configuration**
   - Challenge: Need to handle both apex domain and www subdomain
   - Solution: Set up 302 redirect from apex to www subdomain

3. **Environment Management**
   - Challenge: Managing different environments (dev/prod)
   - Solution: Currently using branch-based deployment with main branch for production
   - Note: Development environment configuration is commented out but available for future use

4. **Caching**
   - Challenge: subdomain not working
   - Solution: Have to clear all the old states and all the DNS records in cloudflare
   - Note: It takes 15 minutes to 1 hour to get reflected(wait patiently)

5. **Deploying**
   - Challenge: Initial deployment of application
   - Solution: We must initially deploy the branch manually, set the redirect url manually as required
   - Note: Add the CNAME records properly in cloudflare for both www and dev