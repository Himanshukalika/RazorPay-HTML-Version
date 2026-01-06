#!/bin/bash

# Create Razorpay Quarterly Plan (5 Years) via API

curl -X POST https://api.razorpay.com/v1/plans \
  -u rzp_live_Rx0dB1g3YMVHI0:917FiE8XMWwrcpG7kzChKObR \
  -H "Content-Type: application/json" \
  -d '{
    "period": "monthly",
    "interval": 3,
    "item": {
      "name": "HSM Makeup Mastery Club Quarterly (5 Years)",
      "description": "Quarterly recurring subscription for 5 years",
      "amount": 279900,
      "currency": "INR"
    },
    "notes": {
      "plan_type": "quarterly",
      "duration": "5 years"
    }
  }'
