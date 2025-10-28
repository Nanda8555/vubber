terraform {
  backend "s3" {
    bucket         = "vubber-web-terraform-artifacts-v2"
    key            = "terraform.tfstate"
    region         = "us-west-1"
    encrypt        = true
  }
}
