import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt, apiKey } = await request.json()
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      )
    }
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }
    
    // Call Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    })
    
    if (!response.ok) {
      const error = await response.text()
      throw new Error(`API request failed: ${error}`)
    }
    
    const data = await response.json()
    const generatedText = data.candidates[0].content.parts[0].text
    
    // Extract JSON from response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      try {
        const formattedJson = JSON.parse(jsonMatch[0])
        return NextResponse.json({ json: formattedJson })
      } catch (parseError) {
        // Try to clean up common issues
        let cleaned = jsonMatch[0]
          .replace(/[\u201C\u201D]/g, '"') // Replace smart quotes
          .replace(/[\u2018\u2019]/g, "'") // Replace smart apostrophes
          .replace(/\n\s*\n/g, '\n') // Remove extra newlines
          .replace(/,\s*}/g, '}') // Remove trailing commas
          .replace(/,\s*]/g, ']') // Remove trailing commas in arrays
        
        try {
          const formattedJson = JSON.parse(cleaned)
          return NextResponse.json({ json: formattedJson })
        } catch (cleanError) {
          return NextResponse.json(
            { error: 'Failed to parse JSON from response', raw: generatedText },
            { status: 500 }
          )
        }
      }
    }
    
    return NextResponse.json(
      { error: 'No JSON found in response', raw: generatedText },
      { status: 500 }
    )
    
  } catch (error) {
    console.error('Generate API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate prompt' },
      { status: 500 }
    )
  }
}