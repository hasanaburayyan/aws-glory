#!/usr/bin/env bash

TAG="latest"
IMAGE_NAME="my-angular-env"
ECR_IMAGE_NAME="496834626558.dkr.ecr.us-east-1.amazonaws.com/${IMAGE_NAME}"

# Login To ECR Repo
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 496834626558.dkr.ecr.us-east-1.amazonaws.com

# Tag Image For ECR
docker tag $IMAGE_NAME:$TAG $ECR_IMAGE_NAME:$TAG

# Push Image To ECR
docker push $ECR_IMAGE_NAME:$TAG

