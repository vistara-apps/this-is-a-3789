import OpenAI from 'openai'

class OpenAIService {
  constructor() {
    this.client = null
    this.apiKey = null
  }

  initialize(apiKey) {
    if (!apiKey) {
      throw new Error('OpenAI API key is required')
    }
    
    this.apiKey = apiKey
    this.client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Note: In production, this should be handled server-side
    })
  }

  async generateIncidentSummary(incidentData, userRights) {
    if (!this.client) {
      throw new Error('OpenAI service not initialized. Please provide API key in settings.')
    }

    try {
      const prompt = `
        Create a concise, shareable summary of a police interaction incident. Include key rights information and incident details.
        
        Incident Details:
        - Date/Time: ${new Date(incidentData.timestamp).toLocaleString()}
        - Location: ${incidentData.latitude}, ${incidentData.longitude}
        - Incident ID: ${incidentData.logId}
        - Status: ${incidentData.status}
        - Notes: ${incidentData.notes || 'No additional notes'}
        
        User Rights Context:
        ${userRights}
        
        Please create a professional, factual summary that:
        1. Summarizes the incident details
        2. Highlights relevant rights
        3. Is suitable for sharing with legal counsel or support network
        4. Maintains a neutral, factual tone
        5. Is under 200 words
        
        Format as a clear, structured summary.
      `

      const response = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a legal assistant helping citizens document police interactions professionally and factually.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.3
      })

      return response.choices[0].message.content.trim()
    } catch (error) {
      console.error('Error generating incident summary:', error)
      throw new Error('Failed to generate incident summary. Please check your API key and try again.')
    }
  }

  async generateRightsExplanation(state, scenario) {
    if (!this.client) {
      throw new Error('OpenAI service not initialized. Please provide API key in settings.')
    }

    try {
      const prompt = `
        Explain the legal rights for citizens during police interactions in ${state} for the following scenario: ${scenario}
        
        Please provide:
        1. Specific rights that apply
        2. What citizens can and cannot do
        3. Key phrases they should know
        4. State-specific considerations
        
        Keep the explanation clear, accurate, and under 300 words. Focus on practical, actionable information.
      `

      const response = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a legal expert providing accurate, state-specific information about citizen rights during police interactions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 400,
        temperature: 0.2
      })

      return response.choices[0].message.content.trim()
    } catch (error) {
      console.error('Error generating rights explanation:', error)
      throw new Error('Failed to generate rights explanation. Please check your API key and try again.')
    }
  }
}

export default new OpenAIService()
