#!/bin/bash

# Delete old plan and create new one with total_count support

# Create new Quarterly Plan with proper settings
curl -X POST https://api.razorpay.com/v1/plans \
  -u rzp_live_Rx0dB1g3YMVHI0:917FiE8XMWwrcpG7kzChKObR \
  -H "Content-Type: application/json" \
  -d '{
    "period": "monthly",
    "interval": 3,
    "item": {
      "name": "HSM Makeup Mastery Club Quarterly (5 Years)",
      "description": "Quarterly recurring subscription - 20 billing cycles",
      "amount": 279900,
      "currency": "INR"
    },
    "notes": {
      "plan_type": "quarterly",
      "duration": "5 years",
      "total_cycles": "20"
    }
  }'

echo ""
echo "New plan created! Copy the plan ID and update config.js"
