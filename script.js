// Main Application JavaScript

// State Management
let state = {
    selectedPlan: 'quarterly',
    isSubscription: true,
    isProcessing: false,
    formData: {
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        country: 'IN',
        state: ''
    }
};

// Plan Configurations
const plans = {
    monthly: {
        id: 'monthly',
        name: 'Monthly Membership',
        price: 999,
        duration: '1 Month',
        totalMonths: 60,
        savings: null,
        popular: false,
        description: 'Try it out',
        warning: null,
        subtitle: 'Suitable for dabblers',
        trustBadge: null,
        razorpayPlanId: CONFIG.RAZORPAY_PLAN_ID_MONTHLY,
        bonus: null,
    },
    quarterly: {
        id: 'quarterly',
        name: 'Growth Plan – Best for Results',
        price: 2799,
        duration: '90 Days',
        totalMonths: 20,
        savings: '7% monthly = 21% savings quarterly',
        popular: true,
        description: 'Serious Artist Plan',
        subtitle: 'Minimum time needed to see real skill + income improvement',
        trustBadge: 'Chosen by 67% of active members',
        warning: null,
        razorpayPlanId: CONFIG.RAZORPAY_PLAN_ID_QUARTERLY,
        bonus: {
            title: 'Quarterly Only Bonuses',
            items: [
                'Client Pricing Template',
                'Bridal Booking Script',
                'Instagram Reel Hooks for Makeup Artists',
                'Live Q&A Replay Access',
                'Content Calendar',
                'AI for Editing Course'
            ]
        },
    },
    halfYearly: {
        id: 'halfYearly',
        name: 'Professional Track',
        price: 5499,
        duration: '6 Months',
        totalMonths: 10,
        savings: '8% monthly = 48% savings half-yearly',
        popular: false,
        description: 'Deep skill mastery',
        subtitle: 'For building a sustainable makeup career',
        warning: null,
        trustBadge: null,
        razorpayPlanId: CONFIG.RAZORPAY_PLAN_ID_HALFYEARLY,
        bonus: {
            title: 'Everything in Growth Plan +',
            items: [
                '1-on-1 Onboarding Call',
                'Secret Bonus'
            ]
        },
    },
    yearly: {
        id: 'yearly',
        name: 'Career Accelerator',
        price: 9999,
        duration: '12 Months',
        totalMonths: 5,
        savings: 'You save ₹2,001 per year',
        popular: false,
        description: 'Complete MUA Transformation',
        subtitle: 'Complete professional development journey',
        warning: null,
        trustBadge: null,
        razorpayPlanId: CONFIG.RAZORPAY_PLAN_ID_YEARLY,
        bonus: {
            title: 'Everything in Growth Plan +',
            items: [
                '1-on-1 Onboarding Call',
                'Secret Bonus'
            ]
        },
    },
};

// Testimonials Data
const testimonials = [
    {
        name: 'Rekha – 15+ Years Experience (Mumbai)',
        avatar: '/images/founders.jpg',
        text: '"I\'ve been in the industry for over 15 years, but the business lessons gave me a fresh perspective on pricing and client handling."',
        color: 'pink'
    },
    {
        name: 'Anjali – Beginner Makeup Artist (Jaipur)',
        avatar: '/images/achievement-2.png',
        text: '"I was new to makeup and thought I\'d need multiple courses. This one membership covered everything and saved me money and confusion."',
        color: 'purple'
    },
    {
        name: 'Neha – Working Professional (Delhi)',
        avatar: '/images/achievement-3.png',
        text: '"I\'m not a full-time artist, but these lessons helped me confidently do my daily and event makeup."',
        color: 'blue'
    },
    {
        name: 'Pooja – Freelance Makeup Artist (Indore)',
        avatar: '/images/achievement-1.png',
        text: '"The Instagram mini course made content planning simple. My profile looks professional and enquiries have improved."',
        color: 'green'
    },
    {
        name: 'Kavita – Certified Makeup Artist (Ahmedabad)',
        avatar: '/images/kavita.png',
        text: '"The certification added instant credibility and helped clients trust me more during bookings."',
        color: 'orange'
    }
];

// Plan Details Content
const planDetailsContent = `
    <ul class="details-list">
        <li><strong>Access to Makeup Mastery Club</strong> — a complete ongoing learning platform by HSM School of Makeup</li>
        <li><strong>Weekly New Lessons</strong> — one fresh, practical lesson added every week</li>
    </ul>

    <div>
        <h4 class="details-section-title">🎓 Topics Covered Inside the Membership</h4>
        <ul class="details-list">
            <li><strong>Makeup:</strong> Learn everything from fundamentals to advanced, trend-driven looks for real clients</li>
            <li><strong>Hair:</strong> Professional hairstyling techniques for bridal, party, and everyday looks</li>
            <li><strong>Nails:</strong> Basic to advanced nail skills to add high-value services</li>
            <li><strong>Business & Growth:</strong> Pricing, client acquisition, and scaling as a makeup professional</li>
            <li><strong>Instagram Growth Mini Course:</strong> Step-by-step system to attract clients and build your personal brand</li>
            <li><strong>AI Tools for Makeup Business:</strong> Smart tools to save time, automate work, and grow faster</li>
            <li><strong>Certification After Completion:</strong> Official certification to boost credibility and client trust</li>
        </ul>
    </div>

    <div class="details-highlights">
        <p><strong>One Membership, Everything Covered:</strong> Makeup, hair, nails, business, Instagram, and AI — all in one place</p>
        <p><strong>Turn Skills Into Income:</strong> Learn techniques and how to attract clients and grow professionally</p>
        <p><strong>Stay Credible & Future-Ready:</strong> Weekly updates, expert guidance, and certification to stay relevant</p>
    </div>
`;

// Initialize Application
function init() {
    renderPlans();
    renderTestimonials();
    renderPlanDetails();
    updateOrderSummary();
    attachEventListeners();

    // Track initial page view
    FacebookPixel.trackEvent('PageView');
}

// Render Plans
function renderPlans() {
    const plansGrid = document.getElementById('plansGrid');
    plansGrid.innerHTML = '';

    Object.values(plans).forEach(plan => {
        const planCard = createPlanCard(plan);
        plansGrid.appendChild(planCard);
    });
}

// Create Plan Card
function createPlanCard(plan) {
    const div = document.createElement('div');
    div.className = `plan-card ${plan.id === 'monthly' ? 'monthly' : ''} ${state.selectedPlan === plan.id ? 'selected' : ''}`;
    div.onclick = () => selectPlan(plan.id);

    let html = '';

    if (plan.popular) {
        html += '<div class="popular-badge">🏆 BEST CHOICE</div>';
    }

    html += `
        <div class="plan-header">
            <div class="plan-info">
                <h3 class="plan-name">${plan.name}</h3>
                <p class="plan-description">${plan.description}</p>
                ${plan.subtitle ? `<p class="plan-subtitle">${plan.subtitle}</p>` : ''}
            </div>
        </div>
    `;

    if (plan.trustBadge) {
        html += `
            <div class="trust-badge">
                <p class="trust-badge-text">✨ ${plan.trustBadge}</p>
            </div>
        `;
    }

    html += `
        <div class="plan-price-container">
            <span class="plan-price">₹${plan.price}</span>
            <span class="plan-duration-text">for ${plan.duration}</span>
        </div>
    `;

    if (plan.totalMonths > 1) {
        html += `<p class="plan-monthly-price">₹${Math.round(plan.price / plan.totalMonths)}/month</p>`;
    }

    if (plan.savings) {
        html += `
            <div class="savings-badge">
                <p class="savings-text">✅ ${plan.savings}</p>
            </div>
        `;
    }

    if (plan.warning) {
        html += `
            <div class="warning-badge">
                <p class="warning-text">⚠️ ${plan.warning}</p>
            </div>
        `;
    }

    if (plan.bonus) {
        html += `
            <div class="bonus-badge">
                <p class="bonus-title">🎁 ${plan.bonus.title}:</p>
                <ul class="bonus-list">
                    ${plan.bonus.items.map(item => `<li>• ${item}</li>`).join('')}
                </ul>
                <p class="bonus-note">❌ Not included in Monthly</p>
            </div>
        `;
    }

    html += `
        <div class="plan-radio">
            <svg class="radio-check" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
        </div>
    `;

    div.innerHTML = html;
    return div;
}

// Select Plan
function selectPlan(planId) {
    state.selectedPlan = planId;
    renderPlans();
    updateOrderSummary();
}

// Update Order Summary
function updateOrderSummary() {
    const currentPlan = plans[state.selectedPlan];

    // Mobile
    document.getElementById('mobilePlanName').textContent = currentPlan.name;
    document.getElementById('mobilePlanPrice').textContent = `₹${currentPlan.price.toFixed(2)}`;
    document.getElementById('mobilePlanDuration').textContent = currentPlan.duration;
    document.getElementById('mobileTotalPrice').textContent = `₹${currentPlan.price.toFixed(2)}`;

    // Desktop
    document.getElementById('desktopPlanName').textContent = currentPlan.name;
    document.getElementById('desktopPlanPrice').textContent = `₹${currentPlan.price.toFixed(2)}`;
    document.getElementById('desktopPlanDuration').textContent = currentPlan.duration;
    document.getElementById('desktopTotalPrice').textContent = `₹${currentPlan.price.toFixed(2)}`;
}

// Render Testimonials
function renderTestimonials() {
    const mobileContainer = document.getElementById('mobileTestimonials');
    const desktopContainer = document.getElementById('desktopTestimonials');

    const testimonialsHTML = testimonials.map(testimonial => `
        <div class="testimonial">
            <div class="testimonial-header">
                <div class="testimonial-avatar ${testimonial.color}">
                    <img src="${testimonial.avatar}" alt="${testimonial.name}">
                </div>
                <div class="testimonial-info">
                    <p class="testimonial-name">${testimonial.name}</p>
                    <div class="testimonial-stars">
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                    </div>
                </div>
            </div>
            <p class="testimonial-text">${testimonial.text}</p>
        </div>
    `).join('');

    mobileContainer.innerHTML = testimonialsHTML;
    desktopContainer.innerHTML = testimonialsHTML;
}

// Render Plan Details
function renderPlanDetails() {
    document.getElementById('mobilePlanDetails').innerHTML = planDetailsContent;
    document.getElementById('desktopPlanDetails').innerHTML = planDetailsContent;
}

// Attach Event Listeners
function attachEventListeners() {
    // Form inputs
    document.getElementById('firstName').addEventListener('input', handleInputChange);
    document.getElementById('lastName').addEventListener('input', handleInputChange);
    document.getElementById('email').addEventListener('input', handleInputChange);
    document.getElementById('mobile').addEventListener('input', handleInputChange);
    document.getElementById('country').addEventListener('change', handleInputChange);
    document.getElementById('state').addEventListener('change', handleInputChange);

    // Complete Order buttons
    document.getElementById('mobileCompleteBtn').addEventListener('click', handlePayment);
    document.getElementById('mobileCompleteBtn2').addEventListener('click', handlePaymentWithScroll);
    document.getElementById('desktopCompleteBtn').addEventListener('click', handlePayment);
}

// Handle Input Change
function handleInputChange(e) {
    const { id, value } = e.target;
    state.formData[id] = value;

    // Track InitiateCheckout when user starts filling the form
    if (id === 'firstName' && value.length === 1) {
        const currentPlan = plans[state.selectedPlan];
        FacebookPixel.trackEvent('InitiateCheckout', {
            content_name: 'MakeUp Mastry Club',
            content_category: 'Subscription',
            value: currentPlan.price,
            currency: 'INR',
        });
    }

    // Track form progress
    if (id === 'email' && value.includes('@')) {
        FacebookPixel.trackCustomEvent('FormProgress', {
            step: 'email_entered',
            content_name: 'MakeUp Mastry Club',
        });
    }
}

// Handle Payment with Scroll
function handlePaymentWithScroll() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        handlePayment();
    }, 500);
}

// Handle Payment
async function handlePayment() {
    // Validate form
    if (!state.formData.firstName || !state.formData.lastName || !state.formData.email || !state.formData.mobile) {
        alert('Please fill in all required fields (First Name, Last Name, Email, Mobile Number)');
        return;
    }

    // Validate mobile number
    if (state.formData.mobile.length !== 10 || !/^\d{10}$/.test(state.formData.mobile)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }

    // Validate email
    if (!state.formData.email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    setProcessing(true);

    try {
        const currentPlan = plans[state.selectedPlan];

        // Track AddToCart event
        FacebookPixel.trackEvent('AddToCart', {
            content_name: 'MakeUp Mastry Club',
            content_type: 'product',
            content_category: state.isSubscription ? 'Subscription' : 'One-time',
            value: currentPlan.price,
            currency: 'INR',
        });

        if (state.isSubscription) {
            await handleSubscriptionPayment(currentPlan);
        } else {
            await handleOneTimePayment(currentPlan);
        }
    } catch (error) {
        console.error('Payment error:', error);

        // Check if it's a network error (backend not running)
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            alert('⚠️ Backend server is not running.\n\nPlease deploy this project to a hosting with PHP support (cPanel, Hostinger, etc.) to process payments.\n\nFor local testing, run: php -S localhost:8000');
        } else {
            alert(`❌ Payment failed: ${error.message || 'Please try again.'}`);
        }

        setProcessing(false);
    }
}

// Handle Subscription Payment
async function handleSubscriptionPayment(currentPlan) {
    console.log('Creating Razorpay subscription...');

    // Create subscription via API
    const response = await fetch(`${CONFIG.API_BASE_URL}/create-subscription.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            planId: currentPlan.razorpayPlanId,
            totalCount: currentPlan.totalMonths,
            notes: {
                customer_name: `${state.formData.firstName} ${state.formData.lastName}`,
                customer_email: state.formData.email,
                customer_mobile: state.formData.mobile,
            }
        }),
    });

    const data = await response.json();
    console.log('Subscription response:', data);

    if (!data.success) {
        throw new Error(data.error || 'Failed to create subscription');
    }

    // Initialize Razorpay subscription checkout
    const options = {
        key: CONFIG.RAZORPAY_KEY_ID,
        subscription_id: data.subscriptionId,
        name: 'MakeUp Mastry Club',
        description: 'Monthly Subscription - Makeup Mastery Membership',
        handler: async function (response) {
            console.log('Subscription payment response:', response);

            try {
                // Verify subscription payment
                const verifyResponse = await fetch(`${CONFIG.API_BASE_URL}/verify-subscription.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        razorpay_subscription_id: response.razorpay_subscription_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    }),
                });

                const verifyData = await verifyResponse.json();
                console.log('Subscription verification response:', verifyData);

                if (verifyData.success) {
                    // Track successful subscription purchase
                    FacebookPixel.trackEvent('Subscribe', {
                        content_name: 'MakeUp Mastry Club',
                        content_category: 'Subscription',
                        value: currentPlan.price,
                        currency: 'INR',
                        predicted_ltv: currentPlan.price * 12,
                    });

                    FacebookPixel.trackEvent('Purchase', {
                        content_name: `MakeUp Mastry Club - ${currentPlan.name}`,
                        content_type: 'product',
                        value: currentPlan.price,
                        currency: 'INR',
                        num_items: 1,
                    });

                    // Save to Google Sheets if enabled
                    if (CONFIG.GOOGLE_SHEETS_ENABLED) {
                        try {
                            await fetch(`${CONFIG.API_BASE_URL}/save-to-sheet.php`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    firstName: state.formData.firstName,
                                    lastName: state.formData.lastName,
                                    email: state.formData.email,
                                    mobile: state.formData.mobile,
                                    plan: currentPlan.name,
                                    amount: currentPlan.price,
                                    subscriptionId: response.razorpay_subscription_id,
                                    paymentId: response.razorpay_payment_id,
                                    timestamp: new Date().toISOString(),
                                }),
                            });
                        } catch (error) {
                            console.error('Failed to save to Google Sheets:', error);
                        }
                    }

                    // Redirect to thank you page
                    const params = new URLSearchParams({
                        subscription_id: response.razorpay_subscription_id,
                        payment_id: response.razorpay_payment_id,
                        amount: currentPlan.price.toString(),
                        type: 'subscription'
                    });
                    window.location.href = `thank-you.html?${params.toString()}`;
                } else {
                    alert('❌ Subscription verification failed. Please contact support.');
                }
            } catch (verifyError) {
                console.error('Subscription verification error:', verifyError);
                alert('❌ Subscription verification failed. Please contact support.');
            }
            setProcessing(false);
        },
        prefill: {
            name: `${state.formData.firstName} ${state.formData.lastName}`,
            email: state.formData.email,
            contact: `+91${state.formData.mobile}`,
        },
        theme: {
            color: '#2563eb',
        },
        modal: {
            ondismiss: function () {
                console.log('Subscription modal dismissed');
                setProcessing(false);
            }
        }
    };

    console.log('Opening Razorpay subscription...');

    if (typeof Razorpay !== 'undefined') {
        const razorpay = new Razorpay(options);
        razorpay.open();
    } else {
        throw new Error('Razorpay SDK not loaded. Please refresh the page.');
    }
}

// Handle One-Time Payment
async function handleOneTimePayment(currentPlan) {
    console.log('Creating Razorpay order...');

    // Create order via API
    const response = await fetch(`${CONFIG.API_BASE_URL}/create-order.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            amount: currentPlan.price,
            currency: 'INR'
        }),
    });

    const data = await response.json();
    console.log('Order response:', data);

    if (!data.success) {
        throw new Error(data.error || 'Failed to create order');
    }

    // Initialize Razorpay checkout
    const options = {
        key: CONFIG.RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'MakeUp Mastry Club',
        description: 'One-time Payment - Makeup Mastery Membership',
        order_id: data.orderId,
        handler: async function (response) {
            console.log('Payment response:', response);

            try {
                // Verify payment
                const verifyResponse = await fetch(`${CONFIG.API_BASE_URL}/verify-payment.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    }),
                });

                const verifyData = await verifyResponse.json();
                console.log('Verification response:', verifyData);

                if (verifyData.success) {
                    // Track successful one-time purchase
                    FacebookPixel.trackEvent('Purchase', {
                        content_name: `MakeUp Mastry Club - ${currentPlan.name}`,
                        content_type: 'product',
                        value: currentPlan.price,
                        currency: 'INR',
                        num_items: 1,
                    });

                    // Redirect to thank you page
                    const params = new URLSearchParams({
                        order_id: response.razorpay_order_id,
                        payment_id: response.razorpay_payment_id,
                        amount: currentPlan.price.toString(),
                        type: 'onetime'
                    });
                    window.location.href = `thank-you.html?${params.toString()}`;
                } else {
                    alert('❌ Payment verification failed. Please contact support.');
                }
            } catch (verifyError) {
                console.error('Verification error:', verifyError);
                alert('❌ Payment verification failed. Please contact support.');
            }
            setProcessing(false);
        },
        prefill: {
            name: `${state.formData.firstName} ${state.formData.lastName}`,
            email: state.formData.email,
            contact: `+91${state.formData.mobile}`,
        },
        theme: {
            color: '#2563eb',
        },
        modal: {
            ondismiss: function () {
                console.log('Payment modal dismissed');
                setProcessing(false);
            }
        }
    };

    console.log('Opening Razorpay...');

    if (typeof Razorpay !== 'undefined') {
        const razorpay = new Razorpay(options);
        razorpay.open();
    } else {
        throw new Error('Razorpay SDK not loaded. Please refresh the page.');
    }
}

// Set Processing State
function setProcessing(isProcessing) {
    state.isProcessing = isProcessing;

    const buttons = [
        document.getElementById('mobileCompleteBtn'),
        document.getElementById('mobileCompleteBtn2'),
        document.getElementById('desktopCompleteBtn')
    ];

    const textElements = [
        document.getElementById('mobileButtonText'),
        document.getElementById('mobileButtonText2'),
        document.getElementById('desktopButtonText')
    ];

    const iconElements = [
        document.getElementById('mobileButtonIcon'),
        document.getElementById('mobileButtonIcon2'),
        document.getElementById('desktopButtonIcon')
    ];

    buttons.forEach(btn => {
        btn.disabled = isProcessing;
    });

    textElements.forEach(text => {
        text.textContent = isProcessing ? 'Processing...' : 'Complete Order';
    });

    iconElements.forEach(icon => {
        icon.style.display = isProcessing ? 'none' : 'block';
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
