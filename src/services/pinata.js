class PinataService {
  constructor() {
    this.apiKey = null
    this.apiSecret = null
    this.baseUrl = 'https://api.pinata.cloud'
  }

  initialize(apiKey, apiSecret) {
    if (!apiKey || !apiSecret) {
      throw new Error('Pinata API key and secret are required')
    }
    
    this.apiKey = apiKey
    this.apiSecret = apiSecret
  }

  async uploadFile(file, metadata = {}) {
    if (!this.apiKey || !this.apiSecret) {
      throw new Error('Pinata service not initialized. Please provide API credentials in settings.')
    }

    try {
      const formData = new FormData()
      formData.append('file', file)
      
      // Add metadata
      const pinataMetadata = {
        name: metadata.name || `incident-${Date.now()}`,
        keyvalues: {
          type: 'incident-recording',
          timestamp: new Date().toISOString(),
          ...metadata.keyvalues
        }
      }
      
      formData.append('pinataMetadata', JSON.stringify(pinataMetadata))
      
      // Add options
      const pinataOptions = {
        cidVersion: 1,
        ...metadata.options
      }
      
      formData.append('pinataOptions', JSON.stringify(pinataOptions))

      const response = await fetch(`${this.baseUrl}/pinning/pinFileToIPFS`, {
        method: 'POST',
        headers: {
          'pinata_api_key': this.apiKey,
          'pinata_secret_api_key': this.apiSecret
        },
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to upload file to Pinata')
      }

      const result = await response.json()
      
      return {
        ipfsHash: result.IpfsHash,
        pinSize: result.PinSize,
        timestamp: result.Timestamp,
        url: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
        gatewayUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
      }
    } catch (error) {
      console.error('Error uploading to Pinata:', error)
      throw new Error('Failed to upload file to secure storage. Please check your API credentials and try again.')
    }
  }

  async uploadJSON(jsonData, metadata = {}) {
    if (!this.apiKey || !this.apiSecret) {
      throw new Error('Pinata service not initialized. Please provide API credentials in settings.')
    }

    try {
      const pinataMetadata = {
        name: metadata.name || `incident-data-${Date.now()}`,
        keyvalues: {
          type: 'incident-data',
          timestamp: new Date().toISOString(),
          ...metadata.keyvalues
        }
      }

      const requestBody = {
        pinataContent: jsonData,
        pinataMetadata,
        pinataOptions: {
          cidVersion: 1,
          ...metadata.options
        }
      }

      const response = await fetch(`${this.baseUrl}/pinning/pinJSONToIPFS`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': this.apiKey,
          'pinata_secret_api_key': this.apiSecret
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to upload JSON to Pinata')
      }

      const result = await response.json()
      
      return {
        ipfsHash: result.IpfsHash,
        pinSize: result.PinSize,
        timestamp: result.Timestamp,
        url: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
        gatewayUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
      }
    } catch (error) {
      console.error('Error uploading JSON to Pinata:', error)
      throw new Error('Failed to upload data to secure storage. Please check your API credentials and try again.')
    }
  }

  async testConnection() {
    if (!this.apiKey || !this.apiSecret) {
      throw new Error('Pinata service not initialized')
    }

    try {
      const response = await fetch(`${this.baseUrl}/data/testAuthentication`, {
        method: 'GET',
        headers: {
          'pinata_api_key': this.apiKey,
          'pinata_secret_api_key': this.apiSecret
        }
      })

      if (!response.ok) {
        throw new Error('Authentication failed')
      }

      const result = await response.json()
      return result.message === 'Congratulations! You are communicating with the Pinata API!'
    } catch (error) {
      console.error('Error testing Pinata connection:', error)
      return false
    }
  }

  generateShareableUrl(ipfsHash) {
    return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
  }
}

export default new PinataService()
