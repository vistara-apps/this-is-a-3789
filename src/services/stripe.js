class StripeService {
  constructor() {
    this.publishableKey = null
    this.stripe = null
    this.baseUrl = 'https://api.stripe.com/v1'
  }

  async initialize(publishableKey) {
    if (!publishableKey) {
      throw new Error('Stripe publishable key is required')
    }
    
    this.publishableKey = publishableKey
    
    // Load Stripe.js dynamically
    if (!window.Stripe) {
      const script = document.createElement('script')
      script.src = 'https://js.stripe.com/v3/'
      script.async = true
      document.head.appendChild(script)
      
      await new Promise((resolve, reject) => {
        script.onload = resolve
        script.onerror = reject
      })
    }
    
    this.stripe = window.Stripe(publishableKey)
  }

  async createCheckoutSession(priceId, successUrl, cancelUrl, customerEmail = null) {
    if (!this.stripe) {
      throw new Error('Stripe service not initialized. Please provide publishable key in settings.')
    }

    try {
      // Note: In a real application, this should be handled by your backend
      // This is a simplified example for demonstration purposes
      const sessionData = {
        price_id: priceId,
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'subscription',
        allow_promotion_codes: true,
        billing_address_collection: 'required',
        customer_email: customerEmail,
        metadata: {
          app: 'rightsguard',
          timestamp: new Date().toISOString()
        }
      }

      // In production, this would be a call to your backend API
      // which would then create the Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData)
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const session = await response.json()
      
      // Redirect to Stripe Checkout
      const result = await this.stripe.redirectToCheckout({
        sessionId: session.id
      })

      if (result.error) {
        throw new Error(result.error.message)
      }

      return result
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw new Error('Failed to initiate payment. Please try again later.')
    }
  }

  async createPortalSession(customerId, returnUrl) {
    if (!this.stripe) {
      throw new Error('Stripe service not initialized')
    }

    try {
      // In production, this would be handled by your backend
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerId,
          return_url: returnUrl
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create portal session')
      }

      const session = await response.json()
      
      // Redirect to customer portal
      window.location.href = session.url
      
      return session
    } catch (error) {
      console.error('Error creating portal session:', error)
      throw new Error('Failed to access billing portal. Please try again later.')
    }
  }

  // Mock subscription plans for the PRD
  getSubscriptionPlans() {
    return [
      {
        id: 'basic',
        name: 'Basic Plan',
        price: 0,
        interval: 'month',
        features: [
          'Basic state rights information',
          'Standard scripts in English',
          'Basic recording functionality',
          'Limited incident logs (5 per month)'
        ],
        priceId: null,
        popular: false
      },
      {
        id: 'premium',
        name: 'Premium Plan',
        price: 2.99,
        interval: 'month',
        features: [
          'Comprehensive state-specific rights guides',
          'Bilingual scripts (English & Spanish)',
          'Unlimited secure recording storage',
          'Unlimited incident logs',
          'AI-powered incident summaries',
          'Priority support',
          'Advanced sharing features'
        ],
        priceId: 'price_premium_monthly', // This would be your actual Stripe price ID
        popular: true
      },
      {
        id: 'annual',
        name: 'Annual Premium',
        price: 29.99,
        interval: 'year',
        features: [
          'All Premium features',
          'Save 16% with annual billing',
          'Priority feature updates',
          'Extended storage retention'
        ],
        priceId: 'price_premium_annual', // This would be your actual Stripe price ID
        popular: false
      }
    ]
  }

  // Mock method to simulate subscription status check
  async getSubscriptionStatus(customerId) {
    // In production, this would query your backend/Stripe API
    try {
      const response = await fetch(`/api/subscription-status/${customerId}`)
      
      if (!response.ok) {
        throw new Error('Failed to get subscription status')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error getting subscription status:', error)
      // Return mock data for development
      return {
        status: 'active',
        plan: 'premium',
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancel_at_period_end: false
      }
    }
  }
}

export default new StripeService()
