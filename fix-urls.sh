#!/bin/bash
# fix-urls.sh - Script to fix all hardcoded URLs in the frontend

echo "🔧 Fixing hardcoded URLs in frontend files..."

# Files that need URL fixes
declare -a files=(
    "src/pages/RequestDetails.jsx"
    "src/pages/Rides.jsx" 
    "src/pages/RideDetails.jsx"
    "src/pages/Profile.jsx"
    "src/pages/LiveTracking.jsx"
    "src/pages/GoodsDeliveries.jsx"
    "src/pages/EditRide.jsx"
)

# Change to frontend directory
cd hopealong-frontend

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Fixing URLs in $file..."
        
        # Add API import if not present
        if ! grep -q "API_BASE_URL" "$file"; then
            # Add import after existing imports
            sed -i '1i import { API_BASE_URL } from "../config/api.js";' "$file"
        fi
        
        # Replace hardcoded URLs
        sed -i 's|http://localhost:5000|\${API_BASE_URL}|g' "$file"
        sed -i 's|"http://localhost:5000|`${API_BASE_URL}|g' "$file"
        sed -i 's|http://localhost:5000"|${API_BASE_URL}`|g' "$file"
        
        echo "✅ Fixed $file"
    else
        echo "❌ File not found: $file"
    fi
done

echo "🎉 All URL fixes completed!"
