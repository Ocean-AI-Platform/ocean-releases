#!/bin/bash

# Ocean Documentation Deployment Script
# Targets: https://docs.getocean.dev

echo "------------------------------------------------"
echo "🚀 Starting deployment to Ocean Documentation..."
echo "------------------------------------------------"

# Check for Firebase CLI
if ! command -v firebase &> /dev/null
then
    echo "❌ Error: Firebase CLI not found."
    echo "Please install it using: npm install -g firebase-tools"
    exit 1
fi

# Ensure we are in the right project/target
# Based on .firebaserc targets
echo "📦 Preparing files..."

# Deploy to the specific hosting target
firebase deploy --only hosting:docs

if [ $? -eq 0 ]; then
    echo ""
    echo "✨ SUCCESS! Documentation is live at:"
    echo "🔗 https://docs.getocean.dev"
    echo "------------------------------------------------"
else
    echo ""
    echo "❌ Deployment failed. Please check the logs above."
    echo "------------------------------------------------"
    exit 1
fi
