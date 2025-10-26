import { GoogleGenerativeAI } from '@google/generative-ai';
import { detectDiseases, getSymptomRecommendations, diseaseDatabase } from './diseaseDatabase';

const GEMINI_API_KEY = 'AIzaSyDuECi0yeF3XtgFodMTYcJZYm0I7ByOEho';
const DEEPSEEK_API_KEY = 'sk-22cdb76c73f449f3a90d7e7f2e2dd6c2';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const USE_DEEPSEEK = true;

export const getChatResponse = async (userMessage: string, conversationHistory: string = ''): Promise<string> => {
  try {
    if (USE_DEEPSEEK) {
      return await getDeepSeekResponse(userMessage, conversationHistory);
    } else {
      return await getGeminiResponse(userMessage, conversationHistory);
    }
  } catch (error) {
    console.error('Primary API error, trying fallback:', error);
    try {
      return await getGeminiResponse(userMessage, conversationHistory);
    } catch (fallbackError) {
      console.error('Fallback API error:', fallbackError);
      throw new Error('Failed to get response from AI. Please try again.');
    }
  }
};

const getDeepSeekResponse = async (userMessage: string, conversationHistory: string = ''): Promise<string> => {
  try {
    const systemPrompt = `You are Dr. Arogya, a compassionate and experienced physician with 15+ years of practice.

IMPORTANT: Respond EXACTLY like a real doctor talking to a patient - natural, warm, conversational.
NOT formal dialogue. NOT "Doctor: " prefixes. Just natural speech.

EXAMPLES of GOOD responses:
"I see. Fever with body aches usually points to a viral infection. I'd like to know when this started - was it today or did it begin a few days ago?"

"That's helpful information. Let me ask you about the intensity of your pain - would you say it's mild, moderate, or quite severe?"

"Based on what you've told me, this sounds like it could be food poisoning. Here's what I recommend..." 

RULES:
1. Be warm, empathetic, and professional
2. Ask ONE diagnostic question at a time
3. Build on previous answers naturally
4. Use conversational language, not formatted lists in questions
5. When diagnosing: "Based on your symptoms, this appears to be [disease]. Here's what I recommend: [medicines with dosages] - Take [medicine name] [dosage] [frequency]. For home care, [advice]. Important: [red flags]"
6. Never use "Doctor: " or "Patient: " labels
7. Sound like you're having a real conversation`;

    const messages = conversationHistory
      ? [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: conversationHistory + '\n\nPatient: ' + userMessage }
        ]
      : [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ];

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.5,
        max_tokens: 300
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'DeepSeek API error');
    }
    return data.choices[0].message.content;
  } catch (error) {
    console.error('DeepSeek API error:', error);
    throw error;
  }
};

const getGeminiResponse = async (userMessage: string, conversationHistory: string = ''): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const systemPrompt = `You are Dr. Arogya. Concise responses only.
Diagnosis:
1. Medicine - dosage, frequency, duration
2. Medicine - dosage, frequency, duration
Care: home care line`;
    
    const prompt = conversationHistory 
      ? `${systemPrompt}

${conversationHistory}

Patient: ${userMessage}`
      : `${systemPrompt}\n\nPatient: ${userMessage}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
};

export const getVoiceResponse = async (transcript: string): Promise<string> => {
  try {
    if (USE_DEEPSEEK) {
      return await getDeepSeekVoiceResponse(transcript);
    } else {
      return await getGeminiVoiceResponse(transcript);
    }
  } catch (error) {
    console.error('Voice API error:', error);
    return 'Please consult a healthcare professional.';
  }
};

const getDeepSeekVoiceResponse = async (transcript: string): Promise<string> => {
  try {
    const symptomKeywords = ['pain', 'ache', 'fever', 'cough', 'rash', 'itchy', 'tired', 'fatigue', 'nausea', 'vomit', 'diarrhea', 'constipation', 'headache', 'sore', 'burning', 'swelling', 'weakness', 'dizzy', 'breathe', 'sneeze', 'discharge', 'bleeding'];
    const foundSymptoms = symptomKeywords.filter(keyword => transcript.toLowerCase().includes(keyword));
    
    let diseaseContext = '';
    if (foundSymptoms.length > 0) {
      const detectedDiseases = detectDiseases(foundSymptoms);
      if (detectedDiseases.length > 0) {
        diseaseContext = `\n\nDetected conditions: ${detectedDiseases.slice(0, 2).map(d => d.name).join(', ')}`;
      }
    }

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are Dr. Arogya. Very brief voice response (1 sentence max). Be specific about disease if mentioned. Use format: "Sounds like [disease]. Take [medicine name - dosage]. See doctor if [red flag]."'
          },
          {
            role: 'user',
            content: `Patient said: ${transcript}${diseaseContext}`
          }
        ],
        temperature: 0.5,
        max_tokens: 80
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'DeepSeek voice error');
    }
    return data.choices[0].message.content;
  } catch (error) {
    console.error('DeepSeek voice error:', error);
    throw error;
  }
};

const getGeminiVoiceResponse = async (transcript: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const result = await model.generateContent(`Brief response: ${transcript}`);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini voice error:', error);
    throw error;
  }
};

export const classifyImageWithMedicalContext = async (imageData: string): Promise<{
  diagnosis: string;
  confidence: number;
  conditionType: string;
  medicines: Array<{name: string, dosage: string, frequency: string, duration: string}>;
  recommendations: string[];
  severity: string;
  specialistNeeded: string;
}> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const base64Data = imageData.split(',')[1] || imageData;
    
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Data,
        },
      },
      `ADVANCED MEDICAL IMAGE DIAGNOSTIC:

You are analyzing medical images for skin conditions, eye diseases, oral conditions, or general medical imaging.

Provide EXTREMELY specific medical diagnosis with medical terminology.

Known conditions:
Skin: Acne, psoriasis, eczema, fungal infections (ringworm, candidiasis), bacterial infections, chickenpox, scabies, monkeypox, rosacea, vitiligo, melanoma, basal cell carcinoma, warts, dermatitis
Eye: Conjunctivitis, cataracts, glaucoma, macular degeneration, diabetic retinopathy, corneal ulcers
Oral: Thrush, gingivitis, stomatitis, oral herpes

Respond with ONLY valid JSON (no markdown):
{
  "diagnosis": "Specific diagnosis with clinical details",
  "confidence": 85,
  "condition_type": "skin|eye|oral|general",
  "severity": "mild|moderate|severe",
  "medicines": [
    {"name": "drug name", "dosage": "strength", "frequency": "when", "duration": "how long"}
  ],
  "recommendations": ["action 1", "action 2", "Red flag: symptom"],
  "specialist_needed": "dermatologist|ophthalmologist|dentist|general physician"
}`
    ]);
    
    const text = await result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        diagnosis: parsed.diagnosis || 'Unable to analyze',
        confidence: parsed.confidence || 60,
        conditionType: parsed.condition_type || 'general',
        medicines: parsed.medicines || [],
        recommendations: parsed.recommendations || ['Consult a healthcare professional'],
        severity: parsed.severity || 'unknown',
        specialistNeeded: parsed.specialist_needed || 'general physician'
      };
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Image analysis error:', error);
    return {
      diagnosis: 'Unable to analyze image. Please consult a healthcare professional.',
      confidence: 0,
      conditionType: 'unknown',
      medicines: [],
      recommendations: ['Professional medical evaluation required'],
      severity: 'unknown',
      specialistNeeded: 'general physician'
    };
  }
};

export const checkSymptoms = async (symptoms: string[]): Promise<{ possibleConditions: string[]; severity: string; recommendations: string[] }> => {
  try {
    const dbRecommendations = getSymptomRecommendations(symptoms);
    
    return {
      possibleConditions: dbRecommendations.possibleConditions,
      severity: dbRecommendations.severity,
      recommendations: dbRecommendations.recommendations
    };
  } catch (error) {
    console.error('Symptom check error:', error);
    
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const symptomList = symptoms.join(', ');
      
      const result = await model.generateContent(`Symptoms: ${symptomList}\nReturn JSON: {"possibleConditions": ["cond1"], "severity": "mild", "recommendations": ["action"]}`);
      
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (fallbackError) {
      console.error('Fallback error:', fallbackError);
    }
    
    return {
      possibleConditions: ['Consult doctor'],
      severity: 'unknown',
      recommendations: ['See professional']
    };
  }
};
