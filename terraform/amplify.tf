provider "aws" {
  region  = "us-west-1"
  profile = var.frontend_profile
}

# TODO: Add the frontend profile to the terminal by exporting TF_VAR_frontend_profile
variable "frontend_profile" {
  description = "Frontend profile for AWS Amplify"
  type        = string
  sensitive   = true
}

# TODO: Add the github access token to the terminal by exporting TF_VAR_github_access_token
variable "github_access_token" {
  description = "GitHub access token for AWS Amplify to access the webapp repository"
  type        = string
  sensitive   = true
}

variable "domain_name" {
  description = "Domain name for the webapp"
  type        = string
  default     = "vubber.app"
}

variable "repository_url" {
  description = "GitHub repository URL for the web application"
  type        = string
  default     = "https://github.com/MotateLLC/vubber-web"
}

# Variables for basic auth credentials
variable "basic_auth_username" {
  description = "Username for basic authentication"
  type        = string
  sensitive   = true
}

variable "basic_auth_password" {
  description = "Password for basic authentication"
  type        = string
  sensitive   = true
}

resource "aws_amplify_app" "vubber-web" {
  name       = "vubber-web"
  repository = var.repository_url

  access_token = var.github_access_token

  enable_branch_auto_deletion = true

  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - yarn install --frozen-lockfile
        build:
          commands:
            - yarn run build
      artifacts:
        baseDirectory: dist
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT

  custom_rule {
    source = format("https://%s", var.domain_name)
    status = "302"
    target = format("https://www.%s", var.domain_name)
  }

  # Add rule to handle direct access to paths on root domain
  custom_rule {
    source = format("https://%s/<*>", var.domain_name)
    status = "302"
    target = format("https://www.%s/<*>", var.domain_name)
  }

  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/index.html"
  }
}

# Production branch configuration
resource "aws_amplify_branch" "production" {
  app_id      = aws_amplify_app.vubber-web.id
  # Branch name for production branch
  branch_name = "demo"

  framework = "Next"
  stage     = "PRODUCTION"

  enable_auto_build           = true
  enable_pull_request_preview = true

  

}

# main branch configuration
resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.vubber-web.id
  # Branch name for main branch
  branch_name = "main"

  framework = "Next"
  stage     = "DEVELOPMENT"

  enable_basic_auth      = true
  basic_auth_credentials = base64encode("${var.basic_auth_username}:${var.basic_auth_password}")
  
  enable_auto_build           = true
  enable_pull_request_preview = true
}


# Domain associations for both production and development
resource "aws_amplify_domain_association" "vubber" {
  app_id      = aws_amplify_app.vubber-web.id
  domain_name = var.domain_name

  # Root domain configuration
  sub_domain {
    branch_name = aws_amplify_branch.production.branch_name
    prefix      = ""
  }

  # Production gets the www subdomain
  sub_domain {
    branch_name = aws_amplify_branch.production.branch_name
    prefix      = "www"
  }

  # Development environment gets the dev subdomain
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "dev"
  }
}
