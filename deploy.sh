#!/bin/bash
set -e

BUCKET_NAME="s3://gitwig.dev"

echo "Building the project..."
npm run build

echo "Deploying to S3 bucket: $BUCKET_NAME"
aws s3 sync dist/ $BUCKET_NAME --delete

echo "Deployment complete!"
